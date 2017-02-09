import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';

class App extends Component {

  constructor () {
    super ();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.handleChatbarChange = this.handleChatbarChange.bind(this);
    this.handleInputChange = this.handleNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChatbarChange(userName, content) {
    const messageForWS = {
      type: 'sendMessage',
      content: content,
      username: userName,
      date: Date.now()
    };
    this.socket.send(JSON.stringify(messageForWS));
  }

  handleNameChange(user) {
    this.setState({name: user});
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onmessage = (receivedMessage) => {
      const parseMessage = JSON.parse(receivedMessage.data);
      const userName = parseMessage.username;
      const content = parseMessage.content;
      const newMessage = {username: userName, content: content};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    };
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className='navbar'>
          <a href={"/"} className="navbar-brand">Chatty</a>
        </nav>
        <Messagelist messages={this.state.messages}/>
        <Chatbar
          currentUser={this.state.currentUser.name}
          nameChangeFunc={this.handleNameChange}
          inputChangeFunc={this.handleChatbarChange} />
      </div>
    );
  }
}

export default App;
