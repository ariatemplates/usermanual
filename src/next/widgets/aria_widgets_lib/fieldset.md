Title: Fieldset


Fieldset is a container widget and is mainly used for the following ones:

* Visual grouping of fields. Different styling being possible (background color, borders, label, positioning).
* Handling of default submit button for a set of fields.

Also, when focusing on the elements and pressing ENTER, it executes the onSubmit callback

The simple way to add Fieldset widget to your application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/fieldset/Snippet.tpl?tag=wgtFieldsetSimple&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [FieldsetCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:FieldsetCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/fieldset/' ></iframe>

## Nested Fieldset

Fieldsets can be nested.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/fieldset/Snippet.tpl?tag=wgtFieldsetNested&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/fieldset/nested/' ></iframe>

## Action

Fieldset is an action widget, meaning that it can call an onSubmit callback function called when the user presses `ENTER` in a field inside the fieldset.
For instance, if an `onSubmit()` callback is implemented on the root Fieldset, then all the nested fieldset bubbles to the root fieldset, provided that the child fieldset implemented onSubmit callback should return true.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/fieldset/Snippet.tpl?tag=wgtFieldsetAction&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/fieldset/action/' ></iframe>

## Binding

For fieldset widget, the property bindable is tooltip and can be bound to a value in the datamodel.

For more information please read the article on [Widget bindings](widget_bindings).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/fieldset/Snippet.tpl?tag=wgtFieldsetBinding&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/fieldset/binding/' ></iframe>