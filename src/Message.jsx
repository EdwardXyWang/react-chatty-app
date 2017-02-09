import React, {Component} from 'react';

class Message extends Component {
  render () {
    console.log('Rendering <Message />');
    if(this.props.msg.type === 'incomingMessage'){
      return (
        <div className='message'>
          <span className='message-username'>
            {this.props.msg.username}
          </span>
          <span className='message-content'>
            {this.props.msg.content}
          </span>
        </div>
      )
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
