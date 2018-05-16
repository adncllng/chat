import React, {Component} from 'react';
import Message from './message.jsx'

class MessageList extends Component {
render(){
  const messages = this.props.messages.map((message, index) => {
    if(message.system){
      return(
        <div className="message system" key={message.id}>{message.content}</div>
      )
    }
    return (
      <Message color={message.color} username={message.username} content={message.content} key={message.id}/>
    )
  })
  return (
    <main className="messages">
     {messages}
    </main>
  );
}
}
export default MessageList;
