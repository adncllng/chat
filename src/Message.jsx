import React, { Component } from "react";

function Message({ content, username, color }) {

  const imgRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi;

  function getUrlofImageFromText(message) {
    let imgUrls = message.match(imgRegex);
    if (imgUrls) {
      return imgUrls.map((url, index) => {
        return <img className="message-image" src={url} key={index} />;
      });
    }
  }

  let image = getUrlofImageFromText(content);

  if (image) {
    content = content.replace(imgRegex, "");
  }

  return (
    <div className="message">
      <span className={`message-username ${color}`}>{username}</span>
      <span className="message-content">
        {content}
        {"\n"}
        {image}
      </span>
    </div>
  );
}

export default Message;
