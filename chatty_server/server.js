// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);

  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  wss.broadcast(JSON.stringify({type: "incomingNotification", id:uuidv1(), content:"New user 'Anonymous' connected.",onlineUsers: wss.clients.size}));
  ws.on('message', function incoming(data) {
    const messageIn = JSON.parse(data)

    switch (messageIn.type) {
        case "postMessage":
          const messageOut = {
            type: "incomingMessage",
            id: uuidv1(),
            username: messageIn.username,
            content: messageIn.content
          }
          wss.broadcast(JSON.stringify(messageOut))
        break;
        case "postNotification":
        // handle incoming notification
        const notificationOut = {
          type: "incomingNotification",
          id: uuidv1(),
          content: messageIn.content
        }
        wss.broadcast(JSON.stringify(notificationOut))
        break;
        default:
        // show an error in the console if the message type is unknow
    }
    //
    // const messageOut = {
    //   type: "incomingMessage",
    //   id: uuidv1(),
    //   username: messageIn.username,
    //   content: messageIn.content
    // }
    // wss.broadcast(JSON.stringify(messageOut))
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({type: "incomingNotification", id:uuidv1(), content:"user disconnected",onlineUsers: wss.clients.size}));
    console.log('Client disconnected')
  });
});
