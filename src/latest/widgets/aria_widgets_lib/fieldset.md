Title: Fieldset



Fieldset is a container widget and is mainly used for the following ones:

* Visual grouping of fields. Different styling being possible (background color, borders, label, positioning).
* Handling of default submit button for a set of fields.

Also, when focusing on the elements and pressing ENTER, it executes the onSubmit callback

The simple way to add Fieldset widget to your application is as follows

<srcinclude tag="wgtFieldsetSimple" lang="AT" outdent="true">widgets/fieldset/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [FieldsetCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:FieldsetCfg).

<sample sample="widgets/fieldset" />

==Nested Fieldset==
Fieldsets can be nested.

<srcinclude tag="wgtFieldsetNested" lang="AT" outdent="true">widgets/fieldset/Snippet.tpl</srcinclude>

<sample sample="widgets/fieldset/nested" />

==Action==
Fieldset is an action widget, meaning that it can call an onSubmit callback function called when the user presses ENTER in a field inside the fieldset.For instance, if an onSubmit callback is implemented on the root Fieldset, then all the nested fieldset bubbles to the root fieldset, provided that the child fieldset implemented onSubmit callback should return true.

<srcinclude tag="wgtFieldsetAction" lang="AT" outdent="true">widgets/fieldset/Snippet.tpl</srcinclude>

<sample sample="widgets/fieldset/action" />

==Binding==
For fieldset widget, the property bindable is tooltip and can be bound to a value in the datamodel.

For more information please read the article on [Widget Bindings](Widget_Bindings).

<srcinclude tag="wgtFieldsetBinding" lang="AT" outdent="true">widgets/fieldset/Snippet.tpl</srcinclude>

<sample sample="widgets/fieldset/binding" />