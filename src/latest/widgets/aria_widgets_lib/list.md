Title: List


List widget is a container widget which can hold a list of selectable items. 

The simple way to add List widget to your application is as follows 
<srcinclude tag="wgtListSnippet1" lang="AT" outdent="true">widgets/list/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [ListCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:ListCfg).

<sample sample="widgets/list" />

==Styling==
List widget is highly configurable for instance you can change flowOrientation, decide whether to display code, value or both etc.
<srcinclude tag="wgtListSnippet2" lang="AT" outdent="true">widgets/list/Snippet.tpl</srcinclude>

<sample sample="widgets/list/styling" />

==Action==
List widget is an action widget meaning, a callback function can be called based on the user action on the List widget
<srcinclude tag="wgtListSnippet3" lang="AT" outdent="true">widgets/list/Snippet.tpl</srcinclude>

<sample sample="widgets/list/action" />

==Binding==
The following properties are bindable for List widget
* disabled
* selected
* items
* maxOptions
* multipleSelect
* selectedIndex
* selectedValues
* tooltip
For more information please read the article on [Widget Bindings](Widget_Bindings).
<srcinclude tag="wgtListSnippet4" lang="AT" outdent="true">widgets/list/Snippet.tpl</srcinclude>

<sample sample="widgets/list/binding" />