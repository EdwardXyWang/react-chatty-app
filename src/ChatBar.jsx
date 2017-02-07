import React, {Component} from 'react';

class Chatbar extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    console.log('Rending <Chatbar />');
    const currentUser = this.props.currentUser;
    const value = this.props.content;
    return (
      <footer className='chatbar'>
        <input
          className="chatbar-username"
          placeholder={currentUser} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={value}
          onChange={this.handleChange}/>
      </footer>
    );
  }
}

export default Chatbar;