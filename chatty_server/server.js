// server.js

const express = require("express");
//socket server
const SocketServer = require("ws").Server;
//for to make unique ids
const uuidv1 = require("uuid/v1");
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );
// colors array ultimately for usernames
const colors = ["one", "two", "three", "four"];
// counter for color array
let counter = 0;
// Create the WebSockets server
const wss = new SocketServer({
  server
});

// helper method for each client send data
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on("connection", ws => {
  //increments counter till its 5 then makes it zero
  counter < 3 ? counter++ : (counter = 0);
  //gives ws color property at index of counter .
  ws.color = colors[counter];
  // use helper method for each client send out "incomingNotification"
  wss.broadcast(
    JSON.stringify({
      type: "incomingNotification",
      id: uuidv1(),
      content: "New user 'Anonymous' connected.",
      onlineUsers: wss.clients.size
    })
  );
  // on incoming message
  ws.on("message", function incoming(data) {
    // parse message
    const messageIn = JSON.parse(data);
    //switch for types of incoming messages
    switch (messageIn.type) {
      //in case of postMessage
      case "postMessage":
        const messageOut = {
          type: "incomingMessage",
          id: uuidv1(),
          username: messageIn.username,
          content: messageIn.content,
          color: ws.color
        };
        //use helper method for each client send out postMessage
        wss.broadcast(JSON.stringify(messageOut));
        break;
      case "postNotification":
        // in case  of postNotification
        const notificationOut = {
          type: "incomingNotification",
          id: uuidv1(),
          content: messageIn.content,
          onlineUsers: wss.clients.size
        };
        //use helper method for each client send out postNotification
        wss.broadcast(JSON.stringify(notificationOut));
        break;
      default:
      // show an error in the console if the message type is unknow
    }
  });
  // a callback for when a client closes the socket. This means they closed their browser.
  ws.on("close", () => {
    //use helper method to for each client send out incomingNotification
    wss.broadcast(
      JSON.stringify({
        type: "incomingNotification",
        id: uuidv1(),
        content: "user disconnected",
        onlineUsers: wss.clients.size
      })
    );

    console.log("Client disconnected");
  });
});
