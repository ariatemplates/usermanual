require('colors');
var http = require('http');
var fs = require('fs');
var wrench = require('wrench');
var mysql = require('mysql');
var path = require('path');

var config = require('./config');
var mw2md = require('./mw2md');
var mw2md_topspot = require('./mw2md_topspot');

var wiki_destination = __dirname + "/mediawiki";
var markdown_destination = __dirname + "/markdown";
var images_destination = __dirname + "/images";

var directory_mappings = {
    "Around_Classes" :                          { dir: "core/concepts"                },
    "Atgen" :                                   { dir: "tools"                        },
    "AutoComplete" :                            { dir: "widgets/aria_widgets_lib"     },
    "Autoselect_Feature" :                      { dir: "widgets/around_widgets"       },
    "Button" :                                  { dir: "widgets/aria_widgets_lib"     },
    "CSS_Templates" :                           { dir: "templates/advanced"           },
    "Calendar" :                                { dir: "widgets/aria_widgets_lib"     },
    "CheckBox" :                                { dir: "widgets/aria_widgets_lib"     },
    "Code_Standards" :                          { dir: "tools"                        },
    "Controllers" :                             { dir: "modules/concepts"             },
    "Core_Layer_-_A_Javascript_Framework" :     { dir: "core"                         },
    "Core_Layer_Configuration" :                { dir: "core/advanced"                },
    "Creating_A_Custom_Widgets_Library" :       { dir: "widgets/custom_widgets_lib"   },
    "DOM_Events" :                              { dir: "templates/advanced"           },
    "Data_Model_and_Data_Binding" :             { dir: "templates/concepts"           },
    "DateField" :                               { dir: "widgets/aria_widgets_lib"     },
    "DatePicker" :                              { dir: "widgets/aria_widgets_lib"     },
    "Dialog" :                                  { dir: "widgets/aria_widgets_lib"     },
    "Div" :                                     { dir: "widgets/aria_widgets_lib"     },
    "ErrorList" :                               { dir: "widgets/aria_widgets_lib"     },
    "Fieldset" :                                { dir: "widgets/aria_widgets_lib"     },
    "Filters" :                                 { dir: "core/advanced"                },
    "Flow_Controllers" :                        { dir: "modules/advanced"             },
    "Form_Submissions" :                        { dir: "appendices"                   },
    "Gauge" :                                   { dir: "widgets/aria_widgets_lib"     },
    "Helpers" :                                 { dir: "core/concepts"                },
    "Icon" :                                    { dir: "widgets/aria_widgets_lib"     },
    "IconButton" :                              { dir: "widgets/aria_widgets_lib"     },
    "Initialization_Sequence" :                 { dir: "appendices"                   },
    "Interactions_with_the_DOM" :               { dir: "templates/advanced"           },
    "Interceptors" :                            { dir: "core/advanced"                },
    "Introduction" :                            { dir: "intro"                        },
    "JSON_Bean_Definitions" :                   { dir: "core/advanced"                },
    "Javascript_Classes" :                      { dir: "core/concepts"                },
    "Keyboard_Navigation" :                     { dir: "templates/advanced"           },
    "Link" :                                    { dir: "widgets/aria_widgets_lib"     },
    "List" :                                    { dir: "widgets/aria_widgets_lib"     },
    "Localization_and_Resources" :              { dir: "templates/advanced"           },
    "Logging_and_debugging" :                   { dir: "appendices"                   },
    "Macro_Libraries" :                         { dir: "templates/advanced"           },
    //"Main" :                                    "main" ,
    "Modules_Filters" :                         { dir: "modules/advanced"             },
    "MultiAutoComplete" :                       { dir: "widgets/aria_widgets_lib"     },
    "MultiSelect" :                             { dir: "widgets/aria_widgets_lib"     },
    "NumberField" :                             { dir: "widgets/aria_widgets_lib"     },
    "Overview" :                                { dir: "intro"                        },
    "PasswordField" :                           { dir: "widgets/aria_widgets_lib"     },
    "Prefill_Feature" :                         { dir: "widgets/around_widgets"       },
    "RadioButton" :                             { dir: "widgets/aria_widgets_lib"     },
    "Refresh" :                                 { dir: "templates/concepts"           },
    "Request_from_a_controller" :               { dir: "modules/concepts"             },
    //"Scripts" :                                 "scripts" ,
    "Select" :                                  { dir: "widgets/aria_widgets_lib"     },
    "SelectBox" :                               { dir: "widgets/aria_widgets_lib"     },
    "SortIndicator" :                           { dir: "widgets/aria_widgets_lib"     },
    "Tab" :                                     { dir: "widgets/aria_widgets_lib"     },
    "TabPanel" :                                { dir: "widgets/aria_widgets_lib"     },
    "Template" :                                { dir: "widgets/aria_widgets_lib"     },
    "Template_Inheritance" :                    { dir: "templates/advanced"           },
    "Template_Scripts" :                        { dir: "templates/concepts"           },
    "Templating_Layer_-_A_Template_Engine" :    { dir: "templates"                    },
    "Text" :                                    { dir: "widgets/aria_widgets_lib"     },
    "TextField" :                               { dir: "widgets/aria_widgets_lib"     },
    "Text_Templates" :                          { dir: "templates/advanced"           },
    "The_Aria_Singleton" :                      { dir: "core/concepts"                },
    "The_Aria_Templates_Widgets_Collection" :   { dir: "widgets/aria_widgets_lib"     },
    "The_HTML_Widgets_Library" :                { dir: "widgets/html_widgets_lib"     },
    "TimeField" :                               { dir: "widgets/aria_widgets_lib"     },
    "Tooltip" :                                 { dir: "widgets/aria_widgets_lib"     },
    "URL_handling" :                            { dir: "appendices"                   },
    "Using_Sub_Controllers" :                   { dir: "modules/advanced"             },
    "Validators" :                              { dir: "widgets/around_widgets"       },
    "Views" :                                   { dir: "templates/advanced"           },
    "What_are_Templates" :                      { dir: "templates/concepts"           },
    "Widget_Bindings" :                         { dir: "widgets/around_widgets"       },
    "Widgets" :                                 { dir: "widgets"                      },
    "Working_in_an_Asynchronous_World" :        { dir: "core/concepts"                },
    "Writing_Templates" :                       { dir: "templates/concepts"           }
};


console.log("Creating local folders".yellow);
if (fs.existsSync(markdown_destination)) {
    wrench.rmdirSyncRecursive(markdown_destination);
    wrench.rmdirSyncRecursive(wiki_destination);
    wrench.rmdirSyncRecursive(images_destination);
}

fs.mkdirSync(markdown_destination);
console.log('Folder', markdown_destination, 'created');

fs.mkdirSync(images_destination);
console.log('Folder', images_destination, 'created');

fs.mkdirSync(wiki_destination);
fs.mkdirSync(wiki_destination+'/html');
console.log('Folder', wiki_destination, "created");


// Connect to the MySql db, grab the article list
var connection = mysql.createConnection({
    host: config.db.host || "localhost",
    port: config.db.port || 3306,
    user: config.db.user || "root",
    password: config.db.password || "",
    database: config.db.database
});

connection.connect(function(err) {
    if (err) throw err;
    var msg = "Connection established to " + config.db.host + " MySql server";
    console.log(msg.yellow);
});

var query = [
    "SELECT",
    "p.page_id AS pageID",
    ", r.rev_text_id AS textID",
    ", p.page_title AS pageTitle",
    "FROM page p",
    "LEFT JOIN revision r ON p.page_latest=r.rev_id",
    "WHERE",
	"p.page_namespace=0",
	"AND p.page_is_redirect=0"
];
query = query.join(" ") + ";";

connection.query(query, function(err, rows, fields) {
    var pages = [];
    if (err) throw err;

    for(var i = 0, l = rows.length; i < l; i++) {
        var title = rows[i].pageTitle.toString('utf8');
        title = title.replace("?", "");
        var config = directory_mappings[title];
        if (config) {
            pages.push({ title: title, textId: rows[i].textID, config: config});
        }
    }

    console.log(''+pages.length, "article(s) qeued");

    pages.forEach(function(page, index, arr) {
        save_mediawiki_text(page, (index == (arr.length - 1)));
    });
});

var save_mediawiki_text = function(page, last) {
    connection.query("SELECT old_text FROM text WHERE old_id = ?", [page.textId], function(err, results) {
        var wiki_filename = wiki_destination + '/' + page.title + '.wiki';
        var md_filename = get_page_path(page);
        var text = results[0].old_text.toString();
        var markdown = mw2md_topspot.before(text);
        markdown = mw2md.convert(markdown, page.title);
        markdown = mw2md_topspot.after(markdown);

        save_to_file(wiki_filename, text, function() {
            save_to_file(md_filename, markdown, function() {
                save_mediawiki_html(page.title, last);
            });
        });
    });
}

var save_mediawiki_html = function(pageTitle, last) {

    var options = {
        host: config.wiki.host,
        port: config.wiki.port || 80,
        path: '/' + config.wiki.wiki + '/' + pageTitle + '?action=render'
    };

    http_get(options, function(htmlPageContent, statusCode) {
        var filename = wiki_destination + '/html/' + pageTitle + '.html';
        console.log('Page title:'.yellow, pageTitle, 'Status code:'.green, statusCode);

        save_to_file(filename, htmlPageContent, function() {
            htmlPageContent.replace(/img.*src=['"]([^'"\/]*\/*[^'"]+)['"]/ig, function(matches, image_path) {
                var image_name = path.basename(image_path).toLowerCase().replace(/ /ig,"_");
                var image_options = {
                    host: config.wiki.host,
                    port: config.wiki.port || 80,
                    path: '/' + image_path,
                    encoding: 'binary'
                }
                http_get(image_options, function(image, statusCode) {
                    var image_filepath = images_destination + '/' + image_name;
                    save_to_binary_file(image_filepath, image, function() {
                        console.log('Image retrieved:'.yellow, image_filepath);
                    });
                });
            });
            if (last) {
                connection.end(function(err) {
                    console.log("MySql connection closed".yellow);
                });
            }
        });
    });
};


var http_get = function(options, callback) {
    var content = '';
    http.get(options, function(res) {
        if (options.encoding) {
            res.setEncoding(options.encoding);
        }
        res.on('data', function(chunk) {
            content += chunk;
        });
        
        res.on('end', function() {
            callback(content, res.statusCode);
        });
    }).on('error', function(err) {
        console.log(err.message);
    });
};


var get_page_path = function(pageDef) {
    var lpath = markdown_destination + '/' + pageDef.config.dir;
    if (!fs.existsSync(lpath)) {
        wrench.mkdirSyncRecursive(lpath);
    }
    //var filename = pageDef.config.name ? pageDef.config.name : pageDef.title.toLowerCase();
    var filename = pageDef.title.toLowerCase().replace(/-/g, "").replace(/__/g, "_");
    return lpath + '/' + filename + '.md';
};

var save_to_binary_file = function(path, content, callback) {
    fs.writeFile(path, content, 'binary', callback || function() {});
}

var save_to_file = function(path, content, callback) {
    var writeStream = fs.createWriteStream(path);
    writeStream.write(content);
    writeStream.end();
    console.log('Saved to disk:'.green, path);
    if (callback) {
        callback();
    }
}