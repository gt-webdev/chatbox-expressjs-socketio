var express = require("express");

var app = express();


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

app.listen(8000);
console.log('app started on port 8000');
