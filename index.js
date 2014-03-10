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

io.sockets.on('connection', function(socket) {
    socket.emit('chat', messages);
    socket.on('addMessage', function(data) {
        if (data !== undefined) {
            messages.push(data);
            io.sockets.emit('update', data);
        }
    })
})

server.listen(8000);
console.log('app started on port 8000');
