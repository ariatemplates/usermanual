Title: Dialog


A dialog widget is a div based popup window that contains a title bar and a content area. The dialog widget can be dragged, resized and close with the X icon.If the content height exceeds the maximum height, a scroll bar will come automatically. An overlay can be turned on by setting modal attribute to true.

The simple way to add Dialog widget to the application is as follows
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogSimple&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [Dialog](http://ariatemplates.com/api/#aria.widgets.CfgBeans:DialogCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/dialog/?skip=1' ></iframe>

## Action
Dialog widgets are highly configurable, as user can define callback functions for onOpen and onClose events.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogAction&lang=at&outdent=true' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/dialog/action/?skip=1' ></iframe>

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

For more information please read the article on [widget_bindings](widget_bindings).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/dialog/binding/?skip=1' ></iframe>

## Movable dialog

To enable Drag & Drop on a Dialog widget it's enough to set the `movable` property to true

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogMove1&lang=at&outdent=true' defer></script>

It is possible to specify the desired proxy by setting the `movableProxy` configuration property:


* `Overlay`: a div the same size as the dialog, using a _xOverlay_ class (see above for comments on the style)

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogMove2&lang=at&outdent=true' defer></script>

* `CloneOverlay`: a clone of the dialog

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogMove3&lang=at&outdent=true' defer></script>

The Dialog can only be dragged from its title bar and its movements are constrained to viewport.

The syntax to add listeners on _dragstart_ and _dragend_ is as follow:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/Snippet.tpl?tag=wgtDialogMove4&lang=at&outdent=true' defer></script>

It is possible to set the `movable` and `movableProxy` default properties at application level:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/dialog/SnippetScript.js?tag=wgtDialogMove&lang=javascript&outdent=true' defer></script>

Here's a movable dialog example with code:

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/dialog/movable/?skip=1' ></iframe>