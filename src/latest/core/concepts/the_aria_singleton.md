Title: The Aria Singleton


{{Draft}}
When loaded, the framework exposes most of its functionality through the <code>Aria</code> global object.  The singleton for which you can find details in the [API reference](http://ariatemplates.com/api/#Aria), features numerous methods and properties used by developers as well as the framework itself.

Because as an Aria Templates user you will be using its functionality quite often, several articles in the rest of this documentation will refer to it.  Below is a list of the most common usages.

## Declaring core objects

The next articles in this section will describe in details core objects that AT provide to create your application, such as:

[classes](Javascript Classes)
<syntaxhighlight lang="Javascript">
Aria.classDefinition({
    $classpath: "garden.tree.Fruit"
    (...)
});
</syntaxhighlight>

and [interfaces](Around_Classes#Interfaces.2C_.24implements),
<syntaxhighlight lang="Javascript">
Aria.interfaceDefinition({
    $classpath: "garden.tree.IFruit"
    (...)
});
</syntaxhighlight>

[JSON Beans](JSON Bean Definitions)
<syntaxhighlight lang="Javascript">
Aria.beanDefinitions({
    $package : "example.beans.SimpleBean",
    (...)
});
</syntaxhighlight>

or [resources](Localization and Resources).
<syntaxhighlight lang="Javascript">
Aria.resourcesDefinition({
    $classpath: 'samples.templates.localization.Res',
    (...)
});
</syntaxhighlight>

These objects are all defined in structures declared using the <code>Aria</code> object.

## Loading objects

* The main entry-point method to load a template: Aria.loadTemplate(...)
/insert code + links/

* A mechanism to load asynchronous dependencies: Aria.load(...)
/insert code + links/

## Configuration

* A logging mechanism, to facilitate development and debugging.
/insert Firebug screenshot/

* Configuration parameters at application level, among which the <code>debug</code> mode described [here](here).
/insert code + link to troubleshooting section/


The Aria object is defined at the top level of your application.