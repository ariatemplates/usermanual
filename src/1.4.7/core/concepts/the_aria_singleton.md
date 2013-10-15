Title: The Aria Singleton



When loaded, the framework exposes most of its functionality through the `Aria` global object.  The singleton for which you can find details in the [API reference](http://ariatemplates.com/api/#Aria), features numerous methods and properties used by developers as well as the framework itself.

Because as an Aria Templates user you will be using its functionality quite often, several articles in the rest of this documentation will refer to it.  Below is a list of the most common usages.

## Declaring core objects

The next articles in this section will describe in details core objects that AT provide to create your application, such as:


[classes](javascript_classes)
<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=classDefinition&lang=javascript" defer></script>

and [interfaces](around_classes#interface-definition),
<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=interfaceDefinition&lang=javascript" defer></script>

[JSON Beans](json_bean_definitions)
<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=beanDefinitions&lang=javascript" defer></script>

or [resources](localization_and_resources).
<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=resourcesDefinition&lang=javascript" defer></script>

These objects are all defined in structures declared using the `Aria` object.

## Loading objects

* The main entry-point method to load a template: Aria.loadTemplate(...)

  <script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=loadTemplate&lang=javascript" defer></script>


* A mechanism to load asynchronous dependencies: Aria.load(...)

  <script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/AriaSingleton.js?noheader=true&tag=load&lang=javascript" defer></script>

## Configuration

* A logging mechanism, to facilitate development and debugging.
/insert Firebug screenshot/

* Configuration parameters at application level, among which the `debug` mode described [here](logging_and_debugging).
/insert code + link to troubleshooting section/


The Aria object is defined at the top level of your application.