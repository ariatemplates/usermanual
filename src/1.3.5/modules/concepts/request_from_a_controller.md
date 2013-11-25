Title: Request from a controller


Asynchronous requests can be performed manually using [`aria.core.IO`](http://ariatemplates.com/api/#aria.core.IO). However, modules provide an extra layer above simple server calls in your modules.

## Concept

The calls to the server done by the modules most often answer to the need to execute an **action**, with some information to transmit back and forth, and can be decomposed in several steps:


* <span style="color:green">_From a functional need, perform a request to a server to act, send or retrieve information._</span>
* Serialization: transform this JavaScript information into a server message.
* Building the URL of the server to target with this information.
* Performing the call on the built URL with the serialized information.
* Retrieving the call result and interpret it as a JavaScript object.
* <span style="color:green">_Use this new information in the module controller._</span>

Module controllers provide a simple method in order to focus on functional code (green italic) and delegate the technical implementation of the call to external handlers: the `submitJsonRequest()` method. This method has three arguments:

* The action to perform.
* The JavaScript object that have to be sent.
* The callback to be called with the call result.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/modules/controller/ModuleWithRequest.js?tag=call&lang=javascript&outdent=true'></script>

This method will use several configuration described below to achieve the non-functional steps.
Note that most of these configurations are also available on [`aria.modules.RequestMgr`](http://ariatemplates.com/api/#aria.modules.RequestMgr) as application configuration for all modules.

## Request parameters management

### Session management

Module provides a dedicated API to manage a session tag in the request: `setSession()`.
This allows storing an ID that can be used by the URL creating service.
Using this API is recommended as this will also propagate the change to sub module controllers.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/modules/controller/ModuleWithRequest.js?tag=session&lang=javascript&outdent=true'></script>

### Adding other parameters to a request

Other parameters can be added to the request at [aria.modules.RequestMgr](http://ariatemplates.com/api/#aria.modules.RequestMgr) level, for all modules:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/modules/controller/ModuleWithRequest.js?tag=params&lang=javascript&outdent=true'></script>

Check the API for a complete description of what can be done with request parameters.

## URL Services

When an action or resources are required from the server, Aria Templates automatically builds the appropriate URL to connect to the server handler.  Building these URLs is the responsibility of the URL service, which you can of course tailor to your needs.  For details about this, please refer to [this article](url_handling#server-requests-url-handling).

## Request Handlers

Response processing is delegated to an external handler that can be changed to fit specific needs.
It will process the response (text, XML, JSON...) coming from the server to extract or build the data to provide to the module controller that issued the request.
This handler is stored on the `$requestHandler` property of the module controller, and must implement the [`aria.modules.requestHandler.IRequestHandler`](http://ariatemplates.com/api/#aria.modules.requestHandler.IRequestHandler) interface. Two methods have to be provided: the success handler and the failure handler.

* The success handler will be called if the call to the server was successful.
* Otherwise, the failure handler will be called with details regarding the error that occurred.

After processing, a callback provided as an argument of these two methods needs to be called - even if an error occurs during processing - with an object of type [`aria.modules.RequestBeans.ProcessedResponse`](http://ariatemplates.com/api/#aria.modules.RequestBeans) as a parameter.

Aria Templates provides several base handlers in the `aria.modules.requestHandler` package that can be used:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/modules/controller/ModuleWithRequest.js?tag=requestHandler&lang=javascript&outdent=true'></script>

## JSON data serialization

When sending requests to the server with the POST method, JSON data can be added in the request (see [`aria.templates.ModuleCtrl.submitJsonRequest`](http://ariatemplates.com/api/#aria.templates.ModuleCtrl:submitJsonRequest:method)).

This data must be stringified before sending it to the server. It is possible to decide how the serialization has to be done by setting the public property [`$requestJsonSerializer`](http://ariatemplates.com/api/#aria.templates.ModuleCtrl:$requestJsonSerializer:property) property of the module:

<div data-sample="hardcoded"><pre><code>
this.$requestJsonSerializer = {
  instance : mySerializerInstance, // instance of a valid JSON serializer
  options : myOptions // options object that will be given to the serialize method of your serializer
};
</code></pre></div>

The value specified is of type [`aria.modules.environment.EnvironmentCfgBeans.RequestJsonSerializerCfg`](http://ariatemplates.com/api/#aria.modules.environment.EnvironmentCfgBeans:RequestJsonSerializerCfg).

In particular it can contain

* an instance of serializer, namely an object containing a `serialize()` method.

  If it is not specified, an instance of [aria.utils.json.JsonSerializer](http://ariatemplates.com/api/#aria.utils.json.JsonSerializer) will be used.
  The standard JsonSerializer class is easily extensible because it has a protected method for the conversion of each type of data.
  It is often a good idea to extend it in order to create your own serializer.
  Look at the [apidocs](http://ariatemplates.com/api/#aria.utils.json.JsonSerializer) in order to gain more insight on the methods that you can override.

* some options that are passed as arguments to the `serialize` method of the specified instance.

  When no serializer instance is provided, the options available in the `serialize` method of the default JsonSerializer class are documented [here](http://ariatemplates.com/api/#aria.utils.json.JsonSerializerBeans:JsonSerializeOptions).