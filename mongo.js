// Mongo DB server Connection
var MongoClient = require('mongodb').MongoClient;
var server = "mongodb://127.0.0.1:27017/test";

// Connect to the db
MongoClient.connect(server, function(err, db) {
    if(err) { return console.dir(err); }
    console.log('Mongo Connected');
});
