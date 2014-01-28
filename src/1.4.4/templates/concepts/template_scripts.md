Title: Template Scripts


Template Scripts are special types of classes whose existence is strictly related to a template. Indeed, each template can have a template script associated to it. Its purpose is to perform the logic related to the view, for example
* perform full or partial template refreshes
* define handlers to respond to user actions
* react to events raised by the module controller associated to the template
* intervene in the template lifecycle
* retrieve and manipulate DOM elements or sections.

The Aria Templates framework automatically copies the template script prototype members to the template prototype so that the template is given access to everything declared in the template script.

## Script definition
The template script is similar to a normal Aria Templates class but it has to be defined with the <code>[Aria.tplScriptDefinition](http://ariatemplates.com/api/#Aria:tplScriptDefinition:method)</code> method. This method accepts an object of type <code>[aria.templates.CfgBeans.TplScriptDefinitionCfg](http://ariatemplates.com/api/#aria.templates.CfgBeans:TplScriptDefinitionCfg)</code>.

Its properties are a subset of the properties accepted in a standard <code>[Aria.classDefinition](http://ariatemplates.com/api/#Aria:classDefinition:method)</code>. Please refer to the [this APIDOC page](http://ariatemplates.com/api/#aria.core.CfgBeans:ClassDefinitionCfg) for the complete list and to the [article about Aria Templates Javascript classes](javascript_classes).

As with class definitions, the physical file that contains a template script definition has **`.js`** extension.

## Associating a template to a template script

When you want to associate a template script, you have to set the **`$hasScript`** property of the Template configuration to `true`. Consider the following example:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/templateScripts/MyTemplate.tpl?lang=at&outdent=true'></script>

When this template is loaded, the framework automatically looks for script definition whose classpath is obtained by adding the keyword **`Script`** to the classpath of the template. So in this case you have to provide a script definition whose classpath is `ariadoc.snippets.templates.templateScripts.MyTemplateScript`. Here is the definition of a basic script that would be loaded:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/templateScripts/MyTemplateScript.js?lang=at&outdent=true'></script>

You can notice that the script defines the method `showAlert` in its prototype. This method can be used inside the template (`${showAlert("my message")}`) because the template script prototype members are automatically copied to the template prototype.

Also, it is not mandatory to define a `$contructor` and a `$destructor`: if they are empty, they can completely removed. When you need to define them, there is no need to call the parent contructor/destructor: the framework automatically takes care of that.

## Available variables

The predefined variables available to the template are also available in the template script. You can find a description of them in the [article about templates](writing_templates#predefined-variables).

Moreover, global-scope variables defined in the template are available in the template script. Consider this example:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/templateScripts/MySecondTemplate.tpl?lang=at&outdent=true'></script>

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/templateScripts/MySecondTemplateScript.js?lang=at&outdent=true'></script>

You can see that the template script has access to
* the global-scope variable `myGlobalTemplateVar` defined in the template
* the `data` object
* the `getMessage` method declared in the [module controller](controllers) and exposed in its interface.

Note, however, that in template scripts the `this` keyword has to be used.


## Available methods

Some methods are available in the template scripts (declared in the interface of [aria.templates.ITemplate](http://ariatemplates.com/api/#aria.templates.ITemplate)). In particular:

* **`$refresh`** is explained in detail in the [article about template refresh](refresh)
* **`$getElementById`** is explained and used in the [article on the interactions with the DOM](interactions_with_the_dom)
* **`$vdim`** and **`$hdim`** are detailed in the [article about adaptive display](adaptive_display).
* **`$focus`** and **`$focusFromParent`** which allow to handle the focus inside a template. These methods are detailed in [this article](interactions_with_the_dom).

## Reacting to user interaction

in this section we present a very simple sample on how to react to a click. The [ on statement](writing_templates#on) is used along with a handler defined in the script.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/templateScripts/clickhandler/' ></iframe>

## Reacting to module and flow events

It is possible to react to events raised by the [module controller](controllers) associated to the template or by the [flow controller](flow_controllers) associated to the the module controller. It is sufficient to define the methods **`onModuleEvent`** and **`onFlowEvent`** in the script `$prototype`:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/templateScripts/MyThirdTemplateScript.js?lang=at&outdent=true'></script>

But doing so, you are actually overriding the methods defined in the prototype of the class [aria.templates.Template](http://ariatemplates.com/api/#aria.templates.Template), which is the default parent class of templates and template scripts.

These methods are called whenever an event is raised by the module controller of its associated flow controller.

## Intercepting template lifecycle phases

Four callback methods inherited from `aria.templates.Template` can be implemented at script level to execute code during the initialization phase of the template.  They are as follow:


It is possible to define methods that are called when a template is initialized and refreshed:

* `$beforeRefresh`
Called at the beginning of any `$refresh` of the template.
* <code>[$dataReady](http://ariatemplates.com/api/#aria.templates.Template:$dataReady:method)</code>
When the data has been loaded and the module associated to this template has been initialized
* <code>[$viewReady](http://ariatemplates.com/api/#aria.templates.Template:$viewReady:method)</code>
When the template (but not its subtemplates) is ready to be displayed
* <code>[$displayReady](http://ariatemplates.com/api/#aria.templates.Template:$displayReady:method)</code>
When the template and its subtemplates are ready to be displayed
* `$afterRefresh`
Called after any `$refresh` of the template

For a description of the template lifecycle, refer to this [article](what_are_templates).