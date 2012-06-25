module.exports = {
    convert: function(content, title, author) {
        var markdown = content;
        
        // Definition list
        
        markdown = markdown.replace(/;([^\n]+)\n((?:\:[^\n]+\n)+)/ig, function(matches, title, items) {
            var result = "<dl>\n<dt>"+title+"</dt>\n";
            items = items.split("\n");
            items.forEach(function(item) {
                if (item != "") {
                    result += "<dd>"+item.substr(1)+"</dd>\n";
                }
            });
            result += "</dl>\n";
            return result;
        });
   
        // Code sample
        markdown = markdown.replace(/\{\{\{([^\n]+?)\}\}\}/igm, '`$1`');
    
        //markdown = markdown..replace(/\{\{\{(.+?)\}\}\}/m){|m| m.each_line.map{|x| "\t#{x}".gsub(/[\{\}]{3}/,'')}.join}
    
        // Headers
        markdown = markdown.replace(/^\=\=\=\=\=\=\s(.+?)\s\=\=\=\=\=\=/igm, '##### $1');
        markdown = markdown.replace(/^\=\=\=\=\=\s(.+?)\s\=\=\=\=\=/igm, '#### $1');
        markdown = markdown.replace(/^\=\=\=\=\s(.+?)\s\=\=\=\=/igm, '### $1');
        markdown = markdown.replace(/^\=\=\=\s(.+?)\s\=\=\=/igm, '## $1');
        markdown = markdown.replace(/^\=\=\s(.+?)\s\=\=/igm, '# $1');
        markdown = markdown.replace(/^\=\s(.+?)\s\=/igm, '$1');
    
        
        // Categories
        markdown = markdown.replace(/\[\[Category\:.+?\]\]/ig, '');
    
        // Internal links
        markdown = markdown.replace(/\[\[([^\|\[\]]+)\]\]/ig, function(match, url) {
            var text = url.replace(/#/g, "");
            url = url.replace(/ /g, "_");
            return '['+text+']('+url+')'
        });
        markdown = markdown.replace(/\[\[([^\|\[\]]+)\|([^\]\]]*)\]\]/ig, '[$2]($1)');
        
        // External links
        markdown = markdown.replace(/\[(http[^\s\[\]]+)\s([^\[\]]+)\]/ig, '[$2]($1)');
            
    
        markdown = markdown.replace(/\!(([A-Z][a-z0-9]+){2,})/ig, '$1');
    
        // Bold, italic
        markdown = markdown.replace(/'''''(.+?)'''''/ig, '_*$1*_');
        markdown = markdown.replace(/'''(.+?)'''/ig, '*$1*');
        markdown = markdown.replace(/''(.+?)''/ig, '_$1_');
        
        // List
        markdown = markdown.replace(/^\*\*\*\*/igm, '\t\t\t*');
        markdown = markdown.replace(/^\*\*\*/igm, '\t\t*');
        markdown = markdown.replace(/^\*\*/igm, '\t*');
        markdown = markdown.replace(/^\*/igm, '*');
        markdown = markdown.replace(/^\s(\d)\./ig, '$1.');
    
        // We finally inject the Markdown header information about Title, Author ...

        header = "Title: " + this.title(title) + "\n";
        if (author) {
            header += "Author: " + author + "\n";
        }
        
        markdown = header + "\n" + markdown;
    
        return markdown;
    },
    
    title: function(title) {
        return title.replace(/_-/ig, " "); 
    }
}
