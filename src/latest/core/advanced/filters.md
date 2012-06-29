Title: Filters

__NOTOC__
As Aria Templates is using a central <code>[core class](http://ariatemplates.com/api/#aria.core.IO)</code>  to manage all IO asynchronous requests, we added the ability to write IO Filters.

Filters can be compared to [servlet filters](http://java.sun.com/products/servlet/Filters.html) in the J2EE world because they can be used to intercept requests and/or responses as they are sent out/received in.

They may be used to alter the content of the request, or even stop an actual XHR, XDR or JSON-P call and redirect to an alternate resource.

They are also globally set for a whole application, but you can restrict them to a particular package.

## Writing a Custom Filter

Creating a filter is done by extending a base class and overriding one or two methods, like so:

<srcinclude lang="Javascript" outdent="true">core\filters\IoFilter.js</srcinclude>

## Adding a Filter to the IO Filters Manager

Once a custom filter class has been written, it can be registered on the <code>[IOFiltersMgr](http://ariatemplates.com/api/#aria.core.IOFiltersMgr)</code> singleton to be used at run-time.

<srcinclude tag="attachFilter" lang="Javascript" outdent="true">core\filters\MyFilterHelper.js</srcinclude>


<srcinclude tag="detachFilter" lang="Javascript" outdent="true">core\filters\MyFilterHelper.js</srcinclude>

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


<srcinclude tag="delayFilterConstructor" lang="Javascript" outdent="true">core\filters\IoDelayFilter.js</srcinclude>


<srcinclude tag="delayFilter" lang="Javascript" outdent="true">core\filters\IoDelayFilter.js</srcinclude>

### Adding a delay from the addFilter method

It is possible to specify the delay parameters directly within the <code>addFilter()</code> call through the <code>initArgs</code> property:

Here is an example:

<srcinclude tag="delayFilter" lang="Javascript" outdent="true">core\filters\MyFilterHelper.js</srcinclude>

## More Advanced Usage

At this stage, if you feel confident with the Aria Template [Module Layer](Modules_Layer_-_The_Application_Generator), you can continue further with some readings concerning [filters usage with modules ](Modules_Filters).