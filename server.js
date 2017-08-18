var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'views/dist')));

app.get("/home", (req, res) => {
    res.send({msg: 'hello mate!'});
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",  () => {
    var addr = server.address();
    console.log("Server listening at port", addr.address + ":" + addr.port);
})