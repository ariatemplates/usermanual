# Information

This is both the source documentation and build system for the [Aria Templates Usermanual](http://ariatemplates.com/usermanual). It consists of:

* Sources files for the usermanual documentation (located in *src/*)
* A build system to generate this content (located at *build.js*)
* A mediawiki extractor to convert documentation from a wiki installation to markdown files (located in *mediawikiextractor/*)

After you clone this repo, remember you have to install the dependencies. Call:

    npm install

# Running a Build

*To Be Documented*

# Hooks

Note that this repository uses a git commit hook. Any pushes or merges into the master branch rebuilds all versions of the documentation on the website.

# Contributing

If you find any typos or have any ideas of somthing that should be documentation, we'll very gladly take any pull requests for new documentation! This source material is intended to be open and sharable to all.

# License

Aria Templates usermanual documentation is licensed under a [Apache 2.0 license](http://ariatemplates.com/license)