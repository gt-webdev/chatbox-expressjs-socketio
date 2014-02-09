var express = require("express");

var app = express();

app.get('/', function(req, res) {
  res.sendfile('./res/chat.html');
});

app.get('/style.css', function(req, res) {
  res.sendfile('./res/style.css');
});

app.get('/script.js', function(req, res) {
  res.sendfile('./res/script.js');
});

app.listen(8000);
console.log('app started on port 8000');
