import React, {Component} from 'react';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userContent: this.props.msg.content
    };
  }

  render () {
    console.log('Rendering <Message />');
    if(this.props.msg.type === 'incomingMessage'){
      const rege = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i;
      // const imgLink = rege.exec(this.state.userContent);
      if (rege.test(this.state.userContent)) {
        return (
          <div className='message'>
            <span
              className='message-username'
              style={{color:this.props.msg.colour}} >
                {this.props.msg.username}
            </span>
            <span className='message-content'>
              <img src={this.state.userContent}></img>
            </span>
          </div>
        )
      } else {
        return (
          <div className='message'>
            <span
              className='message-username'
              style={{color:this.props.msg.colour}} >
                {this.props.msg.username}
            </span>
            <span className='message-content'>
              {this.state.userContent}
            </span>
          </div>
        )
      }
    } else {
      return (
        <div className="message system">
          {this.props.msg.nameStatusContent}
        </div>
      )
    }
  }
}

export default Message;
