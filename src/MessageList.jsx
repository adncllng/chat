import React, { Component } from "react";
import Message from "./message.jsx";

function MessageList({ messages }) {
  const messagesArr = messages.map((message, index) => {
    if (message.system) {
      return (
        <div className="message system" key={message.id}>
          {message.content}
        </div>
      );
    }
    return (
      <Message
        color={message.color}
        username={message.username}
        content={message.content}
        key={message.id}
      />
    );
  });
  return <main className="messages">{messagesArr}</main>;
}
export default MessageList;
