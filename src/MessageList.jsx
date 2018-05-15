import React, {Component} from 'react';
import Message from './message.jsx'

class MessageList extends Component {
render(){
  const messages = this.props.messages.map((message, index) => {
    return (
      <Message username={message.username} content={message.content} key={index}/>
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
