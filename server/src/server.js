// import fs from 'fs';
// import https from 'https';
// import express from 'express';
import Server from 'socket.io';

export default function startServer(store) {

  // Server port
  const port = 8090;

  const io = new Server().attach(port);

  // // Configure SSL properties for the server
  // const sslProperties = {
  //   key: fs.readFileSync('./ssl/server.key'),
  //   cert: fs.readFileSync('./ssl/server.crt'),
  //   ca: fs.readFileSync('./ssl/ca.crt'),
  //   requestCert: true,
  //   rejectUnauthorized: false
  // }


  // // Create an Express application
  // var app = express();

  // // Instantiate the SSL server with Express
  // var server = https.createServer(sslProperties, app).listen(port, function() {
  //   console.log('Secure Express server listening on port', port);
  // });

  // // Hook the socket.io server
  // const io = new Server(server);

  // // Public folder for Express
  // app.use(express.static('public'));

  // Register to redux store
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // Listen to websocket events
  let connectCounter = 0;
  io.on('connection', (socket) => {
    connectCounter++;
    console.log('Online: ', connectCounter);

    // Emit store state
    socket.emit('state', store.getState().toJS());
    // Dispatch user actions to the redux store
    socket.on('action', store.dispatch.bind(store));

    // Keep track
    socket.on('disconnect', () => {
      connectCounter--;
    });
  });
}
