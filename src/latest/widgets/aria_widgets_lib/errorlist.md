Title: ErrorList


{{ReadyForReview}}
ErrorList widget can be used to display list of errors (client-side or server-side / technical or functional). These errors and messages can be triggered via error management subsystem in Aria Template, which produces nested list of messages that can be displayed by the widget by binding. 

The simple way to add ErrorList widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListSimple&lang=at&outdent=true'></script>

Also ErrorList widget is highly configurable, for instance you can filter the type of error (E,F,W etc..), binding the message and tooltip properties and lot more. The whole list of configuration parameters is available in [ErrorListCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:ErrorListCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/errorlist/standard/?skip=1' ></iframe>

## Filter Types
The following filter types are supported: 

:''TYPE_FATAL = "F" -- uses the error icon.
:''TYPE_ERROR = "E" -- uses the error icon.
:''TYPE_WARNING = "W" -- uses the warning icon.
:''TYPE_INFO = "I" -- uses the info icon.
:''TYPE_NOTYPE = "N" -- uses the info icon.
:''TYPE_CRITICAL_WARNING = "C" -- uses the warning icon.
:''TYPE_CONFIRMATION = "O" -- uses the confirmation icon.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListFilter&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/errorlist/filtering/?skip=1' ></iframe>

## Binding
ErrorList widget is also a bind-able widget and the properties bindable are
* message 
* tooltip

For more information please read the article on [widget_bindings](widget_bindings).

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListBinding&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/errorlist/binding/?skip=1' ></iframe>

## Customizing the display
The ErrorList widget is a based on a template to display its content. Therefore, it may be customized to fit several types of displays.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/errorlist/Snippet.tpl?tag=wgtErrorListCustomized&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/errorlist/custom/?skip=1' ></iframe>