Title: Creating A Custom Widgets Library


The framework comes with a predefined set of widgets grouped in the <code>aria.widgets.AriaLib</code> library available by default using the <code>@aria:</code> prefix in templates. Those widgets may suit your needs very well, but in some cases you may need to develop your own ones.

This article explains how to create a new widget class, how to create the corresponding widget library and how to use it.

## Creating a widget

### BaseWidget

Basically, implementing a widget means creating a class which extends <code>aria.widgetLibs.BaseWidget</code> and overriding some of its methods. In addition, some features provided by Aria Templates like [CSS Templates](CSS_Templates), [event delegation](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Delegate) and [data model listeners](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Json:addListener:method) are very useful when developing a widget.

Here's a sample for a slider widget that uses all these concepts:
<sample sample="widgets/widgetlibs" />

#### Lifecycle

Widgets have a specific lifecycle (which is similar to the one of a template). Here are the main steps:

* During a template refresh, for each widget which belongs to the section being refreshed, an instance of the corresponding widget class is created.

* Then, immediately, its HTML markup generation method is called (either [writeMarkup](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgetLibs.BaseWidget:writeMarkup:method) or both [writeMarkupBegin](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgetLibs.BaseWidget:writeMarkupBegin:method) and [writeMarkupEnd](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgetLibs.BaseWidget:writeMarkupEnd:method)).

* When the HTML markup of the whole section to be refreshed has been generated, it is inserted in the DOM.

* Then the initialization method of the widget is called ([initWidget](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgetLibs.BaseWidget:initWidget:method)).

* Finally, when there is a refresh of a section containing the widget (or a parent template), the widget is disposed.

#### Widget constructor

The constructor of the widget is called with three parameters:
* the widget configuration (as defined in the template),
* the template context,
* the line number.

Calling the parent widget constructor is mandatory and important for it is needed to set the <code>_cfg</code>, <code>_context</code> and <code>_lineNumber</code> internal properties (among other things.)

For a simple widget this is typically done like this:

<syntaxhighlight lang="javascript">
$constructor : function (cfg, context, lineNumber) {
    this.$BaseWidget.constructor.apply(this, arguments);
    ...
}
</syntaxhighlight>

If CSS templates are defined in the <code>$css</code> section of the widget, the CSS manager is notified so that they are loaded before the markup is inserted in the DOM.

#### Markup generation

If the widget is intended to be a container, with an opening and a closing tag, both the <code>writeMarkupBegin</code> and <code>writeMarkupEnd</code> methods have to be overriden.  On the other hand, if the widget is intended to be used with a single tag, only the <code>writeMarkup</code> method needs to be overridden.

{{Note|It is possible to create a widget which accepts both usages by overriding all the corresponding methods.}}

These methods all accept an object of type <code>aria.templates.MarkupWriter</code> as their only parameter. Their default implementation in the base class is to raise an error explaining that the widget does not support this usage.

Here are some methods or properties which are often used in the [MarkupWriter](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.MarkupWriter):

* [write()](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.MarkupWriter:write:property): method used to output the HTML of the widget.

* [skipContent](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.MarkupWriter:skipContent:property): if the widget is a container, setting this property to true in <code>writeMarkupBegin</code> allows for skipping its content.

* [_createDynamicId](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgetLibs.BaseWidget:_createDynamicId:method): protected method is used to generate an automatic id, which is useful when you need to access the widget's DOM elements.  The id will be automatically freed when the widget is disposed (and will probably be reused later).

#### Widget initialization

The <code>initWidget</code> method can be overridden if some action should be done after the markup of the widget has been inserted in the DOM. The default implementation of this method does nothing.

#### CSS templates

Custom widgets can use CSS templates, declared as <code>$css</code> dependencies.

When processed those CSS templates will not be prefixed with a unique class id as standard CSS templates linked to HTML templates are. As a consequence, class names should be chosen carefully as they will apply to the whole page.

#### Example

Here's an example of a simple widget:
<syntaxhighlight lang="JavaScript">
Aria.classDefinition({
	$classpath : "samples.customlib.MyLabel",
	$extends : "aria.widgetLibs.BaseWidget",
	$dependencies : ["aria.utils.String"],
	$constructor : function (cfg, ctxt, lineNumber) {
		// The parent constructor takes care of storing the config in this._cfg, the template context in this._context
		// and the line number in this._lineNumber
		this.$BaseWidget.constructor.apply(this, arguments);
	},
	$prototype : {
		/**
		 * Main widget entry-point. Write the widget markup for a non-container widget.
		 * @param {aria.templates.MarkupWriter} out
		 */
		writeMarkup : function (out) {
			var cfg = this._cfg;
			if (cfg.content) {
				out.write(aria.utils.String.escapeHTML(this._cfg.content));
			}
			if (cfg.contentMacro) {
				// it is possible to call a macro when generating the widget markup
				out.callMacro(cfg.contentMacro);
			}
		}
	}
});
</syntaxhighlight>

Here's an example of a simple container widget:
<syntaxhighlight lang="JavaScript">
Aria.classDefinition({
	$classpath : "samples.customlib.MyContainer",
	$extends : "aria.widgetLibs.BaseWidget",
	$dependencies : ["aria.utils.String", "aria.utils.Dom"],
	$constructor : function (cfg, ctxt, lineNumber) {
		this.$BaseWidget.constructor.apply(this, arguments);

		/**
		 * Id of the main DOM element of this widget.
		 * @type String
		 */
		this._id = this._createDynamicId(); // This line creates a dynamic id to be used in the HTML markup.
		// Ids are automatically released when the widget is disposed (so that they can be reused)
		// Alternatively, it is possible to release an id manually with this._releaseDynamicId(this._id).

		/**
		 * Reference of the DOM element with id this._id.
		 * @type HTMLElement
		 */
		this._domElt = null;
	},
	$prototype : {
		/**
		 * Main widget entry-point. Write the beginning of the widget markup, corresponding to the opening tag (for a
		 * container widget).
		 * @param {aria.templates.MarkupWriter} out
		 */
		writeMarkupBegin : function (out) {
			var html = ['<div id="', this._id, '"><div class="customLibTitle">',
				aria.utils.String.escapeHTML(this._cfg.title), '</div>'];
			out.write(html.join(''));
		},

		/**
		 * Write the end of the widget markup, corresponding to the closing tag (for a container widget).
		 * @param {aria.templates.MarkupWriter} out
		 */
		writeMarkupEnd : function (out) {
			out.write('</div>');
		},

		/**
		 * Initialization method called after the markup of the widget has been inserted in the DOM.
		 */
		initWidget : function () {
			// now that the markup has been inserted in the DOM, it is possible to access
			// the HTML element corresponding to the id:
			this._domElt = aria.utils.Dom.getElementById(this._id);
			// and do what is needed with it...
		}
	}
});
</syntaxhighlight>

### BindableWidget

<code>aria.widgetLibs.BindableWidget</code> extends from <code>aria.widgetLibs.BaseWidget</code> and, in addition to that class, registers listeners on the data model for any widget's bind property. This class provides also a method to transform a bound value to and from the widget.

The function that registers data model listeners is <code>_registerBindings</code>, you can call it in the widget's constructor or inside <code>initWidget</code> depending on your needs.
When called, for every bound property, this function calls <code>setWidgetProperty</code> with the transformed value and register a listeners on the data model that is then removed when the widget is disposed.

Whenever the value changes in the data model, the protected method <code>_notifyDataChange</code> is called on the widget with information about the change.

You can override this function to implement your own logic to be executed when a bound value changes from outside the widget.

The following flow graph is a visual representation of what happens when a custom widget is used in a template

[thumb|500px|Bindable Widget](File:Aria_Templates_-_Custom_Widget_-_BindableWidget.png)

When the template is loaded, the widget's <code>constructor</code> is called, you can override this method to handle widget's configuration parameters or call <code>_registerBindings</code>.
Then the framework calls <code>writeMarkup</code> or <code>writeMarkupBegin</code> and <code>writeMarkupEnd</code> to get the widget's markup and put it in the DOM, once done it calls <code>initWidget</code>. This is where you can get DOM reference and call <code>_registerBindings</code> if you didn't call it in the <code>constructor</code>.

Whenever <code>_registerBindings</code> is called, <code>setWidgetProperty</code> gets called with the name of the bound property and its value after a transform to widget.

Something similar to <code>_registerBindings</code> happens when the bound value changes in the data model, either because you set it in a template script or because of other automatic bindings. When a value changes <code>_notifyDataChange</code> gets called with the name of the bound property and a description of the change. The value received inside <code>_notifyDataChange</code> has not been transformed yet.

### Element

<code>aria.html.Element</code> extends from <code>aria.widgetLibs.BindableWidget</code> and is the base class for creating a single html tag element. Being a `BindableWidget` it has data model bindings, but it also handles `event delegation` of events defined in `on` property.

Let's imagine to create a widget extending from <code>aria.html.Element</code>
<syntaxhighlight lang="AT">
{@my:Widget {
   bind : {
      name : {
         inside : data,
         to : "name"
      }
   },
   on : {
      click : {
         fn : "clicked",
         scope : this
      }
   }
} /}
</syntaxhighlight>

_Element_ class takes care of `bind` and `on` properties. Whenever a bound value changes the widget's public method [onbind](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.html.Element:onbind:method) is called with the name of the changed property and its new and old value, this signature is simpler to use than <code>_notifyDataChange</code>.
Moreover every event in `on` statement is delegated and the associated callback will be called when the event happens.

The constructor of <code>aria.html.Element</code> has the same signature as <code>aria.widgetLibs.BaseWidget</code>

<syntaxhighlight lang="JavaScript">
/**
 * Create an instance of the widget.
 * @param {Object} cfg widget configuration, which is the parameter given in the template
 * @param {aria.templates.TemplateCtxt} context template context
 * @param {Number} lineNumber line number in the template
 */
$constructor : function (cfg, context, lineNumber) {}
</syntaxhighlight>

The configuration object <code>cfg</code> is normalized against the bean [aria.html.beans.ElementCfg](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.html.beans.ElementCfg). This bean defines the properties
* `tagName` : Qualified name of the Element node generated by the widget
* `attributes` : List of allowed html attributes
* `bind` : List of properties that can be bound to this widget
* `on` : List of registered events and their callbacks

By default <code>aria.html.Element</code> generates a tag element of type `tagName` with the specified attributes, for instance

<syntaxhighlight lang="AT">
{
   tagName : "div",
   attributes : {
      style : "display : inline",
	  classList : ["container", "left"]
   }
}
</syntaxhighlight>

generates the following markup
<syntaxhighlight lang="html5">
<div class="container left" style="display : inline"></div>
</syntaxhighlight>

Widgets extending from <code>aria.html.Element</code> can optionally override <code>this.$bean</code> before calling the parent constructor to specify their own configuration bean in case they want to provide validation of configuration parameters.

The following is the flow graph of <code>aria.html.Element</code> widgets

[thumb|500px|Element](File:Aria_Templates_-_Custom_Widget_-_ElementWidget.png)

It is similar to <code>aria.widgetLibs.BindableWidget</code> but in this case when a value bound to the data model is changed, <code>onbind</code> is called. <code>onbind</code> has a different signature than <code>_notifyDataChange</code>, it is called with the name of the changed property, its current value after transform and the value before change.

Every event raised by the user (mouse, keyboard, ...) is handled by <code>_delegate</code> function that calls the right callback for that event. Normally you don't need to override this function.

#### Example

<sample sample="html/custom/gallery" />

## Creating a custom widget library

### Defining a custom library

A custom library is a singleton class which extends <code>aria.widgetLibs.WidgetLib</code> and specifies for each widget the classpath of the class which implements its behavior.

It typical library looks like this (example defining two widgets):
<syntaxhighlight lang="JavaScript">
Aria.classDefinition({
	$classpath : "samples.customlib.MyCustomLibrary",
	$extends : "aria.widgetLibs.WidgetLib",
	$singleton : true,
	$prototype : {
		widgets : {
			"Label" : "samples.customlib.MyLabel",
			"Container" : "samples.customlib.MyCustomContainer"
		}
	}
});
</syntaxhighlight>

### Using a custom library

To use a specific widget library in a template, you need to declare its classpath and an alias in the template's <code>$wlibs</code> section.  This alias can then be used as a prefix in the widget statement, as shown in the example below:
<syntaxhighlight lang="AT">
{Template {
	$classpath: "samples.MyTemplate",
	$wlibs: {
		"mycustomlib": "samples.customlib.MyCustomLibrary"
	}
}}
	{macro main()}
		{@mycustomlib:Label {
			content: "Hello"
		}/}
		
		{@mycustomlib:Container {
			title: "Legend"
		}}
			${data.legend}
		{/@mycustomlib:Container}
	{/macro}
{/Template}
</syntaxhighlight>

If the widget library is supposed to be used in the whole application, it is possible to declare it as a global library in the application environment rather than referencing it in each template. Note that, in this case, the alias can still be overridden in a specific template (in the <code>$wlibs</code> section).

The code below declares the <code>mycustomlib</code> library in the environment in addition to the default <code>aria</code> library, so that it is no longer necessary to declare mycustomlib in each template:
<syntaxhighlight lang="JavaScript">
aria.core.AppEnvironment.setEnvironment({
	// ...
	defaultWidgetLibs : {
		// the standard aria library can be changed for the whole application here
		"aria" : "aria.widgets.AriaLib", // here, we keep the default aria library
		// declare the custom library :
		"mycustomlib" : "samples.customlib.MyCustomLibrary"
	}
});
</syntaxhighlight>

{{Note|When using this mechanism, you need to explicitly declare *all* the libraries you will use, including <code>aria</code> if you need it, otherwise it won't be available unless referenced in the <code>$wlibs</code> section of a template.}}