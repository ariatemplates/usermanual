Title: Javascript Classes



Javascript is a language that supports _prototype_-based classes. You will need to be familiar with this concept before reading this article.
Aria Templates introduces useful notions that are not natively found in Javascript, such as classes, dependencies, inheritance, namespaces, etc...
All these concepts make it easier to organize the different pieces of your code.

## The class definition

In Aria Templates, all the different objects you can create are in the end classes. A class is created by calling the `classDefinition()` method on [the Aria singleton object](the_aria_singleton#classdefinition), giving as an argument a JSON configuration object, like so:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/core/classes/Fruit.js' defer></script>

Objects are then created and deleted as follows:

<srcinclude tag="execute" outdent="true">core/classes/FruitUsage.js
</srcinclude>

The first thing to notice is that all keys to the configuration object start with the `$` prefix. The reason for this is that many of the keywords used like (extends, prototype, ...) are reserved keywords in Javascript and would result in a run-time exception if used without prefix.

## Class definition attributes

### $classpath

The `$classpath` is the unique identifier of a class.

It is composed of 2 parts:

* The package name (optional), composed of one or several string parts separated by `.`.
* The class name (mandatory), a camel-cased string.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/core/classes/Fruit.js' defer></script>

As in Java, the classpath normally corresponds to the physical location of the file on the disk. The above classpath for instance should appear inside a class stored under the file `<rootFolderPath>/garden/tree/Fruit.js`.

The `rootFolderPath` is automatically set by the framework to match the directory where the framework is located (this default setting can be overridden through the variable [`Aria.rootFolderPath`](the_aria_singleton#rootfolderpath)).

### $constructor/$destructor

Their description is pretty much what everyone would expect of them.  This is where code that must execute when an instance is created / destroyed should be placed.  The constructor is also a place where we can define instance members for your class and initialize them.

Technically aria templates will generate the constructor function that corresponds to the _$classpath_ provided in the class definition. In other words, for the _x.y.AClass_ classpath, aria templates will generate a constructor function that will be accessible through _x.y.AClass_ once loaded 

When a class extends another class, it must explicitly call the parent class constructor and destructor to have a proper initialization/destruction. In order to make this more simple, Aria Templates generates a shortcut to the parent class object through the $PARENT_CLASS_NAME property (e.g. _$Plant_ in the example below). As the destructor is not a default JavaScript function, you will note a slight variation between the parent constructor and destructor calls (i.e. '$' sign in the destructor method name):

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/core/classes/Vegetable.js' defer></script>

*Note*: class load is asynchronous, as such you need to use the Aria.load(...) method or the $dependencies descriptor to make sure a class is loaded before instanciating it.

### $prototype

`$prototype` is the section in which you have to declare your methods; in our example a very simple getter/setter pair.  Note that instance members are referred to using the this keyword.

A word about an important coding convention used in this example:
Note that visibility, be it for members or methods, rely only on naming convention:
* `no prefix` means _public_
* `_` means _protected_
* `__` means _private_

Because Javascript does not provide any native mechanism regarding visibility, it is possible to access protected and private members from places you shouldn’t.  However, this convention is also very important for [documentation purposes](writing_documentation).

*NB*: Technically all properties defined in the _$prototype_ section will be assigned to the actual prototype of the generated ojbect. In other words, if we consider the _x.y.AClass_, its prototype properties will be stored in _x.y.AClass.protototype_

### $statics

Statics are used to define constants at class level.  In this example, we use it to define a default value that can be used by the constructor when it is not provided with an argument.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/core/classes/Vehicle.js' defer></script>

### $singleton

Sometimes, you do not need to create several instances from your class. You just need some kind of a library.
In this particular cases, Aria Templates allows you to define a singleton class.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/core/classes/MyLogger.js' defer></script>

## More about classes

Of course Aria Templates provides a lot more functionalities over Javascript classes, like inheritance, dependencies, or observable pattern...

Just have a look at the [around classes](around_classes) article to get a hint.

*References*

* You have to be familiar with the prototype concept, more information could be read [here](http://javascript.crockford.com/prototypal.html)

