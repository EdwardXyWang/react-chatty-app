import React, {Component} from 'react';

class Chatbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reservedUser: this.props.currentUser,
      currentUser: this.props.currentUser
    };
    this.contentPass = this.contentPass.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.namePass = this.namePass.bind(this);
    // this.focus = this.focus.bind(this);
  }

  contentPass (e) {
    if (e.key === 'Enter') {
      this.props.contentChange(this.state.currentUser, e.target.value);
      e.target.value = '';
    }
  }

  namePass (e) {
    if (e.target.value !== this.state.reservedUser) {
      this.props.nameChange(e.target.value);
      this.setState({reservedUser: e.target.value});
    }
  }

  nameChange (e) {
    this.setState({currentUser: e.target.value});
  }

  // focus () {
  //   this.inputText.focus();
  // }

  // componentDidMount () {
  //   this.focus();
  // }

  render() {
    console.log('Rending <Chatbar />');
    const currentUser = this.props.currentUser;
    return (
      <footer className='chatbar'>
          <input
            type='text'
            className="chatbar-username"
            value={this.state.currentUser}
            onBlur={this.namePass}
            onChange={this.nameChange} />
          <input
            className="chatbar-message"
            autoFocus
            // ref={(input) => {this.inputText = input;}}
            placeholder="Type a message and hit ENTER"
            onKeyUp={this.contentPass} />
      </footer>
    );
  }
}

export default Chatbar;