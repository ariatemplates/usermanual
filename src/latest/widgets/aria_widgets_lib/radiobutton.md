Title: RadioButton



{{ReadyForReview}}

RadioButton widget is similar to the checkbox widget exempt that the latter can be grouped. If a radio button in a group is selected, then all the other radio buttons with in that group will get unselected. RadioButton group can be set by binding the value property of the widget to a property in the data model and which ever radio button value bound to the same property will be with in the same group.A radioButton widget can exists single, in that case it acts same as Checkbox widget.

The simple way to add radioButton widget to your application is as follows

<srcinclude tag="wgtRadioButtonSnippet1" lang="AT" outdent="true">widgets/radiobutton/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:RadioButtonCfg).

<sample sample="widgets/radiobutton" />

==Styling==
RadioButton widget labels can be aligned to "left", "right", "top" and "bottom" depending on the user requirement. Also user can provide a css class via sclass property, determines which class defined in the skin is being used.

<srcinclude tag="wgtRadioButtonSnippet2" lang="AT" outdent="true">widgets/radiobutton/Snippet.tpl</srcinclude>

<sample sample="widgets/radiobutton/styling" />

==Binding==
RadioButton widget alike Checkbox widget is highly configurable and for instance you can bound the value of property like disabled,error,errorMessages etc to a property in the data model. 

The whole list of configuration parameters is available in [RadioButtonCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:RadioButtonCfg).

For more information please read the article on [Widget Bindings](Widget_Bindings).

<srcinclude tag="wgtRadioButtonSnippet3" lang="AT" outdent="true">widgets/radiobutton/Snippet.tpl</srcinclude>

<sample sample="widgets/radiobutton/binding" />