Title: Widget Bindings



All Aria Templates widgets can be automatically bound to properties contained inside your data model.

As soon as the bound link is done, refresh mechanism is automatic, and transparent for you. Moreover, the link is bidirectional. If you update the data model, your widget is going to be fully refreshed. If your widget is for example a textfield [`{@aria:TextField {}}`](textfield), and you then type something inside it, the data model associated property will contain the new value as soon as you leave the widget (blur event in our example with a Textfield widget)

## Bindable Property Syntax

Let's have a look at this template
<srcinclude lang="at" outdent="true">templates/widget_bindings/Template.tpl
</srcinclude>

As you can see, it only contains a [`{@aria:TextField {}}`](textfield_widget) widget. We are using the **bind** attribute of the widget itself.

## Bindable Property Sample

The following sample shows how to bind a TextField widget to a data model level defined variable.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/textfield/binding/' ></iframe>

## Transforms

The widget binding mechanism offers a powerful feature to enhance the way a value is fetched to and from the bound variable.

This feature is called **tranform**, which basically consists - as the name itself says - to transform a displayed/entered value after fetching it from the bound variable - for displaying purpouses - or before giving it back - alignment - to the variable bound the widget.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/textfield/transform/' ></iframe>