Title: ErrorList


{{ReadyForReview}}
ErrorList widget can be used to display list of errors (client-side or server-side / technical or functional). These errors and messages can be triggered via error management subsystem in Aria Template, which produces nested list of messages that can be displayed by the widget by binding. 

The simple way to add ErrorList widget to your application is as follows

<srcinclude tag="wgtErrorListSimple" lang="AT" outdent="true">widgets/errorlist/Snippet.tpl</srcinclude>

Also ErrorList widget is highly configurable, for instance you can filter the type of error (E,F,W etc..), binding the message and tooltip properties and lot more. The whole list of configuration parameters is available in [ErrorListCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:ErrorListCfg).

<sample sample="widgets/errorlist/standard" />

==Filter Types==
The following filter types are supported: 

:''TYPE_FATAL = "F" -- uses the error icon.
:''TYPE_ERROR = "E" -- uses the error icon.
:''TYPE_WARNING = "W" -- uses the warning icon.
:''TYPE_INFO = "I" -- uses the info icon.
:''TYPE_NOTYPE = "N" -- uses the info icon.
:''TYPE_CRITICAL_WARNING = "C" -- uses the warning icon.
:''TYPE_CONFIRMATION = "O" -- uses the confirmation icon.

<srcinclude tag="wgtErrorListFilter" lang="AT" outdent="true">widgets/errorlist/Snippet.tpl</srcinclude>

<sample sample="widgets/errorlist/filtering" />

==Binding==
ErrorList widget is also a bind-able widget and the properties bindable are
* message 
* tooltip

For more information please read the article on [Widget Bindings](Widget_Bindings).

<srcinclude tag="wgtErrorListBinding" lang="AT" outdent="true">widgets/errorlist/Snippet.tpl</srcinclude>

<sample sample="widgets/errorlist/binding" />

==Customizing the display==
The ErrorList widget is a based on a template to display its content. Therefore, it may be customized to fit several types of displays.

<srcinclude tag="wgtErrorListCustomized" lang="AT" outdent="true">widgets/errorlist/Snippet.tpl</srcinclude>

<sample sample="widgets/errorlist/custom" />