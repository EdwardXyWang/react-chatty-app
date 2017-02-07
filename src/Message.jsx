import React, {Component} from 'react';

class Message extends Component {
  render () {
    console.log('Rendering <Message />');
    return (
      <div>
        {this.props.messages.map((message, index) => {
          return (
            <div className='message' key={index}>
              <span className='message-username'>
                {message.username}
              </span>
              <span className='message-content'>
                {message.content}
              </span>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Message;
