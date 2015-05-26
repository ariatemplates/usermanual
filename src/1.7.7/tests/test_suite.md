Title: Test suite

A TestSuite is an Aria Templates class that lets you define a set of TestCases and TestSuites that should be executed altogether.

They are essentially a way for you to regroup your test cases as it suits you.
The only mandatory guideline to follow here is to make sure there is no collision between a TestSuite and
a Class defined in src/main/static. This should however never happen with the mandatory naming convention for test suites.

You can define test suites at several levels in your test hierarchy in order to easily aggregate the different tests.

The only method you should use in your test suite is the addTests method.
Each argument should be a valid classpath for either a TestCase or TestSuite. This element will be added to the test suite.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestSuite.js?tag=example&lang=bash&outdent=true&noheader=true'></script>

An easy way to organize Test Suites in an Aria Templates based application is to create one Test Suite by package
(as soon as there is at least one Test Case in the package).
