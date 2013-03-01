var nodeio = require('node.io');
// Mongo DB server Connection
var MongoClient = require('mongodb').MongoClient;
var server = "mongodb://127.0.0.1:27017/test";

// Connect to the db
var options = {
    timeout: 10,    //Timeout after 10 seconds
    max: 20,        //Run 20 threads concurrently (when run() is async)
    retries: 3      //Threads can retry 3 times before failing
};

var methods = {
    input : false,
    run: function() {
        this.insert({ str: "foobar" });
        this.emit('Pass');
        return;
    },
    fail: function (input, status) {
        this.emit('Fail'); //You still need to complete the thread with an emit or skip, etc.
    },
    insert: function(arg){
        this.emit(arg);
        MongoClient.connect(server, function(err, db, arg) {
          if(err) { return console.dir(err); }
          console.dir('Mongo Connected');
          console.dir(arg);
          db.collection("test").insert(arg, function (err, inserted) {
                if (err) {
                    console.dir(err);
                    return;
                }
                console.dir(inserted);
                return;
            });
        });
    }
};

exports.job = new nodeio.Job(options, methods);
