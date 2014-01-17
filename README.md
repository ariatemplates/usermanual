# Usermanual

This is both the source documentation and build system for the [Aria Templates Usermanual](http://ariatemplates.com/usermanual). It consists of:

* Sources files for the usermanual documentation (located in *src/*)
* A build system to generate this content (located at *build.js*)
* A mediawiki extractor to convert documentation from a wiki installation to markdown files (located in *mediawikiextractor/*)
* A local Express test server to be able to review your changes locally (located at *test.js*)

After you clone this repo, remember you have to install the dependencies. Call:

    $ npm install

# Running a Build
	
You should update documentation files inside the `src` folder, and run the build using this command:

    $ node build

# Launching the test server

    $ node test // and follow instructions

Anytime you build a new version of the documentation, you can test your changes using the test server. Just open a browser on `http://localhost:8000/` and navigate to your page.
    
# Hooks

Note that this repository uses a git commit hook. Any pushes or merges into the master branch rebuilds all versions of the documentation on the website.

# Rolling out a new version

Anytime a new version of the documentation is rolled out (ie for each new [ariatemplates] version) there are few operations
to perform on this repository

* Copy `/src/latest/` to `/src/<% new version here %>/`
* Do the same for `/resources/articles/navigationbar/latest.md`
* Edit `/resources/articles/versionList.jade` to add the new version (have a look at the bottom of the file)
  
  from 

  ```jade
  ...
  mixin version("1.3.6", true)
  mixin version("1.3.5")
  mixin version("1.3.4")
  ```
  to

  ```jade
  ...
  mixin version("<% new version here %>", true)
  mixin version("1.3.6")
  mixin version("1.3.5")
  mixin version("1.3.4")
  ```
* Push your changes, the hook will rebuild the whole documentation base
  

# Contributing

If you find any typos or have any ideas of something that should be documented, we'll very gladly take any pull requests for new documentation!

This source material is intended to be open and sharable to all.

Fork the repository, create a topic branch, do your fix and finally open a pull request.

[ariatemplates]: http://github.com/ariatemplates/ariatemplates

# License

Aria Templates usermanual documentation is licensed under a [Apache 2.0 license](http://ariatemplates.com/license)
