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
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);

  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(data) {
    const messageIn = JSON.parse(data)
    const messageOut = {id:uuidv1(), username: messageIn.username, content:messageIn.content}
    // {id: "0b2635a4-82b0-4e49-803e-2b901be71cf6", username: "Bob", content: "Hi"}
    console.log('USER',messageIn.username,'SAID',messageIn.content);
    console.log(uuidv1());
    wss.broadcast(JSON.stringify(messageOut))
    // ws.send(JSON.stringify(messageOut))
    // wss.broadcast = function broadcast(data) {
    //   wss.clients.forEach(function each(client) {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send("fuckinasdgasdf");
    //     }
    //   });
    // };


  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
