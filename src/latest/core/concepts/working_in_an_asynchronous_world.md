Title: Working in an Asynchronous World



Aria Templates as a client side and javascript framework is obviously and massively asynchronous.

## Synchronous pre-requisite

Development using synchronous paradigm, like for example in Java, implicitly involves understanding the `return` pattern.<br />
When calling a synchronous method, the first thing you could expect from this method is that it could return an object.

<div data-sample="hardcoded"><code><pre>
public class MyClass {

    private string myProperty;

    public MyClass() {
        this.myProperty = this.initMyProperty();
    }

    private String initMyProperty() {
        // Do some initialization stuff
        return "myValue";
    }
}
</code></pre></div>

You can call the `initProperty()` method. You know and you expect from this method to return a `String`

**Quite easy** !<br />
Now, let's have a look at the pending mechanism when being in the asynchronous world.

## What about when you play around with asynchronous?

What you cannot do when dealing with asynchronous code execution is this
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=notWorking&lang=javascript&outdent=true'></script>

If you have a quick look at the below example

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=playingAsynchronous&lang=javascript&outdent=true'></script>

and you also look at what it's producing as a result

<div data-sample="hardcoded"><code><pre>
 [ariadoc.snippets.core.asynchronous.Async] Hi there!
 [ariadoc.snippets.core.asynchronous.Async] Yes, I'm here! there's me.
 [ariadoc.snippets.core.asynchronous.Async] Is there anybody in here?
</code></pre></div>

you easily understand that something will not work out the box, or at least not like it was so easy in synchronous pattern.


### Callback versus Return

To be able to have the exact same behavior, you need to have a mechanism that will allow you to talk with the framework like this:

> Can you please _do that_, and _call me back_ when you're _done_ ?

What is important in this quote ? **call me back** is important ! This was the missing piece!

You just want your code to externalize some logic somewhere (the asynchronous execution) and then you want to be immediately notified when this execution is basically over. And to do so, you just need to give a callback object to the framework.

### Aria Templates Callback Object

For you to be able to do this, Aria Templates provides you a simple way to execute callbacks

First you need to be familiar with the syntax of a callback object:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=sampleCallbackObject&lang=javascript&outdent=true'></script>

An Aria Templates callback object is always composed of a combination of 3 different properties:

* **fn**: the function reference. It can be either a `string`, a direct reference (like `this.myMethod`), or an anonymous method using an in line declaration.
* **scope**: (_optional_) the scope parameter. The object to which this parameter refers is going to be used by the framework as the scope (ie the `this`) inside the function specified with `fn`
* **args**: (_optional_) an object containing all the named arguments you would like to give to the function defined with `fn`


Finally, because all the different types of objects that you can create with Aria Templates all inherit from [aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject), you transparently have access to a method called `$callback()` on every object instance that allows you to execute an Aria Templates callback object.

Though, whenever you would have a `return` statement at the end of a function in the synchronous world, you will instead have `this.$callback( /* Reference to a callback object */)` in an asynchronous environment.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=sampleSyncReturn&lang=javascript&outdent=true'></script>
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=sampleAsyncReturn&lang=javascript&outdent=true'></script>

## Propagating  the Callback Object

Javascript is a scripting technology. Which means that the code execution is linear. One line after another, one method after another. Though, you will quickly have to face a common pattern in which you will chain the execution of several asynchronous calls.

The easiest way to perform such an execution chain is to propagate all your callback objects on every and single step. This is also the only way we strongly encourage you to follow.

Let's have a quick look at a standard file retrieval using an asynchronous call to the server to see how to propagate all our callback objects:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/asynchronous/Async.js?tag=propagatingCallback&lang=javascript&outdent=true'></script>

At this point of this article, this is what you need to remember, so write it down somewhere in your mind
<blockquote>
Each time you need to write a method inside one of your class that need, depends or involves any kind of asynchronous matter, think about adding an extra argument to your method: a **callback** one !<br />
And don't forget to execute it when the async job is over using `this.$callback()`
</blockquote>