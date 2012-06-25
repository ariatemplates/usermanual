Title: Interceptors



AT Interceptors can be generally intented as extension points to [Aria Templates classes](Javascript Classes). Their main purpouse is to provide pre and post processing on class methods implemented from a specific interface, both synchronous and asynchronous ones. They are basically implemented as JavaScript functions.

Originally introduced for [flow controllers](Flow Controllers), interceptors can be used against any AT Javascript [interface](Around Classes). Make sure you read the necessary documentation about [ Aria Templates JavaScript classes](JavaScript Classes) and [interfaces](Around Classes) before reading further.

Indeed, if a class `C` implements an interface `I`, it then becomes possible for any other class to define an interceptor on an instance of `C`.

When doing so, each time a method is executed on `C` (assuming it is defined in `I`), then all defined interceptors will be notified and will be given the chance to execute extra logic before or after the method on `C` gets executed.

Additionally, if the method on `C` is asynchronous, the interceptors can also execute some logic after its callback has been called.
Interceptors can also prevent the call of the original method if needed or change the parameters or return value.

# General considerations

* An interceptor is similar to an event listener: it is an Aria Templates callback that can be added or removed from an object for a given interface. An interceptor can be added to an object `obj` for an interface by a call to `obj.$addInterceptor(interfaceName, interceptorCallback)`. It can be removed by a call to `obj.$removeInterceptors(interfaceName, scope, fn)`.

* Interceptor callbacks registered on an object `obj` for an interface `MyInterface` are called when a method is called through the `MyInterface` interface wrapper, or the interface wrapper of one of its super interfaces.

* Interceptor callbacks are called multiple times:
	* `CallBegin` - before the corresponding method is called on the whole object,
	* `CallEnd` - after the corresponding method returns,
	* `Callback` - if the method is asynchronous, when the callback is called, before the call of the normal callback. Note that "Callback" can sometimes be called before "CallEnd" if the method calls its callback synchronously.

* For `CallBegin`, interceptor callbacks are called in the order in which they registered with `$addInterceptor`, and for both `CallEnd` and `Callback` they are called in the reverse order.

# Interceptor parameter

The type of the first parameter given to interceptor callbacks is described below, depending on the moment of the call. If a property is marked as "in", it means that the property is intended to be read by the interceptor callback. If a property is marked as "out", it means that the property can be changed by the interceptor callback.

* `CallBegin`

<srcinclude tag="CallBegin" lang="text">core/interceptors/ParameterTypes.txt</srcinclude>

* `CallEnd`

<srcinclude tag="CallEnd" lang="text">core/interceptors/ParameterTypes.txt</srcinclude>

* `Callback`

<srcinclude tag="Callback" lang="text">core/interceptors/ParameterTypes.txt</srcinclude>

# Interceptor calls sequence diagrams

## Synchronous Method Call

The following sequence diagram visualizes the calls chain in the simple case of a *Synchronous* method:

* add an interceptor for a specific interface
* intercepted method execution
* interceptor calls (Begin, End)

[Image:Interceptors - Sync Call.png](Image:Interceptors_-_Sync_Call.png)

## Asynchronous Method Call

The following sequence diagram visualizes the calls chain in the simple case of a *Asynchronous* method:

* add an interceptor for a specific interface
* interceptor calls (Begin, End, CallBack)
* interaction with the backend server system

[Image:Interceptors - ASync Call.png](Image:Interceptors_-_ASync_Call.png)

# Example

Basically the whole interceptors mechanism can be properly setup by the following steps:

* You have to define an interface; this is required as interceptors are bound to a specific interface
* You have to implement the above interface
* You have to register one or more interceptors on a specific interface

## Interface definition

Here is the example of a simple interface definition with two functions, `mySimpleFunction` and `myAsynchronousFunction`.

<srcinclude lang="javascript" outdent="true">core/interceptors/MyInterface.js</srcinclude>

## Interface implementation

Here is an implementation of the previous interface:

<srcinclude lang="javascript" outdent="true">core/interceptors/MyClass.js</srcinclude>

## Interceptor registration

Here is an example of how to register an interceptor on an instance of the previous object with the previous interface and how to unregister it:

<srcinclude lang="javascript" outdent="true">core/interceptors/Interceptor.js</srcinclude>

When the above piece of code is run, the following alerts will be displayed (in this order):

* For `myItf.mySimpleFunction()`:
	* Interceptor: mySimpleFunction [CallBegin]
	* mySimpleFunction is called
	* Interceptor: mySimpleFunction [CallEnd]

* For `myObj.mySimpleFunction()`:
	* mySimpleFunction is called

* For `myItf.myAsynchronousFunction(myCallback)`:
	* Interceptor: myAsynchronousFunction [CallBegin]
	* myAsynchronousFunction is called
	* Interceptor: myAsynchronousFunction [CallEnd]
	* An answer (to the request done in myAsynchronousFunction) has been received from the server: null
	* Interceptor: myAsynchronousFunction [Callback]
	* myCallback is called.

* For `myItf.mySimpleFunction(myCallback)` in `myCallback`:
	* mySimpleFunction is called