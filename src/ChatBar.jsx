import React, {Component} from 'react';

class Chatbar extends Component {
render(){
  return (
    <footer className="chatbar">
     <input className="chatbar-username" placeholder={this.props.currentUser.name} onChange={this.props.changeUser}/>
     <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.onEnter}/>
    </footer>
  );
}

}

export default Chatbar;
