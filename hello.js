var nodeio = require('node.io');

var options = {
    timeout: 10,    //Timeout after 10 seconds
    max: 20,        //Run 20 threads concurrently (when run() is async)
    retries: 3      //Threads can retry 3 times before failing
};

var methods = {
    input : false,
    run: function() {
        this.emit('Pass');
        return;
    },
    fail: function (input, status) {
        //status = "timeout"
        this.emit('Fail'); //You still need to complete the thread with an emit or skip, etc.
    }
};


exports.job = new nodeio.Job(options, methods);
