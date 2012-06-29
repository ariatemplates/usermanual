Title: Autoselect Feature


Input fields (date fields, text fields, etc.) must support automatic selection of content. This means that when an input field is focused (with a single click or with keyboard navigation), its content gets automatically selected.

Automatic selection is not supposed to be the default and only behaviour for all input fields, application developers can specify if they want to enable it. It is also possible to specify this behaviour for a whole application, by adding a new property in the application environment.

The following figure illustrates the Autoselect behaviour of input fields:

<img src="images/ ERR001v2i0.png" />

If the user clicks again in the field once the text is already selected, the selection disappears and the cursor position is set at the location where the click was actioned.


## Supported widgets

Any text input widget that extends the TextInput base class will provide the Autoselect feature through a configurable property called [autoselect](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TextInputCfg).

The following input widgets all currently support Autoselect: 

:[AutoComplete](AutoComplete)
:[DateField](DateField)
:[DatePicker](DatePicker)
:[MultiSelect](MultiSelect)
:[NumberField](NumberField)
:[Select](Select)
:[SelectBox](SelectBox)
:[TextField](TextField)
:[TimeField](TimeField)

## Setting Autoselect globally for all input widgets

Some widget properties are configurable globally for an application.
When a property is set on an application level then all widgets that contain this property will have the default value that is specified in the application.  It is also possible to override this application configuration for an individual widget, by setting its property within a template.


Here is an example of setting the autoselect property for a text input based widget:

<srcinclude tag="widgetsettings" lang="AT" outdent="true">features/autoselect/Snippet.tpl</srcinclude>

## Setting Autoselect on a specific input widget

Here it can be overriden by setting the property on a widget level from within a template:

<srcinclude tag="textfield" lang="AT" outdent="true">features/autoselect/Snippet.tpl</srcinclude>

<sample sample="features/autoselect" />