import React, {Component} from 'react';

class Chatbar extends Component {

  constructor (props) {
    super(props);
    this.state = {currentUser: this.props.currentUser};
    this.inputChangeFunc = this.inputChangeFunc.bind(this);
    this.nameChangeFunc = this.nameChangeFunc.bind(this);
    this.namePassFunc = this.namePassFunc.bind(this);
  }

  inputChangeFunc (e) {
    if (e.key === 'Enter') {
      this.props.inputChangeFunc(e.target.dataset.user, e.target.value);
    }
  }

  namePassFunc (e) {
    if (e.key === 'Enter') {
      this.props.nameChangeFunc(e.target.value);
    }
  }

  nameChangeFunc (e) {
    this.setState({currentUser: e.target.value});
  }

  render() {
    console.log('Rending <Chatbar />');
    const currentUser = this.props.currentUser;
    return (
      <footer className='chatbar'>
          <input
            type='text'
            className="chatbar-username"
            value={this.state.currentUser}
            onKeyUp={this.namePassFunc}
            onChange={this.nameChangeFunc} />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            data-user={this.state.currentUser} // Not a good way to attach information from other siblings
            onKeyUp={this.inputChangeFunc}/>
      </footer>
    );
  }
}

export default Chatbar;