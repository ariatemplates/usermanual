Title: The Aria Singleton


{{Draft}}
When loaded, the framework exposes most of its functionality through the `Aria` global object.  The singleton for which you can find details in the [API reference](http://ariatemplates.com/api/#Aria), features numerous methods and properties used by developers as well as the framework itself.

Because as an Aria Templates user you will be using its functionality quite often, several articles in the rest of this documentation will refer to it.  Below is a list of the most common usages.

## Declaring core objects

The next articles in this section will describe in details core objects that AT provide to create your application, such as:

[classes](javascript classes)
<syntaxhighlight lang="Javascript">
Aria.classDefinition({
    $classpath: "garden.tree.Fruit"
    (...)
});
</syntaxhighlight>

and [interfaces](around_classes#interfaces.2c-.24implements),
<syntaxhighlight lang="Javascript">
Aria.interfaceDefinition({
    $classpath: "garden.tree.IFruit"
    (...)
});
</syntaxhighlight>

[JSON Beans](json bean definitions)
<syntaxhighlight lang="Javascript">
Aria.beanDefinitions({
    $package : "example.beans.SimpleBean",
    (...)
});
</syntaxhighlight>

or [resources](localization and resources).
<syntaxhighlight lang="Javascript">
Aria.resourcesDefinition({
    $classpath: 'samples.templates.localization.Res',
    (...)
});
</syntaxhighlight>

These objects are all defined in structures declared using the `Aria` object.

## Loading objects

* The main entry-point method to load a template: Aria.loadTemplate(...)
/insert code + links/

* A mechanism to load asynchronous dependencies: Aria.load(...)
/insert code + links/

## Configuration

* A logging mechanism, to facilitate development and debugging.
/insert Firebug screenshot/

* Configuration parameters at application level, among which the `debug` mode described [here](here).
/insert code + link to troubleshooting section/


The Aria object is defined at the top level of your application.