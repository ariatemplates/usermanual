Title: CheckBox


Checkbox widget provides easy way to add custom checkbox to the user application and can be in any one of the two states, either checked or unchecked. When the user click on the checkbox it toggles the state.

The simple way to add checkbox widget to your application is as follows

<srcinclude tag="wgtCheckboxSnippet1" lang="AT" outdent="true">widgets\checkbox\Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [CheckBoxCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:CheckBoxCfg).

<sample sample="widgets/checkbox" />

## Styling
Checkbox widget labels can be aligned to "left", "right" and "top" depending on the user requirement. Also user can provide a css class via sclass property.

<srcinclude tag="wgtCheckboxSnippet2" lang="AT" outdent="true">widgets\checkbox\Snippet.tpl</srcinclude>

<sample sample="widgets/checkbox/styling" />

## Binding
For more information please read the article on [Widget Bindings](Widget_Bindings).

<srcinclude tag="wgtCheckboxSnippet3" lang="AT" outdent="true">widgets\checkbox\Snippet.tpl</srcinclude>

The whole list of bindable parameters are available in [CheckBoxCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:CheckBoxCfg).

Here the checkbox is bound to two properties of the data model, the state of the checkbox changes based on 'isCheckMe' property in the data model. And the checkbox will be enable or disabled based on 'enableMe' property in the data model.

<sample sample="widgets/checkbox/binding" />