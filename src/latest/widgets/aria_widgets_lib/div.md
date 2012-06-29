Title: Div


{{ReadyForReview}}
Div widget is a container for any content, and the main purpose of div widget is to create borders. Depending on the 'sclass' attribute value it will use different types of frame. Div widget is used inside other widgets (Dialog, tooltip) but can also be used in a template. 

<srcinclude tag="wgtDivAction" lang="AT" outdent="true">widgets/div/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [DivCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:DivCfg).

<sample sample="widgets/div" />

## Styling
You can easily change the style of div widget by setting sclass attribute to 'basic','errortip','list','dlg'.

<sample sample="widgets/div/styling" />

## Binding
Div widget allows to bind the tooltip property only.

For more information please read the article on [Widget Bindings](Widget_Bindings).

<sample sample="widgets/div/binding" />