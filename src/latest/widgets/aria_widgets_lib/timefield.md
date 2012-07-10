Title: TimeField

{{Review}}

TimeField widget enables the creation of time input fields targeted at time formatted input, packed with specific formatting facilities to handle diverse time formats, as required by the locale and/or the application needs.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/timefield/Snippet.tpl?tag=wgtTimeField&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [TimeFieldCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TimeFieldCfg).

## Formatting patterns

A formatting pattern is a sequence of the following, a subset from the Java [specs](http://java.sun.com/j2se/1.4.2/docs/api/java/text/SimpleDateFormat.html)

* Separators: \;,.-/: and space
* Letters: H h m s

The difference between **H** and **h** is that the first is 0-24 while the latter 1-12 (am/pm).

### Default patterns

Some time patterns are defined at application level. There are currently two default formats:


* **shortFormat** (hh:mm)
* **fullFormat** (HH:mm:ss)

These formats can be accessed through `aria.core.AppEnvironment.getTimeFormats().shortFormat|longFormat`

Indeed, default time patterns at the application level can be overridden and/or extended as you need:


<div data-sample="hardcoded"><code><pre>
aria.core.AppEnvironment.setEnvironment({
  "timeFormats":{
    "shortFormat" : "hh-mm",
    "fullFormat"  : "hh-mm-ss"
   }
});
</code></pre></div>

Please keep in mind that "setEnvironment" will override all settings, use "updateEnvironment" to update one property.

## Sample usage

The following sample shows how to create and use a TextField widget, packed with number format patterns. In order to fetch the entered value, variable binding is to be considered as the preferred solution. Please refer to the [textfield](textfield) widget for more informations.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/timefield/?skip=1' ></iframe>