Title: Modules Filters


Aria Templates comes out of the box with an embedded filters mechanism. More information are available in the [Core Filters](filters) documentation.

Combined with the module layer, you can achieve really powerful things, such as emulating a server side.

## Using the `sender` property

The first thing you need to do inside a filter you would have designed to be used with a module, is to limit its execution to only this module. When you do an asynchronous request from within your module, you are using `submitJsonRequest()`, which is implicitely using the `RequestMgr` on top of IO.

Though, to test from which module your request is coming inside your filter, you can easily just check inside your `onRequest()` or `onResponse()` methods.

Aria Template dynamically publishes for you properties on the request (or response) argument.

For example, for requests sent by the `RequestMgr`, here are the properties available in the `sender` property:

* `classpath`: contains "aria.modules.RequestMgr" (allows to check if the request was made through the `RequestMgr`).
* `requestObject`: contains information about the module which did the request (its `moduleName` and `actionName`).
* `requestData`: contains the posted data as a json object. If the filter needs to change it, it can modify this property, but it should then call [setJsonPostData](http://ariatemplates.com/api/#aria.core.IOFilter:setJsonPostData:method) to update the encoded string in `request.postData`.
* `responseData`: null by default, this property can be set by a filter, and in this case, the request manager will use this value as the `data` retrieved to the calling module (bypassing the connection handler)
* `responseErrorData`: null by default, this property can be set by a filter, and in this case, the request manager will use this value as the `errorData` retrieved to the calling module (bypassing the connection handler)

The following filter looks for requests done by the `my.app.Controller` module through the request manager:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/filters/TargetedFilter.js?lang=javascript&outdent=true'></script>

## Working Offline

One of the most interesting feature provided by filters is related to working _offline_.

Many times, it can be helpful for UI developers to have the ability to start working without an available back-end. You could even think to work without an application server, simply by mocking the data responses sent by the server.

IO filters can be used to intercept requests, and redirect to static XML files rather than let the calls go to your application server. Thanks to the filters being true classes, these redirection can even be made dynamic, i.e. based on requests parameters, different data can be returned.

Consider the following example:


* The filter class
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/filters/OfflineFilter.js?lang=javascript&outdent=true'></script>

* The moduleCtrl class
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/filters/MyController.js?lang=javascript&outdent=true'></script>

In the previous example, requests are intercepted and, based on their action and json parameters, redirected to static XML files instead. The helper [`redirectToFile()`](http://ariatemplates.com/api/#aria.core.IOFilter:redirectToFile:method) method is used to simplify the redirection.

### Creating the XML responses

The default handler of Aria Templates expects data responses from the server in form of XML messages. Creating these static XML files to work offline can be done in 2 ways:

* Writing them by hand.
* Recording actual "online" responses by copy/pasting the content into a XML file.

To record XML files, an IO filter can be used too. Aria Templates comes with an existing IO filter that can be used at run-time.

The IO filter's class to be used is `aria.utils.filters.DisplayXmlResponse`. Check its  [JavaScript documentation](http://ariatemplates.com/api/#aria.utils.filters.DisplayXmlResponse) for help on how to use it.