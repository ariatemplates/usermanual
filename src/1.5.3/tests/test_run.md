Title: Running the tests

Once your tests are organized with test suite, you will need to run them and get reports to know if everything is fine or if some failed.
Attester is a tool written in JavaScript, to be run with [Node.js](http://nodejs.org/) and can be installed via [npm](https://npmjs.org/).

It allows to run JavaScript tests written in any testing framework and execute them in any web browser,
[PhantomJS](http://phantomjs.org/) included.

If you need to go further with attester, you can read the full documentation on
[http://attester.ariatemplates.com/](http://attester.ariatemplates.com/).

## Installation

To start testing your code you'll have to install attester in your project

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/RunTest.sh?tag=installATester&lang=bash&outdent=true&noheader=true'></script>

This will also modify your package.json to include attester as a devDependency.

If you want to make use of PhantomJS headless testing, you'll additionally need to download PhantomJS and make sure it's in your PATH.

## Usage

attester has a command line utility that can be used in your build to execute your tests in a campaign.

### Setup your project

A simple configuration file is available below.

It is also possible to use a separate script for attester instead of test,
this gives you the flexibility to run more scripts from npm test.

Attester requires a configuration file (see the Configuration file below) that describes the list of tests and the available resources (source code to be tested).
This configuration file can be either a json or a yaml file.
Once you've created such configuration file you can modify your package.json to reference it under `script.test` sand create a script to run attester.

The preferred script is test.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/RunTest.sh?tag=scripts&lang=bash&outdent=true&noheader=true'></script>

### Configuration file

The configuration file describes the test campaign to execute. It can be either in the YAML (with a `.yml` or `.yaml` extension) or
in the JSON format (with a `.json` extension).

There's no naming convention for the configuration file, so you can put it anywhere you like, preferably next to your tests.

The configuration file is comprised of the following parts:
For more information on the campaign configuration file and the complete list of properties please refer to this article

* [The list of resources](http://attester.ariatemplates.com/usage/configuration.html#resources)
* [The list of tests](http://attester.ariatemplates.com/usage/configuration.html#tests)
* [Browsers information](http://attester.ariatemplates.com/usage/configuration.html#browsers)
* [Logging and reporting](http://attester.ariatemplates.com/usage/configuration.html#reports)

A very simple configuration file in `.yml` is

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/RunTest.sh?tag=sample&lang=bash&outdent=true&noheader=true'></script>

### Run attester

Once you setup your project you can run your campaign with

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/RunTest.sh?tag=run&lang=bash&outdent=true&noheader=true'></script>

### How attester works

Attester create a test server that awaits for incoming connections from different browsers. Every connected browser is a slave.

The test server dispatches pending tests to available slaves and gather the results in a common report.
This allows to run JavaScript tests in as many browser as wanted.

In order to work, attester should be configured to know which tests to run, on which browsers, against which source code.

## Further Reading

* [Campaign configuration](http://attester.ariatemplates.com/usage/configuration.html) with detailed information on
how to describe your test campaign.
* [CLI options](http://attester.ariatemplates.com/usage/command_line.html) with a description of all the options
that can be used to configure attester behavior.
* [Attester as a module](http://attester.ariatemplates.com/usage/module.html) explains how to use attester as a module
instead of a command line utility. This is the most advanced usage.
* [Developer documentation](http://attester.ariatemplates.com/api/index.html) for the internals.
It is useful to write custom plugins or to understand how attester works.


