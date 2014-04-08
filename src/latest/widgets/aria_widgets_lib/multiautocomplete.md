Title: MultiAutoComplete



The Multi Autocomplete is a text input based widget, which allows user to find filter and select  multiple values from a predefined list of resources.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/multiautocomplete/Snippet.tpl?tag=multiautocomplete&lang=at&outdent=true' defer></script>

On  entering some text in the widget field, the MultiAutocomplete controller starts searching for entries that match the search string and displays a list of possible results. After selecting, the item is transformed into a graphical object with background color, label and close icon. User can continue entering text and iterate again on the same steps.The selected option can be removed either by pressing the backspace from keyboard or by clicking on the close icon of graphical object.

Suggestions are provided to the MultiAutocomplete by a **Resource Handler** that can pull elements locally or from a remote source. It also allows to select multiple values, if the entry string matches the range pattern.


This article will show you how to
* include an MultiAutocomplete widget in your template
* use the default Label-Code Range Resource Handlers for local entries to match both string and range pattern.
* customize look-and-feel and behavior
* 

The whole list of configuration parameters is available in [MultiAutoCompleteCfg Bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:MultiAutoCompleteCfg).

## Basic MultiAutoComplete

Label-Code Range Resource Handlers accepts an Array of suggestions described as Objects matching the [LC Range Resources Handler Bean](http://ariatemplates.com/api/#aria.resources.handlers.LCRangeResourceHandlerBean:Suggestion). we can also change the configuration of the Handler by passing a  [Configuartion Object](http://ariatemplates.com/api/#aria.resources.handlers.LCRangeResourceHandlerBean:Configuration) while instantiating LC Range Resource Handler which allows user to set their own `labelKey`, `codeKey`, `sortingMethod`, `codeExactMatch`, `threshold` and `allowRangeValues` in configuration. If allowRangeValues is passed the LC Range Resource Handler allows the user to select range of values, Rest of the configuration works similar to LC Resources Handler Bean. 

The resources for the MultiAutocomplete in this samples are the airlines and their IATA code as value, on typing the name of a airline and you'll get a list of suggestions for the entered text.

You can navigate the results with up/down key and select the highlighted option pressing _tab_ or _enter_ which creates the graphical object and user can continue the same steps, the newly proposed list excludes the options that have been already selected. _Esc_ key closes the dropdown without selecting anything.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/basic/' ></iframe>

## Look-and-feel
Being the extension of the Autocomplete widget, you can easily customize the widget like Autocomplete. For reference you can check the samples in [autocomplete](autocomplete).

MultiAutoComplete specific options are
* **expandButton** to show a button that opens the whole list of suggestions with combination of label and checkboxes. By clicking on checkbox selects the value. 
* **edit** By setting the _freeText_ it is possible to edit the selected values. _double click_ on the label of the graphical Object makes it editable and text in the field can be erased and typed again.
* **maxOptions** It allows to set the maximum number of options that can be selected with MultiAutoComplete. 
* **navigation** User can do the keyboard navigation on the selected values. First _click_ on any selected value _highlight_ the option then user can navigate on selected options by using _left_ or _right_ arrow keys.



This sample enables the  _expandButton_ which allows the user to display all suggestions available. The resources for this sample is 2014 formula 1 season schedule.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/expando/' ></iframe>

User can also customize the expando suggestion template from Resources Handler.

## Select Range Values
By setting the allowRangeValues of the Resource Handler user can able to select the multiple values. If the entered pattern matches either w1-3 or w1,2,3 format range of suggestion are proposed by the widget on _Enter_ multiple values are added.

The sample uses a passenger names as suggestion. Try typing passenger id like P1-3 or P2,4 format to select range of values.
 
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/multiautocomplete/rangevalues/' ></iframe>
