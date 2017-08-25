var http = require('http');
var path = require('path');
var express = require('express');
var myMongo = require('./myMongo');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'views/dist')));



app.get("/home", (req, res) => {
    res.send({msg: 'hello mate!'});
});

app.get('/polls', (req, res) => {
    myMongo.getAllPolls((err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.get('/polls/:id', (req, res) => {
    myMongo.getPollById(req.params.id, (err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.post('/newpoll', (req, res) => {
    myMongo.addNewPoll(req.body, (err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/dist/index.html'));
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",  () => {
    var addr = server.address();
    console.log("Server listening at port", addr.address + ":" + addr.port);
})