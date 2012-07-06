Title: Localization and Resources



## Localization and Internationalization

Localization and internazionalization is a powerful feature to write applications that adapts to different languages and settings based on country and/or regional differences of target market.

### Internationalization aka i18n

Internationalization, meant as a way to develop applications that can be easily adapted to different languages, is achieved by means of Resources files that specify a format to produce a common structure translated in as many languages as you wish to offer to users.

There are currently available two kind of resources that can be defined and/or used inside an Aria Templates application.

* *Static resources*
* *Dynamic resources* (through Resource Providers) - _Currently under development. More documentation to be provided soon._

#### Static resources

Static resources can be defined inside plain JavaScript files using the *[Aria.resourcesDefinition](http://ariatemplates.com/api/#Aria:resourcesDefinition:method)* facility. They are usually physically stored as files on the back-end Web Server delivering your AT application, thus accessible through the HTTP(S) protocol.

You can then localize a resource file creating different versions of the file and appending the locale to the end of each resource definition JavaScript file.

An example of a resource definition is the following:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/18n/statics/Res.js' defer></script>

##### Conventions to be used

Resources should be defined by following a standard scheme to be properly accessible from your code:

  `classpath.panelId.resType.resId`

Here's an explanation of each scheme component and accepted values:

* `classpath` - the classpath of the resourcesDefinition entity
* `panelId` - the id of the panel where the resource is used or `common` if it is used in several panels
* `resType` - the type of the resource, which can be one of the following values:
	* `label` - static text resource without any HTML markup
	* `alt` - alternate text for DOM elements (mainly images)
	* `content` - text resource which may contain safe HTML markup (no CSS, no Scripts)
	* `link` - relative or absolute path to a resource 
	* `pattern` - pattern resource (e.g. date format, number format ...)
* `resId` - a free text which has to be descriptive

##### How to use Static Resources

###### Inside Templates

You must first declare the classpath of the resources to use with the `$res` parameter of the Template statement. Then, localized resources are made available through the `res` variable, which can be seen be seen as an alias to the automatically loaded resource classpath.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/localization/statics/LocalizedTemplate.tpl' defer></script>

Of course, you can use an intermediate variable, like `label` here, to make the references to localized resources less verbose.

###### Inside Template Scripts

Here is the script associated to the previous template, which displays a message, using localized resources.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/18n/statics/LocalizedTemplateScript.js' defer></script>

As the class generated from a template inherits from its script, localized resources are also available from the template script, through `this.res`.

### Localization aka l10n

Localization, meant as the process of adapting an internationalized application to a specific region or language, is achieved with application wide settings that can be changed anytime during applications's life cycle.

All locale specific parameters can be configured through the [aria.core.AppEnvironment](http://ariatemplates.com/api/#aria.core.AppEnvironment).

The framework allows you to configure:
* Language of static resources
* Number and currency format settings
* Date and Time format settings

#### Language

Language and region are used to load a particular version of [#static-resources](#static-resources). The language identifier follows the [IETF language tag](http://en.wikipedia.org/wiki/IETF_language_tag) standards but only allows to specify a _primary language subtag_ and one _extended language subtag_, e.g _en-US_.
  [aria.core.environment.Environment.setLanguage(locale, afterChangeCB)](http://ariatemplates.com/api/#aria.core.environment.Environment:setLanguage:method)
  [aria.core.environment.Environment.getLanguage()](http://ariatemplates.com/api/#aria.core.environment.Environment:getLanguage:method)

More information are available on [Environment Base Configuration Bean](http://ariatemplates.com/api/#aria.core.environment.EnvironmentBaseCfgBeans).

While changing the locale is quite easy, at least a full application templates refresh could be required to make the changes effective. For this pourpose the first method accept a callback parameter - i.e. a method/function - that should contain all the necessary code to achieve the afore mentioned goal.

##### Resources organization

Definition and structure are better defined in the following section. Here we simply highlight how to organize your translated resource files. A potential structure, could be for instance the following, with translations in five languages:

  $appRoot/res/SampleRes.js //default language, if no app wide locale is specified
  $appRoot/res/SampleRes_en_US.js
  $appRoot/res/SampleRes_sv_SE.js
  $appRoot/res/SampleRes_fr_FR.js
  $appRoot/res/SampleRes_sv_SE.js
  $appRoot/res/SampleRes_pl_PL.js

*The framework will automatically try to download the proper resource file based on the locale setting defined through the `AppEnvinroment.setLanguage` method call.*

Please note how the first resource is indeed the base resource name to be referenced inside your classes, modules and/or templates. While keeping this name you should then append the proper locale code according to the language contained in each resource file.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/i18n/' />

#### Number and currency

Aria Templates provides a [Number](http://ariatemplates.com/api/#aria.utils.Number) utility to interpret numbers and format them according to a user defined pattern and locale.

Application's parameters are defined in [Number Configuration Bean](http://ariatemplates.com/api/#aria.utils.environment.NumberCfgBeans) and can be modified through the AppEnvironment.

<div data-sample="missing">Snippet on how to modify the appenvironment</div>

By default numbers are interpreted with en_US conventions:
* " . " a dot for decimal separator.
* " , " a comma for group (thousand) separator.

<div data-sample="missing">Numberfield with different patterns and separators</div>

The option *strictGrouping* allows to enforce or not the match between the number patterna and what the user typed.

When _strictGrouping_ is enabled, the following rules apply:
 Pattern : #,###
 1,000 is valid
 1,00 is invalid

 Pattern : #,##
 1,000 is invalid
 1,00 is valid

disabling _strictGrouping_ no check will be done on the input pattern, the grouping separator is simply ignored
 Pattern : #,###
 1,000 is valid : 1000 (one thousand)
 1,00 is *valid* : 100 (one hundred)

 Pattern : #,##
 1,000 is *valid* : 1000 (one thousand)
 1,00 is valid : 100 (one hundred)
 
_strictGrouping_ might be useful for languages such as

* Chinese/Japanese : the grouping separator might be used as a 10-thousands separator
 10,0000  (100 thousands)
* Hindi : the first grouping separator (from the rightmost character) is used for thousands and then for hundreds
 10,00,000 (1 million)

The separator can be only a single character, non digit. Conventions such as the ones used in the following countries are *not* supported:

* Croatia : thousands separator alternates dots and commas
 1.000,000 (1 million)
* Mexico : comma for thousand, apostrophe for million
 1'000,000 (1 million)

The formatting patterns to specify how a number should be conventionally displayed or interpreted, even as a currency. It can be defined as a combination of the following:

{| style="width:100%"
|-
! align="left" style="border-bottom: 1px solid black" | Symbol
! align="left" style="border-bottom: 1px solid black" | Location
! align="left" style="border-bottom: 1px solid black" | Meaning
|-
| 0
| Number
| Digit
|-
| #
| Number
| Digit, zero shows as absent
|-
| .
| Number
| Decimal separator
|-
| ,
| Integer
| Grouping separator
|-
| ¤ (\u00A4)
| Prefix or suffix
| Currency sign, replaced by currency symbol.
|}

The supported patterns are a subset of the [java.text.DecimalFormat](http://download.oracle.com/javase/1.4.2/docs/api/java/text/DecimalFormat.html) specs.



#### Date and Time

[Date Configuration Bean](http://ariatemplates.com/api/#aria.utils.environment.DateCfgBeans) defines the application's environment for date and time formatting.

* Accepted date separators : `/ - .` and space.
* Accepted time separators : `\;,.-/:` and space.
* Accepted formatters : `d M y E` for date and `h m s` for time.
Accepted formatters are a subset of the [Java patterns](http://java.sun.com/j2se/1.4.2/docs/api/java/text/SimpleDateFormat.html).

Some date patterns are defined at application level :
 shortFormat, longFormat, mediumFormat and fullFormat.
Default values for these patterns are :
* shortFormat: "d/M/y"
* mediumFormat: "d MMM y"
* longFormat: "d MMMM yyyy"
* fullFormat: "EEEE d MMMM yyyy"

These patterns can be accessed through `aria.utils.environment.Date.getDateFormats()`

Similarly some time patterns are also defined at application level.  There are currently two :
 shortFormat and fullFormat.
Default values for these patterns are :
* shortFormat: "HH:mm"
* fullFormat: "HH:mm:ss"

These patterns can be accessed through `aria.utils.environment.Date.getTimeFormats()`

Supported patterns are similar to [Java patterns](http://java.sun.com/j2se/1.4.2/docs/api/java/text/SimpleDateFormat.html).

##### Example:

 `dd MMM yyyy` will display <strong>02 Feb 2010</strong> for date 02/02/2010.
 
 `hh:mm` will display <strong>09:00</strong> for 9.00

On top of Java-like patterns, it is possible to use the IATA format replacing the month format character with 'I'. For example: 

 `*Udd*I*yy*`   will display <strong>02 Feb 10</strong> for date 02/02/2010.
 or
 `*Udd*I*yyyy*`   will display <strong>02 Feb 2010</strong> for date 02/02/2010.

In this case, the English version of the month will be displayed in the format specified regardless of the localization settings (IATA format corresponds to 3 capital letter untranslated month name).

<div data-sample="missing">Snippet on how to modify the appenvironment</div>

The format for date and time can be either a String or a Function. This 

When setting formats at the application level it is possible to specify the format as a string or as a function. This will provide usecases where the format needs to be generated dynamically.

<div data-sample="missing">Anything, including something with a function in the format.</div>