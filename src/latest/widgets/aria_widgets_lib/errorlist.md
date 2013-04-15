Title: ErrorList
Category: Widgets

ErrorList widget can be used to display list of errors (client-side or server-side / technical or functional). These errors and messages can be triggered via error management subsystem in Aria Template, which produces nested list of messages that can be displayed by the widget by binding.

The simple way to add ErrorList widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListSimple&lang=at&outdent=true'></script>

Also ErrorList widget is highly configurable, for instance you can filter the type of error (E,F,W etc..), binding the message and tooltip properties and lot more. The whole list of configuration parameters is available in [ErrorListCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:ErrorListCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/errorlist/standard/' ></iframe>

## Filter Types

The following filter types are supported:

* _TYPE\_FATAL_  **F** -- uses the error icon.
* _TYPE\_ERROR_ **E** -- uses the error icon.
* _TYPE\_WARNING_ **W** -- uses the warning icon.
* _TYPE\_INFO_ **I** -- uses the info icon.
* _TYPE\_NOTYPE_ **N** -- uses the info icon.
* _TYPE\_CRITICAL\_WARNING_ **C** -- uses the warning icon.
* _TYPE\_CONFIRMATION_ **O** -- uses the confirmation icon.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListFilter&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/errorlist/filtering/' ></iframe>

## Binding

ErrorList widget is also a bind-able widget and the properties bindable are:

* message
* tooltip

For more information please read the article on [Widget bindings](widget_bindings).

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListBinding&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/errorlist/binding/' ></iframe>

## Customizing the display

The ErrorList widget is a based on a template to display its content.
Therefore, it may be customized to fit several types of displays.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListCustomized&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/errorlist/custom/' ></iframe>
