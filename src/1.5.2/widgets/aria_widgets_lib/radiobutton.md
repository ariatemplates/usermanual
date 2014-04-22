Title: RadioButton


RadioButton widget is similar to the checkbox widget exempt that the latter can be grouped.
If a radio button in a group is selected, then all the other radio buttons with in that group will get unselected.
RadioButton group can be set by binding the value property of the widget to a property in the data model and which ever radio button value bound to the same property will be with in the same group.
A radioButton widget can exists single, in that case it acts same as Checkbox widget.

The simple way to add radioButton widget to your application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet1&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:RadioButtonCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/radiobutton/' ></iframe>

## Styling

RadioButton widget labels can be aligned to _left_, _right_, _top_ and _bottom_ depending on the user requirement.
Also user can provide a css class via sclass property, determines which class defined in the skin is being used.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet2&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/radiobutton/styling/' ></iframe>

## Binding

RadioButton widget alike Checkbox widget is highly configurable and for instance you can bound the value of property like disabled, error, errorMessages etc to a property in the data model.

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:RadioButtonCfg).

For more information please read the article on [Widget bindings](widget_bindings).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet3&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/radiobutton/binding/' ></iframe>