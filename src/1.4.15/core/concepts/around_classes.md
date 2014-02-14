Title: Around Classes


Most of the basic object-oriented concepts are detailed in [Javascript Classes](javascript_classes) article. Let's focus on more advanced functionalities that will allow you to using patterns such as inheritance, interfaces or even observable objects.


## Inheritance, $extends

Inheritance is a useful feature that Aria Templates makes easy to manage. You can reuse and extend an existing class quite simply.
Just declare your child class as inherited from a parent one by using the `$extends` keyword. Like in Java programming language, multiple inheritance is not available. A single class can only inherit from one parent class.

When your class inherit an another one, it then inherit from all properties, statics, constructor and destructor.

* Base class
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/Device.js?lang=javascript&outdent=true'></script>

* Subclass
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/Disk.js?lang=javascript&outdent=true'></script>

* Sample usage
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/DevicesMain.js?tag=execute&lang=javascript&outdent=true'></script>


In Aria Templates, any object inherit from <code>[aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject)</code>. Thus, your class automatically has access to several helpers coming from this parent root object, like for example logging methods: <code>[$logDebug()](http://ariatemplates.com/api/#aria.core.JsObject:$logDebug:method)</code>, <code>[$logWarn()](http://ariatemplates.com/api/#aria.core.JsObject:$logWarn:method)</code>, <code>[$logError()](http://ariatemplates.com/api/#aria.core.JsObject:$logError:method)</code>, and many more.


## Interfaces, $implements

An interface is a description of a set of methods, properties and events, but not containing implementation code at all.
Classes (or implementations) can decide to implement one or more interfaces, and therefore specifically provide the code for these methods, properties and events.

Interfaces are generally used in programming languages as a way to define a clear contract between a functionality provider and its client(s), and hide the implementation details, in order to easily be able to change them.

Programming with interfaces can make code more elegant, more decoupled, more extensible and more easily unit testable.

The core JavaScript language does not provide any direct support to program with interfaces, that's why Aria Templates provides a syntax that makes it easy to write interfaces and implement them in classes.

Interfaces in Aria Templates support the following features:

* [interface definition](#interface-definition)
* [check for implementation](#interface-implementation)
* single inheritance
* [events](#events)
* [interface wrapper](#interface-wrapper)


### Interface definition

An interface can be defined through [Aria.interfaceDefinition](http://ariatemplates.com/api/#Aria:interfaceDefinition:method), as shown in the following sample:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/IColorfulObject.js?lang=javascript&outdent=true'></script>

An interface definition contains the following parts:

* `$classpath` (mandatory) - the classpath is a unique identifier of the interface, just like in Java, and in [Aria Templates classes](javascript_classes). It corresponds to the package name + the interface name.
* `$extends` (optional) - the classpath of another interface declared with [Aria.interfaceDefinition](http://ariatemplates.com/api/#Aria:interfaceDefinition:method), which will be the super interface of this one.
	* If an interface extends another interface, all interface members declared in the super interface, including methods, properties and events, are automatically inherited as if they were declared in this interface.
	* Unlike in Java, multiple interface inheritance is not possible in Aria Templates. However, a class can implement several interfaces if needed.
* `$interface` (mandatory) - This section contains empty methods and empty properties that must be implemented in classes that implement the interface.
	* The names used for interface members must not be JavaScript keywords and must match the `/^[a-zA-Z_\$][\w\$]*$/` regular expression.
	* Interface members can be:
		* A function: can be declared with either an empty function, or the string `"Function"`, or  a json structure with the `$type` property containing "Function". With this last syntax, it is possible to specify that the function is asynchronous by setting the `$callbackParam` property. This property must contain the index of the argument of the function which contains the callback. Declaring asynchronous functions in an interface is especially useful when using [interceptors](interceptors).
		* An object or array: declared as shown in the above example. Note that the reference to the object or the array must stay the same in the object from its construction until it is disposed. This is because interface wrappers never update the references to the properties.
		* An interface  must be declared with a json structure with the `$type` property containing "Interface", and the `$classpath` property containing the classpath of the interface. When creating the interface wrapper containing such a member, the corresponding member from the whole object must implement the interface specified here and only its interface wrapper will be published in the interface wrapper.
* `$events` (optional) - set of event definitions, using the same syntax as in [Aria Templates classes](javascript_classes#events).


### Interface implementation

Once an interface has been defined through [Aria.interfaceDefinition](http://ariatemplates.com/api/#Aria:interfaceDefinition:method), it can be used in class definitions as shown in the following example:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/Fruit.js?lang=javascript&outdent=true'></script>


* When declaring that a class is implementing an interface through the `$implements` keyword, the class must contain in its prototype (or in the prototype of one of its super-classes) all the methods declared in the interface, otherwise, an error is logged and the class load fails.
* There is no check for the presence in the class of the properties (objects or arrays) defined in the interface, as it cannot be checked at class load time (properties are usually available only when creating an instance of a class).
* Events declared in the interface are automatically imported in the class definition. They must not be declared again in the class definition.

### Interface wrapper

If an object is an instance of a class which implements an interface, it is possible to retrieve a wrapper on that object that only contains the members (methods, properties and events) declared in the interface and prevents access to the remaining members of the object. This is useful to be sure that only members of the interface are actually used, so that the code using the interface is really decoupled from the interface implementation.

To get an instance of an interface wrapper, simply call the `$interface` method on the object, with the classpath of the interface to get. For example, with the `ariadoc.snippets.core.classes.Fruit` class declared above:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/Wrapping.js?tag=execute&lang=javascript&outdent=true'></script>

### Events

Interfaces can declare events in the `$events` part of the interface definition. Events declared in the interface are automatically imported in the class definition. They must not be declared again in the class definition.

If an interface declares events, its wrapper object will automatically contain the following additional methods:


* `$on` (same as `$addListeners`)
* `$removeListeners`
* `$unregisterListeners`

These methods are wrappers on the methods from [aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject), with the following specific aspects:


* when registering a listener on a wrapper object, when the event is raised, the `src` property of the event object will contain the wrapper object and not the whole object
* calling `$removeListeners` or `$unregisterListeners` from a wrapper object cannot unregister events registered with another wrapper object or with the complete object, it can only unregister events registered with the same wrapper object
* calling `$removeListeners` or `$unregisterListeners` from the complete object can unregister events registered with any wrapper object

## Dependencies, $dependencies

Dependencies management is definitely a missing feature from native Javascript. Thus, Aria Templates provides you a way to easily define all the dependencies associated to a specific class.

The first thing you have to understand as far as dependencies are concerned is their type. Aria Templates can handles 2 different kinds of dependencies:


<dl>
<dt>Static dependencies</dt>
<dd>You can express them using the `$dependencies` keyword in your classDefinition. This keyword takes as argument an array that contains all the different classpaths that you know your class is strongly dependent on.</dd>
<dd>This is more or less like the import declaration in Java.</dd>
<dd><script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/StaticDeps.js?lang=javascript'></script></dd>
</dl>

<dl>
<dt>Dynamic dependencies</dt>
<dd>This kind of dependency is to be used when you know that your class will only needs it under certain circumstance. Thus, you can use the helper method [Aria.load](http://ariatemplates.com/api/#Aria:load:method) on the [Aria singleton](the_aria_singleton) object.</dd>
<dd>This helper takes also as argument a JSON configuration object, in which you can specify an array of classpaths to be loaded. Once all the classes are loaded, a callback is used to trigger code execution.</dd>
<dd><script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/DynamicDeps.js?lang=javascript&outdent=true'></script></dd>
</dl>


## Events, $events

Natively, all Aria Templates objects are Observable. Because of the implicit inheritance from the original root object (<code>[aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject)</code>) on all of your classes, Aria Templates  gives you the ability to declare and listen to events. Any class could listen to events that could be raised by any other class.

The _emitter_ class declares the events it is able to fire using the `$events` keyword property on the classDefinition. This property is basically a list of event names along with their description and potential custom properties.

Then, to raise an event, you simply have to use `$raiseEvent(eventName)` method. (Which again is there implicitly because of [aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject) inheritance)

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/MainClass.js?lang=javascript&outdent=true'></script>

On the other hand, a _listener_ class should just simply declares that it is listening using the `$on()` method.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/classes/CustomLogger.js?lang=javascript&outdent=true'></script>

