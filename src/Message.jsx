import React, { Component } from "react";

function Message({ content, username, color }) {
  const imgRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi;
  let imgUrls = content.match(imgRegex);
  let contents = content.replace(imgRegex, "");
  let images = [];

  if (imgUrls) {
    images = imgUrls.map((url, index) => {
      return <img className="message-image" src={url} key={index} />;
    });
  }

  return (
    <div className="message">
      <span
        style={{
          color: color
        }}
        className="message-username"
      >
        {username}
      </span>
      <span className="message-content">
        {contents}
        {"\n"}
        {images.length && images}
      </span>
    </div>
  );
}

export default Message;
