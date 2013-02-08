Title: NumberField
Category: Widgets


NumberField widget enables the creation of input fields that should contain a numeric value. It also provides formatting facilities to handle numeric and currency patterns.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/numberfield/Snippet.tpl?tag=wgtNumberField&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [NumberFieldCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:NumberFieldCfg).

## Formatting patterns

You can use formatting patterns to specify how a number should be conventionally displayed, even as a currency. It can be defined as a combination of the following:

<table style="width:100%; text-align:center;">
  <thead>
    <tr>
      <th style="border-bottom: 1px solid black">Symbol</th>
      <th style="border-bottom: 1px solid black">Location</th>
      <th style="border-bottom: 1px solid black">Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>Number</td>
      <td>Digit</td>
    </tr>
    <tr>
      <td>#</td>
      <td>Number</td>
      <td>Digit, zero shows as absent</td>
    </tr>
    <tr>
      <td>.</td>
      <td>Number</td>
      <td>Decimal separator</td>
    </tr>
    <tr>
      <td>,</td>
      <td>Integer</td>
      <td>Grouping separator</td>
    </tr>
    <tr>
      <td>¤ (\u00A4)</td>
      <td>Prefix or suffix</td>
      <td>Currency sign, replaced by currency symbol.</td>
    </tr>
  </tbody>
</table>

The supported patterns are a subset of the [java.text.DecimalFormat](http://download.oracle.com/javase/1.4.2/docs/api/java/text/DecimalFormat.html) specs.
More information are available at [localization_and_resources](localization_and_resources).

## Sample usage

The following sample shows how to create and use a NumberField widget, with a mandatory attribute for error checking and number format patterns.
In order to fetch the entered value, variable binding is to be considered as the preferred solution. Please refer to the [textfield](textfield) widget for more informations.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/numberfield/' ></iframe>

In this sample, the first 3 NumberFields are the same except for the state, which is respectively mandatory, normal and disabled.
The fourth NumberField has a pattern, that is used both to interpret and display the number.

More information about the pattern are available at [Localization and Resources](localization_and_resources).