Title: Working in an Asynchronous World



Aria Templates as a client side and javascript framework is obviously and massively asynchronous.

## Synchronous pre-requisite

Development using synchronous paradigm, like for example in Java, implicitly involves understanding the <code>return</code> pattern.<br />
When calling a synchronous method, the first thing you could expect from this method is that it could return an object.

<syntaxhighlight lang="Javascript">
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
</syntaxhighlight>

You can call the <code>initProperty()</code> method. You know and you expect from this method to return a <code>String</code>

*Quite easy* !<br />
Now, let's have a look at the pending mechanism when being in the asynchronous world.

## What about when you play around with asynchronous?

What you cannot do when dealing with asynchronous code execution is this
<srcinclude tag="notWorking" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>

If you have a quick look at the below example

<srcinclude tag="playingAsynchronous" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>

and you also look at what it's producing as a result

<syntaxhighlight lang="text">
 [ariadoc.snippets.core.asynchronous.Async] Hi there!
 [ariadoc.snippets.core.asynchronous.Async] Yes, I'm here! there's me.
 [ariadoc.snippets.core.asynchronous.Async] Is there anybody in here?
</syntaxhighlight>

you easily understand that something will not work out the box, or at least not like it was so easy in synchronous pattern.

### Callback versus Return

To be able to have the exact same behavior, you need to have a mechanism that will allow you to talk with the framework like this:
<blockquote>
Can you please _do that_, and _call me back_ when you're _done_ ?
</blockquote>
What is important in this quote ? *call me back* is important ! This was the missing piece!

You just want your code to externalize some logic somewhere (the asynchronous execution) and then you want to be immediately notified when this execution is basically over. And to do so, you just need to give a callback object to the framework.

### Aria Templates Callback Object

For you to be able to do this, Aria Templates provides you a simple way to execute callbacks

First you need to be familiar with the syntax of a callback object:

<srcinclude tag="sampleCallbackObject" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>

An Aria Templates callback object is always composed of a combination of 3 different properties:
* *fn*: the function reference. It can be either a <code>string</code>, a direct reference (like <code>this.myMethod</code>), or an anonymous method using an in line declaration.
* *scope*: (_optional_) the scope parameter. The object to which this parameter refers is going to be used by the framework as the scope (ie the <code>this</code>) inside the function specified with <code>fn</code>
* *args*: (_optional_) an object containing all the named arguments you would like to give to the function defined with <code>fn</code>


Finally, because all the different types of objects that you can create with Aria Templates all inherit from [aria.core.JsObject](http://ariatemplates.com/api/#aria.core.JsObject), you transparently have access to a method called <code>$callback()</code> on every object instance that allows you to execute an Aria Templates callback object.

Though, whenever you would have a <code>return</code> statement at the end of a function in the synchronous world, you will instead have <code>this.$callback( /* Reference to a callback object */)</code> in an asynchronous environment.

<srcinclude tag="sampleSyncReturn" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>
<srcinclude tag="sampleAsyncReturn" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>

## Propagating  the Callback Object

Javascript is a scripting technology. Which means that the code execution is linear. One line after another, one method after another. Though, you will quickly have to face a common pattern in which you will chain the execution of several asynchronous calls.

The easiest way to perform such an execution chain is to propagate all your callback objects on every and single step. This is also the only way we strongly encourage you to follow.

Let's have a quick look at a standard file retrieval using an asynchronous call to the server to see how to propagate all our callback objects:

<srcinclude tag="propagatingCallback" lang="Javascript" outdent="true">core\asynchronous\Async.js</srcinclude>

At this point of this article, this is what you need to remember, so write it down somewhere in your mind
<blockquote>
Each time you need to write a method inside one of your class that need, depends or involves any kind of asynchronous matter, think about adding an extra argument to your method: a *callback* one !<br />
And don't forget to execute it when the async job is over using <code>this.$callback()</code>
</blockquote>