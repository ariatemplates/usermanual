Title: DOM Events


This article describes how to use DOM events in Aria Templates.  Note that it doesn't cover [widgets](http://ariatemplates.com/api/#aria.widgets.CfgBeans) events  for which documentation can be found directly in the widget's reference itself.

## Event Handlers in Templates

Attaching DOM Events to elements created in templates is similar to using  the various `on<event>` parameters (`onclick`, `onkeypress`, ...) in a standard HTML page. It is the most straightforward way to allow user interaction with DOM Elements in Aria Templates.

### Supported Events

Events handled in Aria Templates are: 
* Mouse: `click, dblclick, mouseup, mousedown, mouseover, mousemove, mouseout, mouseenter, mouseleave`
* Keyboard: `keydown, keypress, keyup`
* HTML form: `focus, blur, select, change, submit, reset`

Please note that all events are not necessarily available on all tags. This depends on how browsers manage DOM events. You may want to read detailed documentation on that topic such as [this one](http://www.quirksmode.org/dom/events/) for more information.

### Attach an event handler

To attach events to DOM elements in templates you must use the [`on`](writing_templates#on) statement.
Example:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/domEvents/Main.tpl' defer></script>

The `on` statement is part of the element opening tag, as would an `on_event_` property be.

To specify the event handler method you may either use the short or complete notation:

* short:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/domEvents/Main.tpl' defer></script>

* complete: 
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/domEvents/Main.tpl' defer></script>

Check the [examples section](#examples) to learn which syntax you should use and when.

You can use several `on` statements inside the same DOM element.
For instance:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/domEvents/Main.tpl' defer></script>

{{Note|One limitation of the framework today is that no check is done on the event name passed to the `on` statement, meaning that you won't get any error if it is mispelled!}}

## Event callback methods

The callback method given to your `on` statement can be defined either in the template script, the [module controller](controllers), or an inline anonymous function.

Depending on how you declared it, the scope of the callback (what `this` represents) will differ:

* If the event was attached using the *short syntax*, the scope will be assigned to the *template object*.
* If the event was attached with the *complete syntax*, the scope will be the one given in the *scope property* if any, or will default to the *template object*.  It is however good practice to explicitly declare the scope of your callback even when you intend it to be the template, for readability and maintenance purposes.

### Signature

A callback assigned with `on` must conform to the following signature :

<syntaxhighlight lang="javascript">
onEventCallback : function ([evt, [args]])
</syntaxhighlight>
where:
* *`evt`* is a cross-browser [event wrapper](http://ariatemplates.com/api/#aria.templates.DomEventWrapper) detailing the event that triggered the callback.
* *`args`* is the `args` property of the [callback definition](http://ariatemplates.com/api/#aria.utils.Callback:$constructor:method) when called with the complete syntax.

### DomEventWrapper and DomElementWrapper

In many situations, you will want to check information about the event that was raised. You may do so by checking the [aria.templates.DomEventWrapper](http://ariatemplates.com/api/#aria.templates.DomEventWrapper) parameter of your callback, thus accessing all the event properties in a cross browser manner (`type, target, altKey, ctrlKey`...). In addition to the usual properties, the DomEventWrapper also gives access to helper methods such as 
[stopPropagation()](http://ariatemplates.com/api/#aria.DomEvent:stopPropagation:method) or [preventDefault()](http://ariatemplates.com/api/#aria.DomEvent:preventDefault:method) inherited from the DomEvent class.

The `target` property of a DomEventWrapper is an instance of [aria.templates.DomElementWrapper](http://ariatemplates.com/api/#aria.templates.DomElementWrapper). Similarly to the DomEventWrapper, it acts as a cross-browser wrapper over the actual DOM element.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/domEvents/MainScript.js' defer></script>

For more information please refer to the API documentation of these objects: [aria.templates.DomEventWrapper](http://ariatemplates.com/api/#aria.templates.DomEventWrapper), [aria.DomEvent](http://ariatemplates.com/api/#aria.DomEvent) and [aria.templates.DomElementWrapper](http://ariatemplates.com/api/#aria.templates.DomElementWrapper).

## Advanced Features
### Events and Performance

Using DOM events is one of the easiest ways to handle user interaction in an Aria Templates application. Here are a few guidelines to keep in mind when using events.

* *Use event delegation*.  For performance and maintenance reasons you should avoid setting event listeners on plenty of elements inside a container and rather use one at container level.
* An obvious consequence of the first point is: *do not create events in loops*.
* *Use [DomElementWrappers](interactions_with_the_dom#dom-elements-wrappers) for light changes*.  If you need to update a CSS class, it is more efficient to using the dedicated methods rather than performing a refresh.

### Events outside of a template

You might want in some cases to attach events to elements outside of your template, like `<body>` for instance.  To do so, the [addListener() method](http://ariatemplates.com/api/#aria.utils.Event:addListener:method) of the [aria.utils.Event](http://ariatemplates.com/api/#aria.utils.Event) singleton provides a way bind an event handler to any DOM element.

{{Note|It is not recommended to use this approach for DOM elements inside a template. If you choose to do so, your application is likely to be less stable and leak memory.}}

## Examples

### Mouse events

* [Samples.Utilities.DOM Events.Simple Syntax](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Simple%20Syntax)

This first sample page contains various examples of mouse events, with several event types being used : click, mouseover, mouseleave.

* [Samples.Utilities.DOM Events.Mouse Events](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Mouse%20Events)

This sample is the first of a series of samples all based on a 1-9 keypad. In this first sample, we look at click events. The event handler is designed to be simple : a simple datamodel update followed by a refresh.

### Keyboard events
* [Samples.Utilities.DOM Events.Keyboard Events.Step 1](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Keyboard%20Events.Step%201)

This sample is based upon the keypad example used for the Mouse Event sample. The mouse selection is here replaced with a keyboard navigation using the arrows key. In this sample, the callback handler takes advantage of the [DomEventWrapper](http://ariatemplates.com/api/#aria.templates.DomEventWrapper) to retrieve the keyCode of the event. Then using the statics available on [DomEventWrapper](http://ariatemplates.com/api/#aria.templates.DomEventWrapper), we easily check if the event was triggered by on of the arrow keys or not. 

<syntaxhighlight lang="javascript">onCheckboxKeydown : function (evt, args) {
	/* ... */
	if (evt.keyCode == evt.KC_ARROW_DOWN) {
		// event triggered by arrow down, move selection down
	} else if (evt.keyCode == evt.KC_ARROW_UP) {
		// event triggered by arrow up, move selection up	
	} 
	/* ... */
}</syntaxhighlight>

### Form events
* [Samples.Utilities.DOM Events.Keyboard Events.Step 2](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Keyboard%20Events.Step%202)
Still based on the keypad example, this sample uses input events such as `{on change}`. As you can see in the template script, the change event is the rough DOM Event, therefore we have to take care of the browser specific behavior of the change event. On IE, we force a blur before we refresh, to trigger the change event to be fired.

* [Samples.Utilities.DOM Events.Keyboard Events.Step 3](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Keyboard%20Events.Step%203)
A listener on focus is added and is now responsible for updating the datamodel and trigger the refresh. Thanks to this new design, the selection updates automatically if the user navigates using the TAB key. The actual keyboard navigation now triggers a focus on the [DomElementWrapper](http://ariatemplates.com/api/#aria.templates.DomElementWrapper) target of the event.

### Event delegation
* [Samples.Utilities.DOM Events.Keyboard Events.Step 4](http://aria/aria-templates-dave/#spl=Samples.Utilities.DOM%20Events.Keyboard%20Events.Step%204)

This example is the exact same as the example 3, but the event handlers have been moved at the topmost element of the template. Before they were repeated in a loop. This allows to use only 3 events for the whole template, instead of 3 per box (27). This can have a pretty significant impact on performances. 

The downside is of course that we now have less information directly bound to the event callback. But it is easy enough to compensate for that. One of the first tools of event delegation is to check the tagName of the target, to know if the event was captured on a DOM element that interests us. Indeed, since the event is attached on a container element, it will be fired each time the container receives the event, either directly or by bubbling. Checking the tagName is the easiest way to make sure the event was fired on an element that interests us.

<syntaxhighlight lang="javascript">
if (domEl.tagName.toLowerCase() != "input") {
	return;
}</syntaxhighlight>

We also need to know what is the index of the clicked input. To retrieve this information dynamically in the callback, we will use *expandos*. *Expandos* are extra attributes that you can use on a DOM element inside your template. An expando is prefixed by an underscore, and can be retrieved using the [getExpando](http://ariatemplates.com/api/#aria.templates.DomElementWrapper:getExpando) method on a DomElementWrapper. Here we store the index of the item in `_index` and retrieve it using `getExpando("index")`.
<syntaxhighlight lang="xml"><input type="checkbox" _index="${i}" /></syntaxhighlight>
<syntaxhighlight lang="javascript">
var indexExpando = domEl.getExpando("index");
if (indexExpando) {
	return parseInt(indexExpando,10);
}</syntaxhighlight>

All this overhead has been mutualized in a single method and is used in each event callback of the template script. The rest of the implementation then remains strictly similar to the non-delegated version.
<syntaxhighlight lang="javascript">
__getTargetIndex : function (domEl) {
	if (domEl.tagName.toLowerCase() != "input") {
		return;
	}
	var indexExpando = domEl.getExpando("index");
	if (indexExpando) {
		return parseInt(indexExpando,10);
	}
}</syntaxhighlight>

Event delegation is always about striking a good balance between the amount of events and the amount of dynamic processing in the callback.

### Using aria.utils.Event
* [Samples.Utilities.DOM Events.Event singleton](http://aria/aria-templates/aria/guide/#spl=Samples.Utilities.DOM%20Events.Event%20singleton)

This sample is again based on the keypad example. This time, a keydown is attached on the document using the [aria.utils.Event:addListener](http://ariatemplates.com/api/#aria.utils.Event:addListener) utility method. We filter the numkeys and the matching 1-9 box is selected when the user presses one of those keys. 

<syntaxhighlight lang="javascript">aria.utils.Event.addListener(document, "keydown", this.__onBodyKeydown, this, true);</syntaxhighlight>

Note that in the destructor of the template script, the addListener is mirrored by a removeListener to avoid leaving unwanted events on the page.