Title: Fieldset



Fieldset is a container widget and is mainly used for the following ones:

* Visual grouping of fields. Different styling being possible (background color, borders, label, positioning).
* Handling of default submit button for a set of fields.

Also, when focusing on the elements and pressing ENTER, it executes the onSubmit callback

The simple way to add Fieldset widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/fieldset/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [FieldsetCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:FieldsetCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/fieldset/' />

## Nested Fieldset
Fieldsets can be nested.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/fieldset/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/fieldset/nested/' />

## Action
Fieldset is an action widget, meaning that it can call an onSubmit callback function called when the user presses ENTER in a field inside the fieldset.For instance, if an onSubmit callback is implemented on the root Fieldset, then all the nested fieldset bubbles to the root fieldset, provided that the child fieldset implemented onSubmit callback should return true.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/fieldset/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/fieldset/action/' />

## Binding
For fieldset widget, the property bindable is tooltip and can be bound to a value in the datamodel.

For more information please read the article on [widget bindings](widget_bindings).

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/fieldset/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/fieldset/binding/' />