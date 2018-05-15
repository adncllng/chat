import React, {Component} from 'react';
import Message from './message.jsx'

class MessageList extends Component {
render(){
  return (
    <main className="messages">
      <Message />
    </main>
  );
}

}

export default MessageList;
