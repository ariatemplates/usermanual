require("colors");

var argv = process.argv,
    fs = require('fs'),
    panda = require('panda-docs');

argv.shift();
argv.shift();

var version = argv[0];                                                  // Takes the doc version param if provided
var versions = [];                                                      // Array to store all the versions

console.log("GENERATING DOCUMENTATION".green);

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

    // For each version generates the html files
    versions.forEach(function(verj) {
        makeDevDocs(verj);
    });
});

// Generates the html files for the documentation
function makeDevDocs(verj) {
    
    copyFileSync("./resources/documentation.css", "./out/documentation.css");

    var options = {
        title: "Aria Templates Usermanual (" + verj + ")",
        skin: "./resources/articles/layout.jade",
        assets: "./resources/assets",
        disableTests: true,
        output: "./out/" + verj,
        outputAssets: "./out/" + verj
    }
    
    panda.make(["./src/" + verj], options, function(err, stats) {
        console.log(stats.files.length + ' files generated');
        console.log("Done.".bold)
        if (err) {
            console.error(err);
            process.exit(-1);
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
