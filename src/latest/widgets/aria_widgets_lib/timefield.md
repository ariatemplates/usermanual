Title: TimeField

{{Review}}

TimeField widget enables the creation of time input fields targeted at time formatted input, packed with specific formatting facilities to handle diverse time formats, as required by the locale and/or the application needs.

<srcinclude tag="wgtTimeField" lang="AT" outdent="true">widgets/timefield/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [TimeFieldCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TimeFieldCfg).

## Formatting patterns

A formatting pattern is a sequence of the following, a subset from the Java [specs](http://java.sun.com/j2se/1.4.2/docs/api/java/text/SimpleDateFormat.html)

* Separators: \;,.-/: and space
* Letters: H h m s

The difference between *H* and *h* is that the first is 0-24 while the latter 1-12 (am/pm).

### Default patterns

Some time patterns are defined at application level. There are currently two default formats:

* *shortFormat* (hh:mm)
* *fullFormat* (HH:mm:ss)

These formats can be accessed through <code>aria.core.AppEnvironment.getTimeFormats().shortFormat|longFormat</code>

Indeed, default time patterns at the application level can be overridden and/or extended as you need:

<syntaxhighlight lang="JavaScript">
aria.core.AppEnvironment.setEnvironment({
  "timeFormats":{
    "shortFormat" : "hh-mm",
    "fullFormat"  : "hh-mm-ss"
   }
});
</syntaxhighlight>

Please keep in mind that "setEnvironment" will override all settings, use "updateEnvironment" to update one property.

## Sample usage

The following sample shows how to create and use a TextField widget, packed with number format patterns. In order to fetch the entered value, variable binding is to be considered as the preferred solution. Please refer to the [TextField](TextField) widget for more informations.

<sample sample="widgets/timefield" />