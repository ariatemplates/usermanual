require("colors");

var argv = process.argv,
    fs = require('fs'),
    panda = require('panda-docs'),
    async = require('async'),
    path = require('path'),
    wrench = require('wrench');

argv.shift();
argv.shift();

var version;               // Takes the doc version param if provided
var versions = [];         // Array to store all the versions

// Usage:
//  node build [--production|--development] [<version>]

var arg1 = argv[0];
if (arg1 == "--production" || arg1 == "--development") {
    arg1 = arg1.slice(2);
    console.log("Setting NODE_ENV to " + arg1);
    process.env.NODE_ENV = arg1;
    version = argv[1];
} else {
    version = argv[0];
}
var samplesOrigin = (process.env.NODE_ENV == "production") ? "ariatemplates.com" : "localhost:3000";
console.log(("Samples will be fetched from " + samplesOrigin + "\n").yellow.bold);

console.log("GENERATING DOCUMENTATION".cyan.bold);

// Check if I have to build all the versions or just one (x.y.z or latest/next)
fs.readdir(path.join(__dirname, "src"), function(err, files) {
    if ("latest" == version || "next" == version) {
        versions.push(version);
    }
    else if (/[\d]\.[\d]\.[\d]/.test(version)) {
        versions.push(version);
    }
    else {
        versions = files;
        versions = versions.filter(function (value) {
            return (value === '' || value == "index.md" || value.match(/^\./)) ? 0 : 1;
        });
    }

    copyFileSync(path.join(__dirname,"resources", "documentation.css"), path.join(__dirname,"out", "documentation.css"));

    // For each version generates the html files
    var series = [];
    versions.forEach(function(verj) {
        series.push(function(cb) {
            console.log("BUILDING ".green + verj.green);
            makeDevDocs(verj, cb);
        });
    });

    async.series(series, function(err, results) {
        if (!err) {
            console.log("DOCUMENTATION GENERATED ✔".green);
        } else {
            console.log("GENERATION FAILED ⨯".red.bold);
        }
    });
});

// Generates the html files for the documentation
function makeDevDocs(verj, callback) {

    var options = {
        title: "Aria Templates Usermanual (" + verj + ")",
        skin: path.join(__dirname, "resources", "articles", "layout.jade"),
        assets: path.join(__dirname,"resources", "assets"),
        disableTests: true,
        keepOutDir: false,
        output: path.join(__dirname,"out", verj),
        outputAssets: path.join(__dirname, "out"),
        extension: ".md"
    };

    panda.make([path.join(__dirname, "src", verj)], options, function(err, stats) {
        if (err) {
            console.error(err);
            console.log("BUILD ⨯".red);
            callback(err);
        } else {
            console.log(stats.files.length + ' files generated');
            console.log("BUILD ✔".green);
            callback(null);
        }
    });
}


function copyFileSync(srcFile, destFile) {
    var BUF_LENGTH = 64*1024;
    var _buff = new Buffer(BUF_LENGTH);

    var fdr = fs.openSync(srcFile, 'r');
    var destPath = path.dirname(destFile);
    if (!fs.existsSync(destPath)) {
        wrench.mkdirSyncRecursive(destPath);
    }
    var fdw = fs.openSync(destFile, 'w');
    var bytesRead = 1;
    var pos = 0;

    console.log("Copying " + srcFile +" to " + destFile);

    while (bytesRead > 0) {
        bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw,_buff,0,bytesRead);
        pos += bytesRead;
    }

    fs.closeSync(fdr);
    fs.closeSync(fdw);
}
