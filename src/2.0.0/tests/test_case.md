Title: Test Case

The base class for any Aria Templates test is `aria.jsunit.TestCase`.
On top of basic assertions it allows to assert logs and events, it provides mocking and sandboxing.
This is ideal for pure JavaScript classes that don't need DOM interaction.

Here is an example of unit test class.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=example&lang=javascript&outdent=true&noheader=true'></script>

A Test Case (cf. [API doc](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.jsunit.TestCase)) will usually feature several single test methods.
All tests are supposed to be completely independent from each other, and the order in which they are executed should not be taken into consideration.

When running a TestCase, all the methods defined in the prototype and with a name starting with test will be considered as test methods.
It is mandatory to follow this naming convention.

The scope of a test method is the test case and no return value is expected.
The status of the test is determined by the result of the various asserts made during this test.
A test method containing no failing assert is considered as successful if no JavaScript error was thrown during its execution.

## Assert

`aria.jsunit.TestCase` extends the class `aria.jsunit.Assert`, which provides the following assertions:

* `assertTrue` / `assertFalse` : Test if a value is true or false

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertTrue&lang=javascript&outdent=true&noheader=true'></script>

* `assertEquals` / `assertNotEquals` : Test that two values are strictly equal

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertEquals&lang=javascript&outdent=true&noheader=true'></script>


* `assertJsonEquals` / `assertJsonNotEquals` : Test for deep equality of objects / array

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertJsonEquals&lang=javascript&outdent=true&noheader=true'></script>

* `assertJsonContains` : Assert that an object is included in a bigger container.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertJsonContains&lang=javascript&outdent=true&noheader=true'></script>

* `assertLogsEmpty` : Test that no class logged an error message.
* `assertErrorInLogs` : Test that a precise error has been logged.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertErrorInLogs&lang=javascript&outdent=true&noheader=true'></script>

Error messages for which a corresponding assertion is not performed will make the test fail

* `fail` Explicitly let the test fail with a given message.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=failExplicitly&lang=javascript&outdent=true&noheader=true'></script>

## Error Message

`assert*` methods accept as message parameter used to better understand why the assert failed.
It is usually the first parameter after the value(s) being asserted,
for more information refer to the [API documentation](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.jsunit.Assert).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertMethods&lang=javascript&outdent=true&noheader=true'></script>

## Asynchronous testing

Asynchronous tests are a special kind of test methods, and their name should start with `testAsync`

The easiest way to do an asynchronous test is to directly call the asynchronous method, passing a callback defined in the Test Case.
This callback will then be responsible of notifying the tester when the test is finished.

The callback can be defined in the prototype of the Test Case, but in this case, make sure its name doesn't start with test,
otherwise it will be picked up and executed on its own as a `test` method.

To notify the test runner, `aria.jsunit.TestCase` provides the `notifyTestEnd` method.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=notifyTestEnd&lang=javascript&outdent=true&noheader=true'></script>

## Fixtures : `setUp` / `tearDown`

If several tests in a single test case are using the same kind of objects in their tests,
it can be interesting to define the `setUp` and `tearDown` methods in the `$prototype` of the `TestCase`.
These two methods are called before and after each test method.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=tearDown&lang=javascript&outdent=true&noheader=true'></script>

## Listening events

In some cases we want to assert that an event has been raised or not by a given class. This is a basic form of spy.
`aria.jsunit.TestCase` provides the following methods

* `registerObject` / `unregisterObject` Listen to all events fired by a given object.
* `assertEventFired` / `assertEventNotFired` Assert that en event with a given name has been raised.
* `getEvent` Get the event object of a given event name, useful to assert that parameters are passed correctly.

The following is an example test case using `assertEventFired`

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TestCase.js?tag=assertEventFired&lang=javascript&outdent=true&noheader=true'></script>

