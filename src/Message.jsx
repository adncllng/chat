import React, { Component } from "react";

function Message({ content, username, color }) {

  //regex for png jpg gif jpeg images
  const imgRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi;
  //gets urls of images and
  let imgUrls = content.match(imgRegex);
  //contents of message with the urls replaced by ""
  let contents = content.replace(imgRegex, "");
  //array for images jsx
  let images = [];
  // if we have any images
  if (imgUrls) {
    //go through the images one by one and
    images = imgUrls.map((url, index) => {
      // return jsx into images array
      return <img className="message-image" src={url} key={index} />;
    });
  }

  return (
    <div className="message">
      <span
      //uses prop 'color' to dynamically change the style
        style={{
          color: color
        }}
        className="message-username" >
        {username}
      </span>
      <span className="message-content">
        {contents}
        {"\n"}
        //uses length and && operator to prevent rendering an empty images array
        {images.length && images}
      </span>
    </div>
  );
}

export default Message;
