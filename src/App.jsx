import React, { Component } from "react";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anonymous"
      },
      messages: []
    };
    //bind postMessage
    this.postMessage = this.postMessage.bind(this);
    //bind changeUser
    this.changeUser = this.changeUser.bind(this);
  }
  //method for posting messages
  postMessage(evt) {
    if (evt.key == "Enter") {
      const user = this.state.currentUser.name;
      const newMessage = {
        type: "postMessage",
        username: user,
        content: evt.target.value
      };
      //concat message and update state
      const messages = this.state.messages.concat(newMessage);
      evt.target.value = "";
      this.socket.send(JSON.stringify(newMessage));
    }
  }
  changeUser(evt) {
    if (evt.key == "Enter") {
      const oldUsername = this.state.currentUser.name;
      const newUsername = evt.target.value;
      this.setState({
        currentUser: {
          name: newUsername
        }
      });
      const message = {
        type: "postNotification",
        content: `${oldUsername} has changed their name to ${newUsername}`
      };
      this.socket.send(JSON.stringify(message));
    }
  }

  componentDidMount() {
    //connect to socket
    this.socket = new WebSocket("ws://localhost:3001/", "protocolOne");
    this.socket.onopen = ev => {
      console.log("connected");
    };
    // handle incoming events
    this.socket.onmessage = event => {

      const messageIn = JSON.parse(event.data);

      switch (messageIn.type) {
        case "incomingMessage":
          const user = this.state.currentUser.name;
          const newMessage = {
            id: messageIn.id,
            username: messageIn.username,
            content: messageIn.content,
            color: messageIn.color
          };
          const messages = this.state.messages.concat(newMessage);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          const newNotification = {
            id: messageIn.id,
            content: messageIn.content,
            system: true
          };

          const updatedMessages = this.state.messages.concat(newNotification);
          this.setState({
            messages: updatedMessages,
            usersOnline: messageIn.onlineUsers
          });
          break;
        default:
          throw new Error("Unknown event type " + messageIn.type);
      }
    };
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty{" "}
          </a>
          <p className="navbar-users">{this.state.usersOnline} users online </p>
        </nav>
        <Chatbar
          currentUser={this.state.currentUser}
          postMessage={this.postMessage}
          changeUser={this.changeUser}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
