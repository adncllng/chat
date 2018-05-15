import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.onEnter = this.onEnter.bind(this);
  }
onEnter(evt) {
    if(evt.key == "Enter"){
      console.log(this.state.currentUser.name)
      const user = this.state.currentUser.name
         const newMessage = {username: user, content: evt.target.value};
         const messages = this.state.messages.concat(newMessage)
         this.setState({messages: messages})
   }
}
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Chatbar currentUser={this.state.currentUser} onEnter={this.onEnter} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
