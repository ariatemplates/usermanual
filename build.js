﻿require("colors");

var argv = process.argv,
    fs = require('fs'),
    panda = require('panda-docs'),
    async = require('async');

argv.shift();
argv.shift();

var version = argv[0];     // Takes the doc version param if provided
var versions = [];         // Array to store all the versions

console.log("GENERATING DOCUMENTATION".cyan.bold);

// Check if I have to build all the versions or just one (x.y.z or latest)
fs.readdir("./src", function(err, files) {
    if ("latest" == version) {
        versions.push("latest");
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
    
    copyFileSync("./resources/documentation.css", "./out/documentation.css");

    // For each version generates the html files
    var series = []
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
        skin: "./resources/articles/layout.jade",
        assets: "./resources/assets",
        disableTests: true,
        output: "./out/" + verj,
        outputAssets: "./out/",
        extension: ".md"
    }
    
    panda.make(["./src/" + verj], options, function(err, stats) {
        if (err) {
            console.error(err);
            console.log("BUILD ⨯".red);
            callback(err);
        } else {
            console.log(stats.files.length + ' files generated');
            console.log("BUILD ✔".green);
            callback(null)
        }
    });
}


function copyFileSync(srcFile, destFile) {
    var BUF_LENGTH = 64*1024;
    var _buff = new Buffer(BUF_LENGTH);

    var fdr = fs.openSync(srcFile, 'r');
    var fdw = fs.openSync(destFile, 'w');
    var bytesRead = 1;
    var pos = 0

    console.log("Copying documentation.css to " + destFile);
    
    while (bytesRead > 0) {
        bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw,_buff,0,bytesRead);
        pos += bytesRead;
    }
        
    fs.closeSync(fdr);
    fs.closeSync(fdw);
}
