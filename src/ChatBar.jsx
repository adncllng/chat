import React, { Component } from "react";

function Chatbar({ currentUser, changeUser, postMessage }) {
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder={currentUser.name}
        onKeyPress={changeUser}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={postMessage}
      />
    </footer>
  );
}

export default Chatbar;
