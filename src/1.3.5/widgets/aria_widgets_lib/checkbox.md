Title: CheckBox
Category: Widgets

Checkbox widget provides easy way to add custom checkbox to the user application and can be in any one of the two states, either checked or unchecked. When the user click on the checkbox it toggles the state.

The simple way to add checkbox widget to your application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/checkbox/Snippet.tpl?tag=wgtCheckboxSnippet1&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [CheckBoxCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:CheckBoxCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/checkbox/' ></iframe>

## Styling
Checkbox widget labels can be aligned to "left", "right" and "top" depending on the user requirement. Also user can provide a css class via sclass property.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/checkbox/Snippet.tpl?tag=wgtCheckboxSnippet2&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/checkbox/styling/' ></iframe>

## Binding
For more information please read the article on [widget_bindings](widget_bindings).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/checkbox/Snippet.tpl?tag=wgtCheckboxSnippet3&lang=at&outdent=true'></script>

The whole list of bindable parameters are available in [CheckBoxCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:CheckBoxCfg).

Here the checkbox is bound to two properties of the data model, the state of the checkbox changes based on 'isCheckMe' property in the data model. And the checkbox will be enable or disabled based on 'enableMe' property in the data model.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/checkbox/binding/' ></iframe>