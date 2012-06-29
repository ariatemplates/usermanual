Title: Template Scripts


Template Scripts are special types of classes whose existence is strictly related to a template. Indeed, each template can have a template script associated to it. Its purpose is to perform the logic related to the view, for example
* perform full or partial template refreshes
* define handlers to respond to user actions
* react to events raised by the module controller associated to the template
* intervene in the template lifecycle
* retrieve and manipulate DOM elements or sections.

The Aria Templates framework automatically copies the template script prototype members to the template prototype so that the template is given access to everything declared in the template script.

## Script definition
The template script is similar to a normal Aria Templates class but it has to be defined with the [Aria.tplScriptDefinition](http://ariatemplates.com/aria/guide/apps/apidocs/#Aria:tplScriptDefinition:method) method. This method accepts an object of type [aria.templates.CfgBeans.TplScriptDefinitionCfg](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans:TplScriptDefinitionCfg).

Its properties are a subset of the properties accepted in a standard [Aria.classDefinition](http://ariatemplates.com/aria/guide/apps/apidocs/#Aria:classDefinition:method). Please refer to the [this APIDOC page](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.CfgBeans:ClassDefinitionCfg) for the complete list and to the [article about Aria Templates Javascript classes](Javascript_Classes).

As with class definitions, the physical file that contains a template script definition has *<code>.js</code>* extension.

## Associating a template to a template script

When you want to associate a template script, you have to set the *<code>$hasScript</code>* property of the Template configuration to <code>true</code>. Consider the following example:

<srcinclude lang="at" outdent="true">templates\templateScripts\MyTemplate.tpl</srcinclude>

When this template is loaded, the framework automatically looks for script definition whose classpath is obtained by adding the keyword *<code>Script</code>* to the classpath of the template. So in this case you have to provide a script definition whose classpath is <code>ariadoc.snippets.templates.templateScripts.MyTemplateScript</code>. Here is the definition of a basic script that would be loaded:

<srcinclude lang="at" outdent="true">templates\templateScripts\MyTemplateScript.js</srcinclude>


You can notice that the script defines the method <code>showAlert</code> in its prototype. This method can be used inside the template (<code>${showAlert("my message")}</code>) because the template script prototype members are automatically copied to the template prototype.

Also, it is not mandatory to define a <code>$contructor</code> and a <code>$destructor</code>: if they are empty, they can completely removed. When you need to define them, there is no need to call the parent contructor/destructor: the framework automatically takes care of that.

## Available variables

The predefined variables available to the template are also available in the template script. You can find a description of them in the [article about templates](Writing_Templates#Predefined_variables).

Moreover, global-scope variables defined in the template are available in the template script. Consider this example:

<srcinclude lang="at" outdent="true">templates\templateScripts\MySecondTemplate.tpl</srcinclude>

<srcinclude lang="at" outdent="true">templates\templateScripts\MySecondTemplateScript.js</srcinclude>

You can see that the template script has access to
* the global-scope variable <code>myGlobalTemplateVar</code> defined in the template
* the <code>data</code> object
* the <code>getMessage</code> method declared in the [module controller](Controllers) and exposed in its interface.

Note, however, that in template scripts the <code>this</code> keyword has to be used.


## Available methods

Some methods are available in the template scripts (declared in the interface of [aria.templates.ITemplate](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.ITemplate)). In particular:
* *<code>$refresh</code>* is explained in detail in the [article about template refresh](Refresh)
* *<code>$getElementById</code>* is explained and used in the [article on the interactions with the DOM](Interactions with the DOM)
* *<code>$vdim</code>* and *<code>$hdim</code>* are detailed in the [article about adaptive display](Adaptive_Display).
* *<code>$focus</code>* and *<code>$focusFromParent</code>* which allow to handle the focus inside a template. These methods are detailed in [this article](Interactions_with_the_DOM).

## Reacting to user interaction

in this section we present a very simple sample on how to react to a click. The [ on statement](Writing_Templates#on) is used along with a handler defined in the script.

<sample sample="templates/templateScripts/clickhandler"/>

## Reacting to module and flow events

It is possible to react to events raised by the [module controller](Controllers) associated to the template or by the [flow controller](Flow_Controllers) associated to the the module controller. It is sufficient to define the methods *<code>onModuleEvent</code>* and *<code>onFlowEvent</code>* in the script <code>$prototype</code>:

<srcinclude lang="at" outdent="true">templates\templateScripts\MyThirdTemplateScript.js</srcinclude>

But doing so, you are actually overriding the methods defined in the prototype of the class [aria.templates.Template](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.Template), which is the default parent class of templates and template scripts.

These methods are called whenever an event is raised by the module controller of its associated flow controller.

## Intercepting template lifecycle phases

Four callback methods inherited from <code>aria.templates.Template</code> can be implemented at script level to execute code during the initialization phase of the template.  They are as follow:

It is possible to define methods that are called when a template is initialized and refreshed:
* <code>$beforeRefresh</code>
Called at the beginning of any <code>$refresh</code> of the template.
* [$dataReady](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.Template:$dataReady:method)
When the data has been loaded and the module associated to this template has been initialized
* [$viewReady](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.Template:$viewReady:method)
When the template (but not its subtemplates) is ready to be displayed
* [$displayReady](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.Template:$displayReady:method)
When the template and its subtemplates are ready to be displayed
* <code>$afterRefresh</code>
Called after any <code>$refresh</code> of the template

For a description of the template lifecycle, refer to this [article](What are Templates?).