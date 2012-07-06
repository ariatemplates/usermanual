Title: CheckBox


Checkbox widget provides easy way to add custom checkbox to the user application and can be in any one of the two states, either checked or unchecked. When the user click on the checkbox it toggles the state.

The simple way to add checkbox widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/checkbox/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [CheckBoxCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:CheckBoxCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/checkbox/' />

## Styling
Checkbox widget labels can be aligned to "left", "right" and "top" depending on the user requirement. Also user can provide a css class via sclass property.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/checkbox/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/checkbox/styling/' />

## Binding
For more information please read the article on [widget bindings](widget_bindings).

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/checkbox/Snippet.tpl' defer></script>

The whole list of bindable parameters are available in [CheckBoxCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:CheckBoxCfg).

Here the checkbox is bound to two properties of the data model, the state of the checkbox changes based on 'isCheckMe' property in the data model. And the checkbox will be enable or disabled based on 'enableMe' property in the data model.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/checkbox/binding/' />