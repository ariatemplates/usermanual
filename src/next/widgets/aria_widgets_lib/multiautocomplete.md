Title: MultiAutoComplete



The Multi Autocomplete is a text input based widget, which allows user to find, filter and select multiple values from a predefined list of resources.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/multiautocomplete/Snippet.tpl?tag=multiautocomplete&lang=at&outdent=true' defer></script>

On  entering some text in the widget field, the MultiAutocomplete starts searching for items that match the entered string and displays a list of possible results. After selecting, the item is transformed into a graphical object with a background color, a label and a close icon. The user can continue entering text and iterate again on the same steps.The selected option can be removed either by pressing the backspace from keyboard or by clicking on the close icon of the graphical object.

Suggestions are provided to the MultiAutocomplete by a **Resources Handler** that can pull elements locally or from a remote source. It also allows to select multiple values, if the entry string matches a range pattern, as we will explain later.


This article will show you how to
* include an MultiAutocomplete widget in your template
* use the default Label-Code Range Resource Handlers for local entries to match both strings and range patterns.
* customize look-and-feel and behavior.

The whole list of configuration parameters is available in [MultiAutoCompleteCfg Bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:MultiAutoCompleteCfg).

## Basic MultiAutoComplete

Label-Code Range Resource Handlers accepts an Array of suggestions described as Objects matching the [LC Range Resources Handler Bean](http://ariatemplates.com/api/#aria.resources.handlers.LCRangeResourceHandlerBean:Suggestion). We can also change the configuration of the Handler by passing a  [Configuartion Object](http://ariatemplates.com/api/#aria.resources.handlers.LCRangeResourceHandlerBean:Configuration) while instantiating LC Range Resource Handler which allows users to set their own `labelKey`, `codeKey`, `sortingMethod`, `codeExactMatch`, `threshold` and `allowRangeValues` in the configuration. If `allowRangeValues` property is set to true the LC Range Resource Handler allows the user to select range of values. The rest of the configuration works similar to a standard Label-Code Resources Handler. 

The resources for the MultiAutocomplete in these samples are the airlines and their IATA code as value. Type the name of an airline and you'll get a list of suggestions for the entered text.

You can navigate the results with up/down key and select the highlighted option(s) in the dropdown pressing `tab` or `enter` which creates the graphical object. then the user can continue the same steps, the newly proposed list excludes the options that have been already selected. `Esc` key closes the dropdown without selecting anything.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/basic/' ></iframe>

## Customization
Being the extension of the Autocomplete widget, you can easily customize the widget like an Autocomplete. For reference you can check the samples in [autocomplete](autocomplete).
Some options that have a specific behaviour are:
* **expandButton**, set to `true` to show a button that opens the whole list of suggestions with a combination of labels and checkboxes. Clicking on a checkbox selects the corresponding value. Like in the case of an Autocomplete, the dropdown is displayed only if the resources handler implements method `getAllSuggestions`. 
* **freeText** By setting the `freeText` it is possible to edit the selected values. A `double click` on the label of the graphical object makes it editable and the text in the field can be erased and typed again. When `freeText` is set to true, typed entries that do not match any suggestions will be added as selected options as they are. When it is set to `false`, the typed text will be kept in the input field, the widget is set in error state and error tooltip is displayed (immediately, after you blur or when you focus on the widget, according to the configuration you set for the `validationEvent` option).


The only MultiAutoComplete specific option is
* **maxOptions** It allows to set the maximum number of options that can be selected with MultiAutoComplete. 

### Navigation

User can also do the keyboard navigation on the selected values. First `click` on any selected value `highlight` the option then user can navigate on selected options by using `left` or `right` arrow keys. The highlighted option can be removed by pressing `delete` or the `backspace` key. A second click on the highlighted option makes it editable if `freeText` option is set to true.

### Ellipsis
If the value entered by the user is wider than width of the widget, then widget automatically ellipsis the text and adds the options to the widget.

This sample enables the  `expandButton` which allows the user to display all suggestions available. The resources for this sample is 2014 formula 1 season schedule.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/expando/' ></iframe>

User can also customize the expando suggestion template from the Resources Handler.

## Select Range Values
By setting the `allowRangeValues` of the Resources Handler to `true`, the user is able to select multiple values. For example, if the entered pattern is either `w1-3` or `w1,2,3` multiple suggestions are proposed by the widget, and  on `Enter` multiple values are added.

The sample uses a passenger names as suggestion. Try typing passenger id like `P1-3` or `P2,4` format to select range of values.
 
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/rangevalues/' ></iframe>
