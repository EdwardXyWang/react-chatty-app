import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {

  render() {
    console.log('Rendering <Messagelist />');
    return (
      <main className='messages'>
        {this.props.messages.map((message, index) => {
          return (
            <Message msg={message} key={index}/>
          )
        })}
      </main>
    )
  }
}

export default Messagelist;
