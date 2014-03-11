var express = require("express");

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.bodyParser());

//set up an array of messages
var messages = [];

//get static files
// get the main html page at /
app.get('/', function(req, res) {
    res.sendfile('./res/chat.html');
});

// get the main css file at /style.css
app.get('/style.css', function(req, res) {
    res.sendfile('./res/style.css');
});

// get the main js file at /script.js
app.get('/script.js', function(req, res) {
    res.sendfile('./res/script.js');
});

// when a client connects to the server,
io.sockets.on('connection', function(socket) {
    // the server emits a chat event and sends
    // the array of all messages.
    socket.emit('chat', messages);
    // the server registers a callback
    // if it receives an event called addMessage
    socket.on('addMessage', function(data) {
        // it adds the data (a new message) to the
        // messages array, and updates the other clients
        if (data !== undefined) {
            messages.push(data);
            io.sockets.emit('update', data);
        }
    })
})

// tells the server to listen to port 8000
server.listen(8000);
console.log('app started on port 8000');
