# Mediawiki to Markdown extractor

This utility script is extracting latest revisions of mediawiki articles and converting them to markdown files.

## Steps

* configure settings by copying `config.js.sample`to `config.js` and changing your mysql auth
* create a ssh tunnel to your distant server by typing

	`ssh -L 3306:localhost:3306 user@youserver.com`

* execute the extractor

	`node extractor.js`


