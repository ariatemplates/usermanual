Title: AutoComplete



The Autocomplete widget is a text input that allow to quickly find and filter values from a list of resources.

<srcinclude tag="autocomplete" lang="AT" outdent="true">widgets\autocomplete\Snippet.tpl</srcinclude>

By entering some text in the filed, the Autocomplete controller starts searching for entries that match the search string and displays a list of possible results. The search can start immediately as you type a single letter or after 2, 3  or more letters.

Data is provided to the Autocomplete by a *Resource Handler* that can pull elements locally or from a remote source.
Local handlers are the best choice for small/medium datasets and give you the fastest way of retrieving data, remote handlers are necessary for large datasets like point of interests around the world.

This input also provides keyboard navigation allowing you to navigate thorugh and select an option with the keyboard.
Additionally it can be configured to automatically highlight and/or select one of the options if this matches exactly what you typed already in the field.

This article will show you how to 
* include an Autocomplete widget in your template
* use the default Label-Code Resource Handlers for local entries
* define your own Resource Handler, either for more advanced suggestions of for remote data
* customize look-and-feel and behavior

The whole list of configuration parameters is available in [AutocompleteCfg Bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:AutoCompleteCfg).

# Basic AutoComplete

Label-Code Resource Handlers accepts an Array of suggestions described as Objects matching the [LC Resources Handler Bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.resources.handlers.LCResourcesHandlerBean).
Each of the item contains a pair of *label* and *code* where _label_ is the visible value, _code_ is what is stored internally in the Autocomplete or in the datamodel.

The resources for the Autocomplete in this samples are the nations that participated in the 1966 Football World Cup, start typing the name of a nation and you'll get a list of results.

You can navigate the results with up/down key and select the highlighted option pressing _tab_ or _enter_. _Esc_ key closes the dropdown without selecting anything.

<sample sample="widgets/autocomplete/basic" />

By default, *preselect* is set to _strict_ so typing the exact short code of a nation selects that option (you can try typing ENG, FRA, ...). For more samples on _preselect_ please have a look at the paragraph [Highlight Behavior](#Highlight_Behavior).

# Look-and-feel

Being a Text Input you can customize the field width, the label (text, width, position, align), the initial displayed value, the helptext and the status (mandatory, readOnly or disabled) as in any other Input. For reference you can check the samples in [TextField](TextField).

AutoComplete specific options are
* *expandButton* to show a button that opens the whole list of suggestions. A sample is available in the previous paragraph.
* *spellCheck* to enable/disable native spell check from the browser. Note that some old browsers don't support spell check, something visually similar can be obtained using sclass _underlineError_.
* *suggestionsTemplate* to provide a different template for the list of options. This gives you the maximum flexibility.

This sample uses a custom resource handler that extends from LCResourceHandler and uses also a customized suggestions template in order to display spellcheck suggestions.
Try typing _fraance_ or any other country doubling its third letter and you'll see _*spellcheck*_ in action.

<sample sample="widgets/autocomplete/spellcheck" />

The second AutoComplete in the previous samples uses the sclass _*underlineError*_ to change the style of a field in error.

# Highlight Behavior

* *autofill* is enabled by default. If enabled, when you navigate with _up_/_down_ keys the value of highlighted option is set in the text field.

To see the difference, type _*s*_ in the field and press _down_ key, in the first AutoComplete _Switzerland_ is highlighted and set in the field, in the second one the option is only highlighted but the field still contains only the letter _s_.

<template templateclasspath="ariadoc.samples.widgets.autocomplete.HighlightAutofill" />


* *preselect* allows to modify the way options are highlighted when typing.
	* _strict_: the first option is highlighted only if the search string (what you type in the text field) matches exactly the label or the code.
	* _always_: the first option is always highlighted.
	* _none_: the first option is never highlighted.

You can type _ENG_ or _England_ in the three AutoComplete below and check how suggestions are highlighted. 
In _*strict*_ mode the suggestion is highlighted only when you type entirely _ENG_ or _England_, in _*always*_ mode as soon as you type the letter _e_ and in _*none*_ mode highlight is disabled completely.

<template templateclasspath="ariadoc.samples.widgets.autocomplete.HighlightPreselect" />

# Action

AutoComplete is a form widget, meaning that it is a good addition to your forms although it can be used also outside such element. For this reason it doesn't allow to react on user interaction (click, focus, ...) but only to data changes.

* *onchange*: called when the value in the field changes. Changes are not immediate as you type, but happens when you leave the field, after a blur or after selecting one of the options.

In this sample the _*onchange*_ callback shows a small notification above the AutoComplete. If you type something in the field and highlight its options the callback is not called, but if you select one option clicking on it, pressing _Enter_ or _Tab_, the notification appears. The callback is called also if you type an invalid text.

<sample sample="widgets/autocomplete/onchange" />