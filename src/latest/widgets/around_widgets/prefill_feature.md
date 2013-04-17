Title: Prefill Feature


The prefill feature makes form filling a lot easier, by prefilling inputs with values derived from either:

* bindings to other field values
* or, fields with an already known value when the page is loaded; for example a default value or a value that is sent from the server.

The prefilled values need to be explicitly confirmed, and it is also possible to change the appearance of an input to further illustrate that it is in a "prefill" state by setting the appropriate skin variables.


In the example shown below the "prefill" text is gray and when focus is given to a field displaying a prefill value the value is confirmed and the text becomes black.

![Prefil Animated Demo](../images/lay008v2i0.gif)

In this animation, when a user fills in the first segment for a trip, all the following segments are updated.
For example, when the date of the first segment is set, the date of all the following segments is set to the date of the first one.
Another automatically filled field is the origin of the second segment, which has the same value of the destination field of the first segment.

Note that, in the example, the pre-filled value of any unconfirmed date is the value of the first confirmed date before that line.
For example, if the user changes the date in the second line (not shown in the animation), the pre-filled date of the following lines changes and contains the date of the second line, and the value in the second line is confirmed.
If, after that, the date in the first line is changed by the user, the date in the second line will not change, as it is already confirmed.
If the user types something wrong in the first field, the other fields are not automatically pre-filled with that value.

## Supported widgets

Any text input widget that extends the TextInput base class will provide the Prefill feature through a bindable property called prefill.

The following input widgets all currently support Prefill:

- [Autocomplete](autocomplete)
- [Datefield](datefield)
- [Datepicker](datepicker)
- [Multiselect](multiselect)
- [Numberfield](numberfield)
- [Select](select)
- [Selectbox](selectbox)
- [Textfield](textfield)
- [Timefield](timefield)

## Usage

All `TextInput`-based widgets are endowed with a **`prefill`** state and a **`prefill`** bindable property. The `prefill` state is triggered by setting a value in the portion of the data model to which the prefill property is bound, on condition that the `value` of the widget is not set.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/features/prefill/Snippet.tpl?tag=textfield&lang=at&outdent=true'></script>

If `data.value2` is not set (`[]`, `""`, `null` or `undefined`), whenever the value `data.value1` is set (different from `[]`, `""`, `null` or `undefined`), the widget will be in `prefill` state and the displayed text will correspond to the value contained in `data.value1`.

When the widget is focused, it automatically exits the prefill state because the focus handler will update the `value` property, hence another state (`normalFocused`) will be triggered.

When both `data.value1` and `data.value2` are not set, then the widget is in `normal` state and a helptext is displayed if specified in the widget configuration.


## Validation and invalid values

### invalid values

Consider the following typical scenario:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/features/prefill/Snippet.tpl?tag=numberfield&lang=at&outdent=true'></script>

The value bound to the `prefill` for widgetA (`data.value1`) is also bound to the `value` property of widgetB. Typing an "incorrect" value in widgetB will not trigger the prefilling of widgetA. In particular, the following behaviour occurs:

* when the value fails native widget validation (for example the string "aaa" in the NumberField widgetB), then the value is not propagated to the data model, so that the prefill on widgetA will not be triggered. Whenever errors are reported in the validation process, widgetA will be automatically notified and will hence exit the prefill state.

### Prefill validation

No validation is performed on the prefill value. If for some reason the prefill of NumberField ends up being a string like "aaa", then no error is raised. The validation occurs, for example, when focusing on the field.

### Widget-specific behaviours

It is important to remark that the prefill behaviour is slightly different depending on the widget. In particular:

* `SelectBox`: the prefill will not be displayed if the value does not belong to the `options` available to the widget.
* `MultiSelect`: the items that do not belong to the `items` available will not be displayed in the list of selected values.
* `AutoComplete`: the prefill value will be displayed only if it corresponds to one of the suggestions recognized by the resource handler.
* `TimeField`, `DateField`, `DatePicker`: the date/time pattern of the prefill is the same as the one specified in the widget configuration. It is not possible to specify a different pattern for the prefill value.


## Confirmation

When a widget is in prefill state it is possible to confirm the displayed value either by focusing on the field or by explicitly setting the portion of the data model to which its `value` property is bound. Considering the example

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/features/prefill/Snippet.tpl?tag=textfield&lang=at&outdent=true'></script>

it is possible to confirm a prefill value by

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/features/SomeClass.js?tag=json&lang=js&outdent=true'></script>

in a script (or module controller).

Once the state is confirmed, changing `data.value1` will not have any impact on the widget, until `data.value2` is not set to `""`.

## Skinning the prefill state

Like any other state, the `prefill` state can be skinned by setting the desired variables in the `*.properties` file:

    aria.templates.TextInput.std.states.prefill.color=gray
    aria.templates.SelectBox.std.states.prefill.color=gray
    aria.templates.DatePicker.std.states.prefill.color=gray
    aria.templates.MultiSelect.std.states.prefill.color=gray
    aria.templates.AutoComplete.std.states.prefill.color=gray

## Examples

In this sample it is possible to find some examples of the above-mentioned features including all `TextInput`-based widgets.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/features/prefill/basic/' ></iframe>

In this sample it is possible to find an example that realizes one of the scenarios that triggered the implementation of this feature.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/features/prefill/usecase/' ></iframe>
