Title: Widget Test Case

Better suited for testing widgets as it provides a controlled environment where to safely create widgets without the need of real template.

It makes use of the class [aria.jsunit.helpers.OutObj](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.jsunit.helpers.OutObj)
 to mock a TemplateCtxt and provide a test area in the DOM.
 `OutObj` is available as the property `this.outObj` of the test class.

## Automatic Creation

Any `WidgetTestCase` has the method:

* `createAndInit` : Create an instance of the widget under testing, put the output of writeMarkup in the DOM and
call the widget's initWidget method.

By calling `createAndInit` we can emulate exactly the same behavior of a widget inside a template,
but without the need of creating and loading one.

The test area in DOM where widgets are inserted is cleaned automatically when the test ends. However if the test case has multiple test methods,
it's up to the developer to clean the test area at the end of every method by calling `this.clearAll();`.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/WidgetTestCase.js?tag=clearAll&lang=javascript&outdent=true&noheader=true'></script>

This method is useful for self-closing widgets like the following

	{@aria:TextField {}/}

Container widgets don't use the writeMarkup method but a combination of writeMarkupBegin,
HTML content and writeMarkupEnd. You can test such kind of widgets using the following method:

* `createContainerAndInit` : Create an instance of the widget under testing, put the output of writeMarkupBegin,
some additional markup and the output of writeMarkupEnd in the DOM and call the widget's initWidget method.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/WidgetTestCase.js?tag=createContainerAndInit&lang=javascript&outdent=true&noheader=true'></script>

## Manual Creation

Creating manually a widget means executing what is done by the createAndInit method.
Manual creation should be used when you need to modify some actions.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/WidgetTestCase.js?tag=manual&lang=javascript&outdent=true&noheader=true'></script>

The sequence for container widgets is the following:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/WidgetTestCase.js?tag=containerWidgets&lang=javascript&outdent=true&noheader=true'></script>

