require("colors");
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');

var wrench = require('wrench');


var app = module.exports = express();
var server = http.createServer(app);

var public_folder = __dirname + "/test/public/";

var check_public_folder = function(req, res, next) {
    if(!fs.existsSync(public_folder)) {
        wrench.mkdirSyncRecursive(public_folder);
    }
    next();
}

app.use(express.static(public_folder));

app.use('/usermanual', express.static(__dirname + "/out"));
app.use(app.router);

app.use(check_public_folder);
app.use(function(req, res) {
    //console.log(require('util').inspect(req));
    var file = path.normalize(public_folder + req.originalUrl);
    if (!fs.existsSync(file)) {
        http.get("http://ariatemplates.com/" + req.originalUrl, function(response) {
            if (response.statusCode === 200) {
                var filepath = path.dirname(file);
                if (!fs.existsSync(filepath)) {
                    wrench.mkdirSyncRecursive(filepath);
                }
                var local = fs.createWriteStream(file, { encoding: 'binary', flag: 'w' });
                response.pipe(local).pipe(res);
                console.log(" ✔".yellow.bold, req.originalUrl.yellow, "has been replicated locally successfully");
            } else {
                console.error(" ⨯".red.bold, "Something failed while retrieving".red, file.red);
                res.send("Failed !");
            }
        });
    }
});


app.get("/", function(req, res) {
    res.redirect("/usermanual/latest/");
});

app.get("/usermanual/:version/:page", function(req, res) {
    res.sendfile(__dirname + "/out/" + req.params.version + "/" + req.params.page + ".html");
});


server.listen(8000);
console.log("Usermanual Local Test Server".bold, "started on port", "8000".cyan);
console.log("Open", "http://localhost:8000/".bold, "in your browser");

