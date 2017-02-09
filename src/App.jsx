import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';

class App extends Component {

  constructor () {
    super ();
    this.state = {
      currentUser: {name: "Mike"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      onlineUserNumber: 0
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }


  handleContentChange(userName, content) {
    const messageForWS = {
      type: 'postMessage',
      content: content,
      username: userName,
      date: Date.now()
    };
    this.socket.send(JSON.stringify(messageForWS));
  }


  handleNameChange(user) {
    const nameForWS = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed their name to ${user}.`
    };
    this.setState({
      currentUser: {name: user},
    });
    this.socket.send(JSON.stringify(nameForWS));
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onmessage = (receivedMessage) => {
      const parsedMessage = JSON.parse(receivedMessage.data);
      this.classify(parsedMessage);
    };
  }


  classify (data) {
    switch (data.type) {
      case 'incomingMessage':
        //handle message
        const newIncomingMessage = {
          type: 'incomingMessage',
          username: data.username,
          content: data.content
        };
        const inmsg = this.state.messages.concat(newIncomingMessage);
        this.setState({messages: inmsg});
        break;
      case 'incomingNotification':
        //handle notification
        const newNoteMessage = {
          type: 'incomingNotification',
          nameStatusContent: data.content
        };
        const notemsg = this.state.messages.concat(newNoteMessage);
        this.setState({messages: notemsg});
        break;
      case 'userNumber':
        //handle on line user number
        this.setState({onlineUserNumber: data.userNumber});
        break;
      default:
        console.log("Unknown event type " + data.type);
    }
  }


  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className='navbar'>
          <a href={"/"} className="navbar-brand">Chatty</a>
          <div className='countOnlineUser'>{this.state.onlineUserNumber} users online</div>
        </nav>
        <Messagelist messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser.name}
          nameChange={this.handleNameChange}
          contentChange={this.handleContentChange} />
      </div>
    )
  }
}

export default App;
