var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'views/dist')));

app.get("/home", (req, res) => {
    res.send({msg: 'hello mate!'});
});

server.listen(3000, () => {
    var addr = server.address();
    console.log("Server listening at port", addr.port);
})