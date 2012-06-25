Title: Dialog


A dialog widget is a div based popup window that contains a title bar and a content area. The dialog widget can be dragged, resized and close with the X icon.If the content height exceeds the maximum height, a scroll bar will come automatically. An overlay can be turned on by setting modal attribute to true.

The simple way to add Dialog widget to the application is as follows
<srcinclude tag="wgtDialogSimple" lang="AT" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [Dialog](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:DialogCfg).

<sample sample="widgets/dialog" />

==Action==
Dialog widgets are highly configurable, as user can define callback functions for onOpen and onClose events.

<srcinclude tag="wgtDialogAction" lang="AT" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

<sample sample="widgets/dialog/action" />

==Binding==
The properties bindable for dialog widget are
* contentMacro
* title
* tooltip
* visible
* xpos
* ypos
* center 

If center is set to true, it will have precedence over xpos and ypos, which will be updated according to the actual position of the dialog. 

For more information please read the article on [Widget Bindings](Widget_Bindings).

<sample sample="widgets/dialog/binding" />

# Movable dialog

To enable Drag & Drop on a Dialog widget it's enough to set the <code>movable</code> property to true

<srcinclude tag="wgtDialogMove1" lang="at" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

It is possible to specify the desired proxy by setting the <code>movableProxy</code> configuration property:

* <code>Overlay</code>: a div the same size as the dialog, using a _xOverlay_ class (see above for comments on the style)

<srcinclude tag="wgtDialogMove2" lang="at" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

* <code>CloneOverlay</code>: a clone of the dialog

<srcinclude tag="wgtDialogMove3" lang="at" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

The Dialog can only be dragged from its title bar and its movements are constrained to viewport.

The syntax to add listeners on _dragstart_ and _dragend_ is as follow:

<srcinclude tag="wgtDialogMove4" lang="at" outdent="true">widgets/dialog/Snippet.tpl</srcinclude>

It is possible to set the <code>movable</code> and <code>movableProxy</code> default properties at application level:

<srcinclude tag="wgtDialogMove" lang="javascript" outdent="true">widgets/dialog/SnippetScript.js</srcinclude>

Here's a movable dialog example with code:
<sample sample="widgets/dialog/movable" />