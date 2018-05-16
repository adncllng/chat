import React, {Component} from 'react';

class Message extends Component {
  render(){
    const imgRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/ig ;
    let imgUrls = this.props.content.match(imgRegex);
    let content = this.props.content.replace(imgRegex, "");
    let images = [];
    if(imgUrls){
      images = imgUrls.map((url, index)=>{
      return (<img className="message-image" src={url} key = {index}/>)
    })}

    return (
      <div className="message">
        <span style={{color: this.props.color}} className="message-username">{this.props.username}</span>
        <span className="message-content">{content}{"\n"}
        {images}
        </span>
      </div>
    );
  }
}

export default Message;
