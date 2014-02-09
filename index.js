var express = require("express");

var app = express();

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


//Send messages array at /api/messages.json
app.get('/api/messages.json', function(req, res) {
  res.send(JSON.stringify(messages));
});

//accept POST requests to add a new messages
app.post('/', function(req, res) {
  if (req.body && req.body.msg !== undefined) {
    messages.push(req.body.msg);
  }
  res.redirect('/');
});

app.listen(8000);
console.log('app started on port 8000');
