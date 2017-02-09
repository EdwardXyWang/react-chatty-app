const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const COLORS = ["red", "blue", "green", "black"];
function getRandomColor() {
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}

let onlineUserCount = 0;
function onlineUserNumberBroadcast(number) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'userNumber',
        userNumber: number
      }));
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (pipeline) => {
  console.log('Client connected');

  // assign user's colour
  pipeline.colour = getRandomColor();

  // broadcast online user number
  onlineUserCount += 1;
  onlineUserNumberBroadcast(onlineUserCount);

  pipeline.on('message', (message) => {
    let parsedMessage = JSON.parse(message);

    switch (parsedMessage.type) {
      case 'postMessage':
        //handle message
        parsedMessage.uuid = uuid.v4();
        parsedMessage.type = 'incomingMessage';
        parsedMessage.colour = pipeline.colour;
        break;
      case 'postNotification':
        // handle notification
        parsedMessage.type = 'incomingNotification';
        break;
      default:
        console.log("Unknown event type " + parsedMessage.type);
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  pipeline.on('close', () => {
      console.log('Client disconnected');
      onlineUserCount -= 1;
      onlineUserNumberBroadcast(onlineUserCount);
    }
  );
});
