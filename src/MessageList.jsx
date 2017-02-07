import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {
  render() {
    console.log('Rendering <Messagelist />');
    return (
      <main className='messages'>
        <Message messages={this.props.messages}/>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default Messagelist;
