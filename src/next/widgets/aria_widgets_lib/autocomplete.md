Title: AutoComplete



The Autocomplete widget is a text input that allow to quickly find and filter values from a list of resources.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/autocomplete/Snippet.tpl?tag=autocomplete&lang=at&outdent=true' defer></script>

By entering some text in the filed, the Autocomplete controller starts searching for entries that match the search string and displays a list of possible results. The search can start immediately as you type a single letter or after 2, 3  or more letters.

Data is provided to the Autocomplete by a **Resource Handler** that can pull elements locally or from a remote source.
Local handlers are the best choice for small/medium datasets and give you the fastest way of retrieving data, remote handlers are necessary for large datasets like point of interests around the world.

This input also provides keyboard navigation allowing you to navigate thorugh and select an option with the keyboard.
Additionally it can be configured to automatically highlight and/or select one of the options if this matches exactly what you typed already in the field.

This article will show you how to
* include an Autocomplete widget in your template
* use the default Label-Code Resource Handlers for local entries
* define your own Resource Handler, either for more advanced suggestions of for remote data
* customize look-and-feel and behavior

The whole list of configuration parameters is available in [AutocompleteCfg Bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:AutoCompleteCfg).

## Basic AutoComplete

Label-Code Resource Handlers accepts an Array of suggestions described as Objects matching the [LC Resources Handler Bean](http://ariatemplates.com/api/#aria.resources.handlers.LCResourcesHandlerBean:Suggestion). Alternatively, we can pass a [Configuartion Object](http://ariatemplates.com/api/#aria.resources.handlers.LCResourcesHandlerBean:Configuration) while instantiating LC Resource Handler which allows user to set their own `labelKey`, `codeKey`, `sortingMethod`, `codeExactMatch`, `threshold`. If no configuartion object is passed to LC Resource Handler, it will take `codeKey` as `code`, `labelKey` as `label` and the default sorting method as descending alphabeticall order.

Each of the item contains a pair of **labelKey**(defined in configuartion object) and **codeKey**(defined in configuartion object) where _labelKey_ is the visible value, _codeKey_ is what is stored internally in the Autocomplete or in the datamodel.

The resources for the Autocomplete in this samples are the nations that participated in the 1966 Football World Cup, start typing the name of a nation and you'll get a list of results.

You can navigate the results with up/down key and select the highlighted option pressing _tab_ or _enter_. _Esc_ key closes the dropdown without selecting anything.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/autocomplete/basic/' ></iframe>

By default, **preselect** is set to _strict_ so typing the exact short code of a nation selects that option (you can try typing ENG, FRA, ...). For more samples on _preselect_ please have a look at the paragraph [#highlight-behavior](#highlight-behavior).

## Look-and-feel

Being a Text Input you can customize the field width, the label (text, width, position, align), the initial displayed value, the helptext and the status (mandatory, readOnly or disabled) as in any other Input. For reference you can check the samples in [textfield](textfield).

AutoComplete specific options are
* **expandButton** to show a button that opens the whole list of suggestions. A sample is available in the previous paragraph.
* **spellCheck** to enable/disable native spell check from the browser. Note that some old browsers don't support spell check, something visually similar can be obtained using sclass _underlineError_.
* **suggestionsTemplate** to provide a different template for the list of options. This gives you the maximum flexibility.

This sample uses a custom resource handler that extends from LCResourceHandler and uses also a customized suggestions template in order to display spellcheck suggestions.
Try typing _fraance_ or any other country doubling its third letter and you'll see _**spellcheck**_ in action.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/autocomplete/spellcheck/' ></iframe>

The second AutoComplete in the previous samples uses the sclass _**underlineError**_ to change the style of a field in error.

## Highlighting, selection and freeText

When it comes to suggestion highlighting and selection, the user interaction with the autocomplete can be changed by setting the following properties: **preselect**, **freeText**, *autoFill*.

* **preselect**: it allows to modify the way suggestions are highlighted and selected when typing.
	* `"strict"` (default value): the first option is highlighted only if the search string (what you type in the text field) matches exactly the label or the code.
	* `"always"`: the first option is always highlighted.
	* `"none"`: the first option is never highlighted.

* **freeText**: when set to true, the widget will accept as a valid value any entry. This means that, when a selection key is pressed and there no (highlighted) suggestion, the selected value (that is also set in the bound data model) will be the string that is present in the input field. When set to false,
	* if there is a highlighted suggestion, it will be selected
	* if there is no suggestion available, then the field will be in error state. The data model will not be changed.

* **autofill**: if set to true, when you navigate with _up_/_down_ keys through the list of suggestions the label of highlighted suggestion is set in the text field. It defaults to `true`.

The following sample allows you to change the configuration of the autocomplete widget and inspect its behaviour.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/autocomplete/preselectAutofill/' ></iframe>

## Action

It is possible to add listeners to some of the events raised by the widget DOM upon user interaction:

* **onclick**
* **onfocus**
* **onblur**
* **onchange**: called when the value in the field changes. Changes are not immediate as you type, but happens when you leave the field, after a blur or after selecting one of the options.

In this sample the **onchange** callback shows a small notification above the AutoComplete. If you type something in the field and highlight its options the callback is not called, but if you select one option clicking on it, pressing _Enter_ or _Tab_, the notification appears. The callback is called also if you type an invalid text.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/autocomplete/onchange/' ></iframe>

## Error messages customization

Please refer to the main article concerning default [error messages customization](error_messages_customization).

Here is the list of error messages that can be customized, with for each: 

- the key to be used in the configuration map
- its description
- its hard-coded default value

Messages: 

- validation
  - key: `validation`
  - description: for cases where the input's value can't match any option
  - default hard-coded: `"There is no suggestion available for the given entry."`
