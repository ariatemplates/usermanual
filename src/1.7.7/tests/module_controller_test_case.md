Title: Module Controller Test Case

[ModuleCtrlTestCase](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.jsunit.ModuleCtrlTestCase) provides helper methods to instantiate and test module controllers.
The class is designed to monitor all events and server connections made by a module.

## Assert

On top of the assert methods that it inherits from [Test Case](test_case), it provides the following:

* `assertLogsClean` / `assertLogsNotClean` : Asserts that there is no error in the logs, it is similar to assertLogsEmpty
but it also checks for connection errors.

The class has also the attribute cxLogs, an array of [ConnectionSession](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.jsunit.ConnectionSession).
These objects contain information on every request that is done through the module controller.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/ModuleControllerTestCase.js?tag=assert&lang=javascript&outdent=true&noheader=true'></script>

## Automatic Creation

`ModuleCtrlTestCase` is able to automatically create and dispose the instance of Module Controller under test.

By specifying `$controller` in the test's `$prototype` an instance of that class is generated before running the test.
Inside the test methods you can access the two variables `$moduleCtrl` and `$moduleCtrlPrivate`.
The `$moduleCtrl` gives a wrapper which offers only the methods and fields exposed via the interface,
while `$moduleCtrlPrivate` gives direct access to the module controller.

The public interface is also registered for asserting its logs, so there's no need to call `registerObject`.
The test makes sure that objects are created and disposed correctly off-loading some work from the developer.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/ModuleControllerTestCase.js?tag=objects&lang=javascript&outdent=true&noheader=true'></script>

`$controller` can be either a string or an object. If it's a string it's considered as a classpath,
if it's an object it must match the bean [InitModuleController](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans:InitModuleCtrl). This allow to pass initArgs to the module's `init` method.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/ModuleControllerTestCase.js?tag=initModuleController&lang=javascript&outdent=true&noheader=true'></script>

## Manual creation

It is also possible to manually create an instance with the following code:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/ModuleControllerTestCase.js?tag=manual&lang=javascript&outdent=true&noheader=true'></script>


