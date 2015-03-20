Title: TimeField

TimeField widget enables the creation of time input fields targeted at time formatted input, packed with specific formatting facilities to handle diverse time formats, as required by the locale and/or the application needs.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/timefield/Snippet.tpl?tag=wgtTimeField&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [TimeFieldCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TimeFieldCfg).

## Formatting patterns

A formatting pattern is a sequence of the following, a subset from the Java [specs](http://java.sun.com/j2se/1.4.2/docs/api/java/text/SimpleDateFormat.html)

* Separators: \;,.-/: and space
* L Letters: H h m s

  The difference between **H** and **h** is that the first is 0-24 while the latter 1-12 (am/pm).


### Default patterns

Some time patterns are defined at application level. There are currently two default formats:

* **shortFormat** (hh:mm)
* **fullFormat** (HH:mm:ss)

These formats can be accessed through `aria.core.AppEnvironment.getTimeFormats().shortFormat|longFormat`

Indeed, default time patterns at the application level can be overridden and/or extended as you need:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/environment/bootstrap.js?tag=timeFormatEnv&lang=javascript&noheader=true'></script>


Please keep in mind that "setEnvironment" will override all settings, use "updateEnvironment" to update one property.

## Error messages customization

Please refer to the main article concerning default [error messages customization](error_messages_customization).

Here is the list of error messages that can be customized, with for each: 

- the key to be used in the configuration map
- its description
- its hard-coded default value

Messages: 

- validation
  - key: `validation`
  - description: for wrong input's value format, resulting in the impossibility to interpret it for the widget's value
  - default hard-coded: `"Please enter a valid time format, for example: 1000 or 10:00"`

## Sample usage

The following sample shows how to create and use a TextField widget, packed with number format patterns.
In order to fetch the entered value, variable binding is to be considered as the preferred solution.
Please refer to the [textfield](textfield) widget for more informations.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/timefield/' ></iframe>
