Title: Logging and debugging


## Logging

The AriaTemplates logger is based on the following concepts:

* any class that needs to log messages can do so by using specific methods inherited from the <code>aria.core.JsObject</code> root object from which any AT class inherits directly or indirectly;

* messages can be logged with several possible levels: <code>debug</code>, <code>info</code>, <code>warn</code> and <code>error</code>;

* the class names are kept in the logger system so you can filter on them;

* the logger system is split between the logging phase and the appending phase, so that you can have as many different appenders as you want.

### Usage

There are 4 useful methods to know:

<syntaxhighlight lang="javascript">
this.$logDebug(msg, msgArgs, o);
this.$logInfo(msg, msgArgs, o);
this.$logWarn(msg, msgArgs, o);
this.$logError(msg, msgArgs, o);
</syntaxhighlight>

These methods may be used anywhere within the life-cycle of your class to either add valuable debugging information, or raise a warning or simply throw an error.

They all have the same signature:

* <code>msg</code>: the message string to be displayed in the logs.

* <code>msgArgs</code>: optional array of values to be used for <code>%n</code> string replacement in the message (for instance: <code>this.$logDebug("Hello %1 %2", ["John", "Smith"]);</code>).

* <code>o</code>: an optional object to be inspected in the logs.

The simplest usage example is the following one:

<syntaxhighlight lang="javascript">
this.$logInfo("Processing something ...");
</syntaxhighlight>

### Visualizing logs

#### Appenders

Appenders are objects that are responsible for actually showing the logged messages.  The default appender available out of the box in Aria Templates is the DefaultAppender based on the browser console.

If a <code>console</code> object exists in the browser, the DefaultAppender will use it to output messages. This means that it will work with Firebug in Firefox, with the JS console in Safari, with FirebugLite in IE, etc.

Appenders are standard JavaScript classes, so you may create your own.

Aria Templates comes with another notable appender: the WindowAppender. It can be used to get logs displayed in an other browser window.  It opens up a new window in the browser and outputs logs as HTML.

This appender can be used in browsers that do not have a JavaScript console.

Manipulating appenders can be done with the <code>aria.core.Log</code> singleton object like so:

<syntaxhighlight lang="javascript">
aria.core.Log.addAppender(new aria.core.log.WindowAppender());
</syntaxhighlight>

You may want to clear completely all appenders that are present at a given time:

<syntaxhighlight lang="javascript">
aria.core.Log.clearAppenders();
</syntaxhighlight>

#### Levels

The actual logs that you see at runtime also depend on their levels and the current logging configuration.

The logging system can be configured to only output messages that match (or are higher than) a given level for each class name.

The way Aria Templates logging system is configured by default will only let messages through if they are at least warnings.

However, when debugging an application, you might want to see more of what is going on in the system. For this reason, you can configure the levels to suit your needs:

<syntaxhighlight lang="javascript">
aria.core.Log.resetLoggingLevels();
aria.core.Log.setLoggingLevel("*", aria.core.Log.LEVEL_ERROR);
aria.core.Log.setLoggingLevel("aria.*", aria.core.Log.LEVEL_INFO);
aria.core.Log.setLoggingLevel("my.package.*", aria.core.Log.LEVEL_DEBUG);
</syntaxhighlight>

The above code will do several things:

* completely reset all current levels and then

* set minimum logging level to error for all classes

* except for classes found in <code>aria.*</code> for which it will set the level info,

* and except for classes found in <code>my.package.*</code> for which it will set the level debug.

## Debugging

The debug mode in Aria Templates is enabled by setting the <code>debug</code> parameter of the Aria object to true _before it is instanciated by the framework_.  Practically, this means you should write something like this:

<srcinclude tag="logdebug" outdent="true" noheader="true" lang="html5">logdebug/bootstrap.html</srcinclude>

The default debug value is <code>false</code> and you have to set this value before the framework loads. When set to true, the following will enabled:

* Precise runtime exceptions on templates.

* Full validation of JSON structure against bean definitions (for performance reasons, this feature is not activated by default.)

## Inspecting Templates and Modules

Aria-Templates provides tools to inspect the templates and modules currently displayed by an application.

### Inspecting through Contextual Menu

When the debug mode of Aria Templates is enabled, the <code>CTRL Right-click</code> combination on a template opens a contextual menu showing:

* The target template classpath.

* If any, the target module classpath associated with this template.

* A Reload Template button which allows the developer to reload the targeted template from the server. This is useful during development to test a new view without reloading the complete application.

* A Reload Module button which allows to reload the submodules and flow from the server. This is useful during development to test changes in a submodule and flow without reloading the complete application.  See [below](#About_module_reloading) for details about this feature.

* A Debug Tools button which opens dedicated tools to inspect the application (see below.)

To enable the contextual menu even when not in debug mode, the following bookmarklet can be used:

<syntaxhighlight lang="javascript">
javascript:aria.core.AppEnvironment.updateEnvironment({contextualMenu:{enabled:true}});
</syntaxhighlight>

To disable the contextual menu, the following bookmarklet can be used:
<syntaxhighlight lang="javascript">
javascript:aria.core.AppEnvironment.updateEnvironment({contextualMenu:{enabled:false}});
</syntaxhighlight>

#### About module reloading

The module reload feature is available only for sub-modules of another module (if a root module has to be reloaded, it is possible to refresh the whole browser window). 

Depending on how the application, module and/or flow are developed, the module reload feature may not always succeed in perfectly reproducing the state which would have been reached if the application had been really restarted from the beginning (by refreshing the whole browser window). The module reload feature is only intended to be used during the development of a module or flow and not during the normal execution of an application.

Reloading a module means:
1. disposing templates associated to the instance of the module,
1. disposing the instance of the module (this also disposes its associated flow and sub-modules),
1. unloading and removing from the cache the core components of the module: module class, module public interface, flow class and flow public interface
1. creating a new instance of the module from scratch, with the same init parameters as before and attaching it to its previous parent module with the same refpath
1. recreating with the new module controller the templates disposed in step 1

Note that:
* if a template uses a module controller, but uses as its <code>data</code> variable another object than the one returned by calling <code>getData()</code> on the module controller, then when reloading the module controller, the <code>data</code> variable is not changed in the reloaded template. This may have wrong results in some cases, especially if the <code>data</code> variable refers to a sub-part of the data model, which is most of the time rebuilt when reloading the module controller. This limitation only applies for a template which is not included in a template associated with the same module controller.
* the reference to the module public interface and flow public interface changes when reloading a module. However, there is a mechanism to make calls on the old interface wrapper be redirected automatically to the new one.
* when reloading a module, listeners and interceptors registered by application code on the old module and flow are not automatically registered again on the reloaded module.

### Debug Tools

Debug Tools is a set of modules opened in a new window that helps you working on an Aria Templates application. Current available modules are:
* Inspector: report on the templates and modules of the application.
* Logger: a log appender for logs raised by the application.

Debug Tools are started either with the contextual menu, or using the following Bookmarklet :

<syntaxhighlight lang="javascript">
javascript:Aria.load({classes:['aria.tools.ToolsBridge'],oncomplete:function(){aria.tools.ToolsBridge.open()}});
</syntaxhighlight>

{{Note|Popup blockers may prevent this tool from opening.}}

#### Inspector Module

This module displays the hierarchy of templates and the modules associated with these templates on the right. It allows to highlight the templates in the application, show the link between a template and a module controller.

Clicking on a template provides details on it, such as source code and contained widgets, and also widget configuration.

Clicking on a module controller provides details on it, such as its current data and public interface.

#### Logger Module

The logger module is a simple appender for all the logs done in your application. This module is useful when debugging in a browser that does not provide a console by default (such as IE).

## DOM inspection

The Aria Templates framework stores debugging information on the DIV DOM elements which contain a template. This way, you can easily know the classpath of the template loaded in the DIV, you can access its data, its module controller, and its template object. Here is a screenshot showing how to access these pieces of information in Firebug:

<img src="images/firebug.png" />

As illustrated in the screenshot:
* The <code>_template</code> attribute of the <code>div</code> tag contains the classpath of the template loaded in it (in this example: <code>ariadoc.guides.todo.view.Todo</code>).

* The <code>__data</code> property is a reference to the data variable accessible from the template. It is visible on the screenshot on the right pane of Firebug, at the top of the DOM tab.

* The <code>__moduleCtrl</code> property is a reference to the module controller linked to the template. It can be either the private complete module controller or its public interface (accessible through the moduleCtrl variable from the template), depending on what is available.

* The <code>__template</code> property is a reference to the template instance object, available as <code>this</code> in the template and template script.