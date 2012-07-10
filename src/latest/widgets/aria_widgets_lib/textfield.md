Title: TextField


TextField widget enables the creation of input text fields that function like traditional HTML form input fields whose content can be retrieved and used inside the application. In the following code snippet the binding mechanism is used to access the content of a TextField widget, indeed you could also put in place a onChange event listener to catch user triggered value changes.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/textfield/Snippet.tpl?tag=wgtTextField&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [TextFieldCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TextFieldCfg).

## Bindings

The most widely used - and recommended - way to access the value of a TextField widget is to bind a variable - usually defined in the data model - to its value property. Indeed binding can occur even on others widget properties, for instance the widget label property. For more information please read the article on [widget bindings](widget_bindings).

In the following example the data model is indeed a local data model, local to the template itself, so changes are not persistent and a full data model refresh occurs at every template reload. Please note that the recommended way to build an application is indeed designing and defining a proper data model representing your application level or module level contextualized data structures.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/textfield/binding/?skip=1' ></iframe>