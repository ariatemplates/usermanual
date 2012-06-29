Title: Modules Filters


Aria Templates comes out of the box with an embedded filters mechanism. More information are available in the [Core Filters](Filters) documentation.

Combined with the module layer, you can achieve really powerful things, such as emulating a server side.

## Using the <code>sender</code> property

The first thing you need to do inside a filter you would have designed to be used with a module, is to limit its execution to only this module. When you do an asynchronous request from within your module, you are using <code>submitJsonRequest()</code>, which is implicitely using the <code>RequestMgr</code> on top of IO.

Though, to test from which module your request is coming inside your filter, you can easily just check inside your <code>onRequest()</code> or <code>onResponse()</code> methods.

Aria Template dynamically publishes for you properties on the request (or response) argument.

For example, for requests sent by the <code>RequestMgr</code>, here are the properties available in the <code>sender</code> property:
* <code>classpath</code>: contains "aria.modules.RequestMgr" (allows to check if the request was made through the <code>RequestMgr</code>).
* <code>requestObject</code>: contains information about the module which did the request (its <code>moduleName</code> and <code>actionName</code>).
* <code>requestData</code>: contains the posted data as a json object. If the filter needs to change it, it can modify this property, but it should then call [setJsonPostData](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.IOFilter:setJsonPostData:method) to update the encoded string in <code>request.postData</code>.
* <code>responseData</code>: null by default, this property can be set by a filter, and in this case, the request manager will use this value as the <code>data</code> retrieved to the calling module (bypassing the connection handler)
* <code>responseErrorData</code>: null by default, this property can be set by a filter, and in this case, the request manager will use this value as the <code>errorData</code> retrieved to the calling module (bypassing the connection handler)

The following filter looks for requests done by the <code>my.app.Controller</code> module through the request manager:

<srcinclude lang="javascript" outdent="true">modules/filters/TargetedFilter.js</srcinclude>

## Working Offline

One of the most interesting feature provided by filters is related to working _offline_.

Many times, it can be helpful for UI developers to have the ability to start working without an available back-end. You could even think to work without an application server, simply by mocking the data responses sent by the server.

IO filters can be used to intercept requests, and redirect to static XML files rather than let the calls go to your application server. Thanks to the filters being true classes, these redirection can even be made dynamic, i.e. based on requests parameters, different data can be returned.

Consider the following example:

* The filter class
<srcinclude lang="javascript" outdent="true">modules/filters/OfflineFilter.js</srcinclude>

* The moduleCtrl class
<srcinclude lang="javascript" outdent="true">modules/filters/MyController.js</srcinclude>

In the previous example, requests are intercepted and, based on their action and json parameters, redirected to static XML files instead. The helper <code>[redirectToFile()](http://ariatemplates.com/api/#aria.core.IOFilter:redirectToFile:method)</code> method is used to simplify the redirection.

### Creating the XML responses

The default handler of Aria Templates expects data responses from the server in form of XML messages. Creating these static XML files to work offline can be done in 2 ways:
* Writing them by hand.
* Recording actual "online" responses by copy/pasting the content into a XML file.

To record XML files, an IO filter can be used too. Aria Templates comes with an existing IO filter that can be used at run-time.

The IO filter's class to be used is <code>aria.utils.filters.DisplayXmlResponse</code>. Check its  [JavaScript documentation](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.filters.DisplayXmlResponse) for help on how to use it.