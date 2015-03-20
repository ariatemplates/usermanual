Title: Error messages customization



It is possible to customize the error messages that are displayed upon validation of a widget's input field's content.

There are two levels of customization, from the most specific (highest priority) to the least specific (lowest priority): 

- per instance of the widget
- globally

If you don't customize the messages, an hard-coded default value will be used.

To wrap-up this gives the following resolution order: 

1. widget's configuration
2. global configuration
3. widget's hard-coded value

Now, let's see how you can customize the messages in practice.

## Locally (per widget instance)

Each widget for which its default error messages can be customized will accept a specific property in its configuration object: `defaultErrorMessages`.

This property holds an object used as a map of messages. Each message has been given a key which can be specified in this map. The actual set of messages and their names is specific to each widget.

This property can be set statically:
 
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/DefaultErrorMessages.tpl?tag=static&lang=at&outdent=true'></script>

or it can be bound: 

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/DefaultErrorMessages.tpl?tag=bound&lang=at&outdent=true'></script>

considering there is a data model set as: 

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/DefaultErrorMessagesScript.js?tag=datamodel&lang=at&outdent=true'></script>

## Globally

### Where?

The global configuration is held in the __application environment__.

The application environment is managed by the specific class [`aria.core.AppEnvironment`](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.AppEnvironment) which provides generic methods to alter the configuration.

In practice there is one important method, with one important parameter: [`setEnvironment`](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.AppEnvironment:setEnvironment:method), whose third parameter tells whether the configuration provided as argument should override the whole configuration or not. Please see the API documentation page for reference.

### How?

What you need to know then is the sequence of keys you need to specify for this configuration store.

First, since this is related to widgets' settings, the root key in this store is `widgetSettings`. Then, as you want to customize the default error messages, the sub-key is `defaultErrorMessages`, as for the property in widgets' local configuration.

This key holds an object used as a map between widgets and default error messages. Therefore the first level of keys will correspond to the names of the widgets for which error message can be customized. For instance: `DateField`.

Finally, the value associated to each widget will correspond exactly to what the specific widget's configuration can accept for its default error messages customization.

Here's an example to make it clearer: 

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/DefaultErrorMessagesScript.js?tag=global&lang=at&outdent=true'></script>

Note the last argument set to `true`, which indicates to do a recursive update of the objects instead of replacing the whole `widgetSettings` property's value with the provided argument (thus erasing all other related configurations).
