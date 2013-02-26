Title: Filters


As Aria Templates is using a central [`core class`](http://ariatemplates.com/api/#aria.core.IO)  to manage all IO asynchronous requests, we added the ability to write IO Filters.

Filters can be compared to [servlet filters](http://java.sun.com/products/servlet/Filters.html) in the J2EE world because they can be used to intercept requests and/or responses as they are sent out/received in.

They may be used to alter the content of the request, or even stop an actual XHR, XDR or JSON-P call and redirect to an alternate resource.

They are also globally set for a whole application, but you can restrict them to a particular package.

## Writing a Custom Filter

Creating a filter is done by extending a base class and overriding one or two methods, like so:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/IoFilter.js?lang=javascript&outdent=true'></script>

## Adding a Filter to the IO Filters Manager

Once a custom filter class has been written, it can be registered on the [`IOFiltersMgr`](http://ariatemplates.com/api/#aria.core.IOFiltersMgr) singleton to be used at run-time.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/MyFilterHelper.js?tag=attachFilter&lang=javascript&outdent=true'></script>


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/MyFilterHelper.js?tag=detachFilter&lang=javascript&outdent=true'></script>

Check the [API documentation](http://ariatemplates.com/api/#aria.core.IOFiltersMgr:addFilter:method) to know the different types of parameters accepted (e.g. it is possible to specify an initialization parameter, passed to the constructor of the filter).

## Adding a Filter Delay

It is possible to add a filter delay in two different locations, either on the request or on the response.
There are also 2 different ways to add delays.

### Adding a delay within the filter itself

When adding delays within the filter simply add two properties:

* this.requestDelay
* this.responseDelay

By default every filter inheriting from the filter base class IOFilter has delay capabilities, and both the requestDelay and responseDelay are set to null or undefined (no influence on the delay).  This would be all that is needed to add a delay to a filter, providing the filter doesn't overwrite the inherited onRequest and onResponse methods.

If the filter has overwritten the inherited onRequest and onResponse methods then the following code will need to be added:



<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/IoDelayFilter.js?tag=delayFilterConstructor&lang=javascript&outdent=true'></script>


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/IoDelayFilter.js?tag=delayFilter&lang=javascript&outdent=true'></script>

### Adding a delay from the addFilter method

It is possible to specify the delay parameters directly within the `addFilter()` call through the `initArgs` property:


Here is an example:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/filters/MyFilterHelper.js?tag=delayFilter&lang=javascript&outdent=true'></script>

## More Advanced Usage

At this stage, if you feel confident with the Aria Template [Module Layer](modules_layer_the_application_generator), you can continue further with some readings concerning [filters usage with modules ](modules_filters).