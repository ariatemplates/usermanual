require('colors');
var http = require('http');
var fs = require('fs');
var wrench = require('wrench');
var mysql = require('mysql');

var config = require('./config');
var mw2md = require('./mw2md');
var mw2md_topspot = require('./mw2md_topspot');

var wiki_destination = "mediawiki";
var markdown_destination = "markdown";

var directory_mappings = {
    "Around_Classes" :                          { dir: "core/concepts",                 name: "around_classes" } ,
    "Atgen" :                                   { dir: "tools",                         name: "atgen" },
    "AutoComplete" :                            { dir: "widgets/aria_widgets_lib",      name: "autocomplete" },
    "Autoselect_Feature" :                      { dir: "widgets/around_widgets",        name: "autoselect_feature" },
    "Button" :                                  { dir: "widgets/aria_widgets_lib",      name: "button" },
    "CSS_Templates" :                           { dir: "templates/advanced",            name: "css_templates" } ,
    "Calendar" :                                { dir: "widgets/aria_widgets_lib",      name: "calendar" },
    "CheckBox" :                                { dir: "widgets/aria_widgets_lib",      name: "checkbox" },
    "Code_Standards" :                          { dir: "tools",                         name: "code_standards" },
    "Controllers" :                             { dir: "modules/concepts",              name: "controllers" },
    "Core_Layer_-_A_Javascript_Framework" :     { dir: "core",                          name: "core_layer_a_javascript_framework" },
    "Core_Layer_Configuration" :                { dir: "core/advanced",                 name: "core_layer_configuration" },
    "Creating_A_Custom_Widgets_Library" :       { dir: "widgets/custom_widgets_lib",    name: "creating_a_custom_widgets_library" } ,
    "DOM_Events" :                              { dir: "templates/advanced",            name: "dom_events" },
    "Data_Model_and_Data_Binding" :             { dir: "templates/concepts",            name: "data_model_and_data_binding" } ,
    "DateField" :                               { dir: "widgets/aria_widgets_lib",      name: "datefield" },
    "DatePicker" :                              { dir: "widgets/aria_widgets_lib",      name: "datepicker" },
    "Dialog" :                                  { dir: "widgets/aria_widgets_lib",      name: "dialog" },
    "Div" :                                     { dir: "widgets/aria_widgets_lib",      name: "div" },
    "ErrorList" :                               { dir: "widgets/aria_widgets_lib",      name: "errorlist" },
    "Fieldset" :                                { dir: "widgets/aria_widgets_lib",      name: "fieldset" },
    "Filters" :                                 { dir: "core/advanced",                 name: "filters" } ,
    "Flow_Controllers" :                        { dir: "modules/advanced",              name: "flow_controllers" },
    "Form_Submissions" :                        { dir: "appendices",                    name: "form_submissions" },
    "Gauge" :                                   { dir: "widgets/aria_widgets_lib",      name: "gauge" },
    "Helpers" :                                 { dir: "core/concepts",                 name: "helpers" },
    "Icon" :                                    { dir: "widgets/aria_widgets_lib",      name: "icon" },
    "IconButton" :                              { dir: "widgets/aria_widgets_lib",      name: "iconbutton" },
    "Initialization_Sequence" :                 { dir: "appendices",                    name: "initialization_sequence" } ,
    "Interactions_with_the_DOM" :               { dir: "templates/advanced",            name: "interactions_with_the_dom" },
    "Interceptors" :                            { dir: "core/advanced",                 name: "interceptors" },
    "Introduction" :                            { dir: "intro",                         name: "introduction" },
    "JSON_Bean_Definitions" :                   { dir: "core/advanced",                 name: "json_bean_definitions" },
    "Javascript_Classes" :                      { dir: "core/concepts",                 name: "javascript_classes" },
    "Keyboard_Navigation" :                     { dir: "templates/advanced",            name: "keyboard_navigation" },
    "Link" :                                    { dir: "widgets/aria_widgets_lib",      name: "link" },
    "List" :                                    { dir: "widgets/aria_widgets_lib",      name: "list" },
    "Localization_and_Resources" :              { dir: "templates/advanced",            name: "localization_and_resources" },
    "Logging_and_debugging" :                   { dir: "appendices",                    name: "logging_and_debugging" },
    "Macro_Libraries" :                         { dir: "templates/advanced",            name: "macro_libraries" },
    //"Main" :                                    "main" ,
    "Modules_Filters" :                         { dir: "modules/advanced",              name: "modules_filters" },
    "MultiSelect" :                             { dir: "widgets/aria_widgets_lib",      name: "multiselect" },
    "NumberField" :                             { dir: "widgets/aria_widgets_lib",      name: "numberfield" },
    "Overview" :                                { dir: "intro",                         name: "overview" },
    "PasswordField" :                           { dir: "widgets/aria_widgets_lib",      name: "passwordfield" },
    "Prefill_Feature" :                         { dir: "widgets/around_widgets",        name: "prefill_feature" },
    "RadioButton" :                             { dir: "widgets/aria_widgets_lib",      name: "radiobutton" },
    "Refresh" :                                 { dir: "templates/concepts",            name: "refresh" },
    "Request_from_a_controller" :               { dir: "modules/concepts",              name: "request_from_a_controller" },
    //"Scripts" :                                 "scripts" ,
    "Select" :                                  { dir: "widgets/aria_widgets_lib",      name: "select" },
    "SelectBox" :                               { dir: "widgets/aria_widgets_lib",      name: "selectbox" },
    "SortIndicator" :                           { dir: "widgets/aria_widgets_lib",      name: "sortindicator" },
    "Tab" :                                     { dir: "widgets/aria_widgets_lib",      name: "tab" },
    "TabPanel" :                                { dir: "widgets/aria_widgets_lib",      name: "tabpanel" },
    "Template" :                                { dir: "widgets/aria_widgets_lib",      name: "template" },
    "Template_Inheritance" :                    { dir: "templates/advanced",            name: "template_inheritance" },
    "Template_Scripts" :                        { dir: "templates/concepts" ,           name: "template_scripts" },
    "Templating_Layer_-_A_Template_Engine" :    { dir: "templates" ,                    name: "templating_layer_a_template_engine" },
    "Text" :                                    { dir: "widgets/aria_widgets_lib" ,     name: "text" },
    "TextField" :                               { dir: "widgets/aria_widgets_lib" ,     name: "textfield" },
    "Text_Templates" :                          { dir: "templates/advanced" ,           name: "text_templates" } ,
    "The_Aria_Singleton" :                      { dir: "core/concepts" ,                name: "the_aria_singleton" },
    "The_Aria_Templates_Widgets_Collection" :   { dir: "widgets/aria_widgets_lib" ,     name: "the_aria_templates_widgets_collection" },
    "The_HTML_Widgets_Library" :                { dir: "widgets/html_widgets_lib" ,     name: "the_html_widgets_library" },
    "TimeField" :                               { dir: "widgets/aria_widgets_lib" ,     name: "timefield" },
    "Tooltip" :                                 { dir: "widgets/aria_widgets_lib" ,     name: "tooltip" },
    "URL_handling" :                            { dir: "appendices" ,                   name: "url_handling" },
    "Using_Sub_Controllers" :                   { dir: "modules/advanced" ,             name: "using_sub_controllers" },
    "Validators" :                              { dir: "widgets/around_widgets" ,       name: "validators" },
    "Views" :                                   { dir: "templates/advanced" ,           name: "views" },
    "What_are_Templates" :                      { dir: "templates/concepts" ,           name: "what_are_templates" },
    "Widget_Bindings" :                         { dir: "widgets/around_widgets" ,       name: "widget_bindings" },
    "Widgets" :                                 { dir: "widgets" ,                      name: "widgets" },
    "Working_in_an_Asynchronous_World" :        { dir: "core/concepts" ,                name: "working_in_an_asynchronous_world" },
    "Writing_Templates" :                       { dir: "templates/concepts" ,           name: "writing_templates" }
};


console.log("Creating local folders".yellow);
wrench.rmdirSyncRecursive(markdown_destination);
wrench.rmdirSyncRecursive(wiki_destination);

fs.mkdirSync(markdown_destination)
console.log('Folder', markdown_destination, 'created');

fs.mkdirSync(wiki_destination)
fs.mkdirSync(wiki_destination+'/html')
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
        var wiki_filename = __dirname + '/' + wiki_destination + '/' + page.title + '.wiki';
        var md_filename = get_page_path(page);
        var text = results[0].old_text.toString();
        var markdown = mw2md.convert(mw2md_topspot.convert(text), page.title);
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
        
    http.get(options, function(res) {
        
        var htmlPageContent = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            htmlPageContent += chunk;
        });
        res.on('end', function(){
            var filename = __dirname + '/' + wiki_destination + '/html/' + pageTitle + '.html';
            
            
            console.log('Page title:'.yellow, pageTitle, 'Status code:'.green, res.statusCode);
            
            save_to_file(filename, htmlPageContent, function() {
                if (last) {
                    connection.end(function(err) {
                        console.log("MySql connection closed".yellow);
                    });
                }
            });
        });
            
            
    }).on('error', function(err) {
        console.log(err.message);
    });
};

var get_page_path = function(pageDef) {
    var lpath = __dirname + '/' + markdown_destination + '/' + pageDef.config.dir;
    if (!fs.existsSync(lpath)) {
        wrench.mkdirSyncRecursive(lpath);
    }
    var filename = pageDef.config.name ? pageDef.config.name : pageDef.title.toLowerCase();
    return lpath + '/' + filename + '.md';
};

var save_to_file = function(path, content, callback) {
    var writeStream = fs.createWriteStream(path);
    writeStream.write(content);
    writeStream.end();
    console.log('Saved to disk:'.green, path);
    if (callback) {
        callback();
    }
}