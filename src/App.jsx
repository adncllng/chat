import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'
//const exampleSocket = new WebSocket("ws://localhost:3001/", "protocolOne");

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.onEnter = this.onEnter.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
onEnter(evt) {
  console.log("helasdf")
    if(evt.key == "Enter"){
      const user = this.state.currentUser.name
         const newMessage = {username: user, content: evt.target.value};
         const messages = this.state.messages.concat(newMessage)
         evt.target.value = "";
         this.socket.send(JSON.stringify(newMessage))
   }
}
changeUser(evt){
this.setState({currentUser:{name: evt.target.value}})
}

componentDidMount(){
  this.socket = new WebSocket("ws://localhost:3001/", "protocolOne");
  this.socket.onopen = (ev) => { console.log('connected')}
  this.socket.onmessage = (event) => {
    const messageIn = JSON.parse(event.data);
    console.log(messageIn);
    const user = this.state.currentUser.name
    const newMessage = {id: messageIn.id, username: messageIn.username, content: messageIn.content};
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
        <Chatbar currentUser={this.state.currentUser} onEnter={this.onEnter} changeUser={this.changeUser}/>
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
