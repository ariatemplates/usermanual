Title: RadioButton



{{ReadyForReview}}

RadioButton widget is similar to the checkbox widget exempt that the latter can be grouped. If a radio button in a group is selected, then all the other radio buttons with in that group will get unselected. RadioButton group can be set by binding the value property of the widget to a property in the data model and which ever radio button value bound to the same property will be with in the same group.A radioButton widget can exists single, in that case it acts same as Checkbox widget.

The simple way to add radioButton widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet1&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:RadioButtonCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/radiobutton/?skip=1' ></iframe>

## Styling
RadioButton widget labels can be aligned to "left", "right", "top" and "bottom" depending on the user requirement. Also user can provide a css class via sclass property, determines which class defined in the skin is being used.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet2&lang=at&outdent=true' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/radiobutton/styling/?skip=1' ></iframe>

## Binding
RadioButton widget alike Checkbox widget is highly configurable and for instance you can bound the value of property like disabled,error,errorMessages etc to a property in the data model. 

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:RadioButtonCfg).

For more information please read the article on [widget bindings](widget_bindings).

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/radiobutton/Snippet.tpl?tag=wgtRadioButtonSnippet3&lang=at&outdent=true' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/radiobutton/binding/?skip=1' ></iframe>