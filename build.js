require("colors");

var argv = process.argv,
    fs = require('fs'),
    panda = require('panda-docs'),
    _ =  require('underscore')._,
    wrench = require('wrench');

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
    var outDir = "./out/" + verj;
    var manifestFile = "./src/" + verj + "/manifest.json";

    if (!fs.existsSync(outDir)) {
        wrench.mkdirSyncRecursive(outDir);      
    }

    panda.make([manifestFile, "--template", "./resources/articles/layout.jade", "--assets", "./resources/assets", "-d", "-t", "Aria Templates Usermanual", "-o", outDir, "--outputAssets", "./out/" + verj], function(err) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
    });
}

function generateToc(input) {
    var lines = input.split('\n'),
        _lines = _(lines).chain(),

        allHeaders = getHashedHeaders(_lines).concat(getUnderlinedHeaders(_lines)),
        lowestRank = _(allHeaders).chain().pluck('rank').min().value(),
        linkedHeaders = _(allHeaders).map(addLink);

    if (linkedHeaders.length === 0) return false;

    var toc = linkedHeaders.map(function (x) {
            var indent = _(_.range(x.rank - lowestRank))
                .reduce(function (acc, x) { return acc + '\t'; }, '');

            return indent + '- [' + x.name + '](' + x.link + ')';
        })
        .join('\n') +
        '\n';

    return toc;
}

function getUnderlinedHeaders (_lines) {
    // Find headers of the form
    // h1       h2
    // ==       --
    
    return _lines
        .map(function (line, index, lines) {
            if (index === 0) return null;
            var rank;
                
            if (/^==+/.exec(line))      rank = 1;
            else if (/^--+/.exec(line)) rank = 2;
            else                        return null;

            return {
                rank  :  rank,
                name  :  lines[index - 1],
                line  :  index - 1
            };
        })
        .filter(notNull)
        .value();
}

function getHashedHeaders (_lines) {
    // Find headers of the form '### xxxx xxx xx'
    return _lines
        .map(function (x, index) {
            var match = /^(\#{1,8})[ ]*(.+)$/.exec(x);
            
            return match ?  { 
                    rank  :  match[1].length,
                    name :  match[2],
                    line  :  index
                } : null;
        })
        .filter(notNull)
        .value();
}

function addLink(header) {
    return _(header).extend({ 
        link:  '#' + header.name.trim().toLowerCase()
            .replace(/ /g,'-')
            .replace(/[`.,()*]/g,'')
    });
}

function notNull(x) { return  x !== null; }
