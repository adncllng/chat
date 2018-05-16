import React, {Component} from 'react';

class Chatbar extends Component {
render(){
  return (
    <footer className="chatbar">
     <input className="chatbar-username" placeholder={this.props.currentUser.name} onKeyPress={this.props.changeUser}/>
     <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.postMessage}/>
    </footer>
  );
}

}

export default Chatbar;
