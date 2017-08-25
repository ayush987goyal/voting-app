var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var exports = module.exports = {};

var MongoClient = mongodb.MongoClient;
var dbUrl = process.env.MONGOLAB_URI;

exports.getAllPolls = function (callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;

        db.collection('polls').find({

        }).toArray((err, docs) => {
            if(err) throw err;

            db.close();
            callback(null, docs);
        })
    })
}

exports.getPollById = function (pollId, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;

        db.collection('polls').find({
            _id : ObjectId(pollId)
        }).toArray((err, docs) => {
            if(err) throw err;

            db.close();
            callback(null, docs);
        })
    })
}

exports.addNewPoll = function (poll, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;

        db.collection('polls').insert(poll, (err, data) => {
            if(err) throw err;

            db.close();
            callback(null, data);
        })
    })
}