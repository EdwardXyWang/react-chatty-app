import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';

class App extends Component {

  constructor () {
    super ();
    this.handleChatbarChange = this.handleChatbarChange.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      placeHolder: ''
    };
  }


  handleChatbarChange (content) {
    const newMessage = {username: 'cool', content: content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }



  render() {
    console.log('Rendering <App />');
    const content = this.state.placeHolder;
    return (
      <div>
        <nav className='navbar'>
          <a href={"/"} className="navbar-brand">Chatty</a>
        </nav>
        <Messagelist messages={this.state.messages}/>
        <Chatbar
          currentUser={this.state.currentUser.name}
          content={content}
          onChange={this.handleChatbarChange} />
      </div>
    );
  }
}

export default App;
