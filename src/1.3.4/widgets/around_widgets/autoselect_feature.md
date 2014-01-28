Title: Autoselect Feature


Input fields (date fields, text fields, etc.) must support automatic selection of content.
This means that when an input field is focused (with a single click or with keyboard navigation), its content gets automatically selected.

Automatic selection is not supposed to be the default and only behaviour for all input fields, application developers can specify if they want to enable it.
It is also possible to specify this behaviour for a whole application, by adding a new property in the application environment.

The following figure illustrates the Autoselect behaviour of input fields:

![Demo](../images/err001v2i0.png)

If the user clicks again in the field once the text is already selected, the selection disappears and the cursor position is set at the location where the click was actioned.


## Supported widgets

Any text input widget that extends the TextInput base class will provide the Autoselect feature through a configurable property called [autoselect](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TextInputCfg).

The following input widgets all currently support Autoselect:

- [Autocomplete](autocomplete)
- [Datefield](datefield)
- [Datepicker](datepicker)
- [Multiselect](multiselect)
- [Numberfield](numberfield)
- [Select](select)
- [Selectbox](selectbox)
- [Textfield](textfield)
- [Timefield](timefield)

## Setting Autoselect globally for all input widgets

Some widget properties are configurable globally for an application.
When a property is set on an application level then all widgets that contain this property will have the default value that is specified in the application.
It is also possible to override this application configuration for an individual widget, by setting its property within a template.

Here is an example of setting the autoselect property for a text input based widget:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/features/autoselect/Snippet.tpl?tag=widgetsettings&lang=at&outdent=true'></script>

## Setting Autoselect on a specific input widget

Here it can be overriden by setting the property on a widget level from within a template:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/features/autoselect/Snippet.tpl?tag=textfield&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/features/autoselect/' ></iframe>