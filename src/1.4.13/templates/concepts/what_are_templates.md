Title: What are Templates


Templates are files that define the user interface of your application.  In AT, contrary to server-side templating language such as JSP or ASP, the interface is processed in the browser, which eliminates round-trips to the server to fetch graphical updates.  Another great advantage of client-side templating is that you, as a developer, don't have to manually alter the display by manipulating the DOM and its CSS: all you need to do is just refresh the parts that changed when needed. This is explained in details in [the dedicated article about refresh](refresh).

This article will show you how to write and use a template. If you are already familiar with templates and are looking for statements documentation, you'll want to read about [how to write templates](writing_templates).

Note that templates have a specific client-side representation and that, when created, disposed or refreshed, DOM elements, DOM events and Javascript objects are manipulated. This means that depending on the structure of your application, there may be performance implications to consider (see [the disposal of a template](#destruction)).

## Templates syntax

To define interfaces Aria Templates relies on HTML to which it adds a number of powerful features that makes it easy to create and maintain rich front-ends.

Templates are defined in files with a `.tpl` extension and use a number of special tags identified by curly brackets `{` and `}`, which are interpreted by the AT framework engine.

There are 3 kinds of tags:

* **Statements**: like `{foreach}` or `{section}` explained in details in [this article](writing_templates), are used to define the structure of dynamic pages.
* **Widgets**: like `{@aria:Button}` explained in details in [this article](widgets) are graphical components that make it easy to design a flexible user interface.
* **Expressions**: like `${i + 10}` are used to evaluate Javascript expressions (variable references, functions calls, etc.)

Templates always begin with a `{Template}` statement that defines its classpath and may provide additional configuration options.  They can contain several macros, which are the equivalent of methods, but must always contain one called `main`, that is the template entry point.
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/fibo/Fibonacci.tpl?lang=at'></script>

## Loading templates

There are two ways to use templates in your application.

### The loadTemplate method

The first one is to dynamically load them using `loadTemplate()` method of the [Aria](the_aria_singleton) global object.  This can be done anywhere in your code.  The two mandatory parameters of this method are the classpath of the template and the id of the container in which it should be loaded.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/loadTemplates.html?noheader=true&tag=loadTemplate&lang=javascript&outdent=true'></script>


This is also the method you will use in the _bootstrap code_, i.e. the container (HTML, JSP, PHP, etc.) of your application from which you will load the root template from.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/loadTemplates.html?noheader=true&lang=html'></script>

Note that in this example we've initialized the [data model](data_model_and_data_binding) directly at loading time using the `data` property of the configuration.  The complete list of parameters that are accepted by the `loadTemplate()` method configuration object is detailed [here](http://ariatemplates.com/api/#aria.templates.CfgBeans:LoadTemplateCfg).

### The template widget

Another way to include a template in your application is to use the `{@aria:Template}` widget and providing it with the classpath of the file to load:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/SimpleTemplate.tpl?noheader=true&lang=at&tag=templateWidget&outdent=true'></script>

Doing so will display the content of `OtherTemplate.tpl` in the template it has been included in (note that we obviously don't need to give a container id in this case.)  Similarly to the `loadTemplate()` method, it is possible to provide the template to be loaded with several other parameters such as an pre-initialized data model.  The complete list of parameters that are accepted by the Template widget is detailed [here](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TemplateCfg)

## Lifecycle

Once a template is loaded, it needs to be parsed and interpreted by the AT engine before it can be used then destroyed.  Let's have a detailed look at what happens in the different steps of a template lifecycle.

### Interpretation

After it has been loaded, the template content is interpreted by the templating engine and compiled into [a class](javascript_classes).  As any other class, it may contain dependencies that would be recursively loaded from the server or from the cache. Such dependencies include widgets, localized resources or [template scripts](template_scripts).

The resulting class is kept in a cache so that it doesn't need to be reloaded and reinterpreted in future uses, making subsequent executions of this template faster.

### Initialization

If the template has been parsed and compiled successfully, the resulting class will be instantiated: its `constructor()` method, that you can overload in an associated [template script](template_scripts), will be called.  Finally, its `$refresh()` method, inherited from `aria.templates.Template`, will be called so that it is displayed in its placeholder.

Four other inherited methods can be implemented to execute code at a specific template's phase.  Those are described in a [dedicated paragraph](template_scripts#intercepting-template-lifecycle-phases) of the [template script article](template_scripts).

### Active state

The template enters its active state once initialization is completed.  It is then visible and working.

### Destruction

A template is automatically unloaded when its parent is itself unloaded or being refreshed. The root template, loaded using `Aria.loadTemplate` on the other hand, must be manually unloaded with the `Aria.disposeTemplate()` method if needed.

When it is unloaded, the template markup is removed from the DOM and its class instance is destroyed: its `$destructor()` method is called and the object is nullified.

Remember that keeping too many references in your DOM might impact your app performances.  The whole idea behind client-side templating being to remove what is not displayed, do not forget to dispose of your templates once they are not needed anymore.