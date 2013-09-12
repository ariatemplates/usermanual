Title: Working in an Asynchronous World



Aria Templates as a client side and javascript framework is obviously and massively asynchronous.

## Synchronous pre-requisite

Development using synchronous paradigm, like for example in Java, implicitly involves understanding the `return` pattern.<br />
When calling a synchronous method, the first thing you could expect from this method is that it could return an object.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/MyClass.java?noheader=true&lang=java' defer></script>

You can call the `initProperty()` method. You know and you expect from this method to return a `String`

**Quite easy** !<br />
Now, let's have a look at the pending mechanism when being in the asynchronous world.

## What about when you play around with asynchronous?

What you cannot do when dealing with asynchronous code execution is this
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?noheader=true&tag=notWorking&lang=javascript&outdent=true' defer></script>

If you have a quick look at the below example

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?noheader=true&tag=playingAsynchronous&lang=javascript&outdent=true' defer></script>

and you also look at what it's producing as a result

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/console_output.txt?noheader=true' defer></script>


you easily understand that something will not work out the box, or at least not like it was so easy in synchronous pattern.

### Callback versus Return

To be able to have the exact same behavior, you need to have a mechanism that will allow you to talk with the framework like this:

> Can you please _do that_, and _call me back_ when you're _done_ ?

What is important in this quote ? **call me back** is important ! This was the missing piece!

You just want your code to externalize some logic somewhere (the asynchronous execution) and then you want to be immediately notified when this execution is basically over. And to do so, you just need to give a callback object to the framework.

### Aria Templates Callback Object

For you to be able to do this, Aria Templates provides you a simple way to execute callbacks

First you need to be familiar with the syntax of a callback object:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?tag=sampleCallbackObject&lang=javascript&outdent=true' defer></script>

An Aria Templates callback object is always composed of a combination of 3 different properties:

* **fn**: the function reference. It can be either a `string`, a direct reference (like `this.myMethod`), or an anonymous method using an in line declaration.

* **scope**: (_optional_) the scope parameter. The object to which this parameter refers is going to be used by the framework as the scope (ie the `this`) inside the function specified with `fn`

* **args**: (_optional_) an object containing all the named arguments you would like to give to the function defined with `fn`

* **resIndex**: (_optional_) an integer to set the index of the result or event, -1 will remove result| event from the first
position; 0 default behaviour, result|event will be the first argument; n will set the result|event in the nth position.

* **apply**: (_optional_) a boolean value, to use Function.call or Function .apply.


Finally, because all the different types of objects that you can create with Aria Templates all inherit from [aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject), you transparently have access to a method called `$callback()` on every object instance that allows you to execute an Aria Templates callback object.

Though, whenever you would have a `return` statement at the end of a function in the synchronous world, you will instead have `this.$callback( /* Reference to a callback object */)` in an asynchronous environment.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?tag=sampleSyncReturn&lang=javascript&outdent=true' defer></script>
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?tag=sampleAsyncReturn&lang=javascript&outdent=true' defer></script>

## Propagating  the Callback Object

Javascript is a scripting technology. Which means that the code execution is linear. One line after another, one method after another. Though, you will quickly have to face a common pattern in which you will chain the execution of several asynchronous calls.

The easiest way to perform such an execution chain is to propagate all your callback objects on every and single step. This is also the only way we strongly encourage you to follow.

Let's have a quick look at a standard file retrieval using an asynchronous call to the server to see how to propagate all our callback objects:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?tag=propagatingCallback&lang=javascript&outdent=true' defer></script>

At this point of this article, this is what you need to remember, so write it down somewhere in your mind
<blockquote>
Each time you need to write a method inside one of your class that need, depends or involves any kind of asynchronous matter, think about adding an extra argument to your method: a **callback** one !<br />
And don't forget to execute it when the async job is over using `this.$callback()`
</blockquote>

## Rest API calls

Aria Templates allows users to make `GET`, `POST`,`PUT`,`DELETE`,`HEAD`,`TRACE`,`OPTIONS`,`CONNECT`,`PATCH` requests to a Restful server. The default method will be `GET` if request method is not defined. The following snippet demonstrates how to make an asynchronous request in Aria Templates.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/asynchronous/Async.js?tag=sampleAsyncRequest&lang=javascript&outdent=true' defer></script>

The whole list of configuration parameters is available in [Async Request](http://ariatemplates.com/api/#aria.core.CfgBeans:IOAsyncRequestCfg).
