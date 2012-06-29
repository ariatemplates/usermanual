Title: Text


{{ReadyForReview}}
Text widget is a simple label widget containing only textual information.The width is optional on the text widget. If width is not set, then the contents of the text widget will not be ellipsed and the text widget will expand to the width of it's contents.

The simple way to add Text widget to your application is as follows 

<srcinclude tag="wgtTextSnippet1" lang="AT" outdent="true">widgets/text/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [TextCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TextCfg).

<sample sample="widgets/text" />

## Binding
The bindable properties of text widget are
* text
* tooltip

<srcinclude tag="wgtTextSnippet2" lang="AT" outdent="true">widgets/text/Snippet.tpl</srcinclude>

For more information please read the article on [Widget Bindings](Widget_Bindings).
<sample sample="widgets/text/binding" />