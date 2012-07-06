Title: Dialog


A dialog widget is a div based popup window that contains a title bar and a content area. The dialog widget can be dragged, resized and close with the X icon.If the content height exceeds the maximum height, a scroll bar will come automatically. An overlay can be turned on by setting modal attribute to true.

The simple way to add Dialog widget to the application is as follows
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [Dialog](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DialogCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/dialog/' />

## Action
Dialog widgets are highly configurable, as user can define callback functions for onOpen and onClose events.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/dialog/action/' />

## Binding
The properties bindable for dialog widget are
* contentMacro
* title
* tooltip
* visible
* xpos
* ypos
* center 

If center is set to true, it will have precedence over xpos and ypos, which will be updated according to the actual position of the dialog. 

For more information please read the article on [widget bindings](widget_bindings).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/dialog/binding/' />

## Movable dialog

To enable Drag & Drop on a Dialog widget it's enough to set the `movable` property to true

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

It is possible to specify the desired proxy by setting the `movableProxy` configuration property:

* `Overlay`: a div the same size as the dialog, using a _xOverlay_ class (see above for comments on the style)

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

* `CloneOverlay`: a clone of the dialog

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

The Dialog can only be dragged from its title bar and its movements are constrained to viewport.

The syntax to add listeners on _dragstart_ and _dragend_ is as follow:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/Snippet.tpl' defer></script>

It is possible to set the `movable` and `movableProxy` default properties at application level:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/dialog/SnippetScript.js' defer></script>

Here's a movable dialog example with code:
<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/dialog/movable/' />