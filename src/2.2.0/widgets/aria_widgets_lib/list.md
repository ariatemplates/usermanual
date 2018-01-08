Title: List

List widget is a container widget which can hold a list of selectable items.

The simple way to add List widget to your application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/list/Snippet.tpl?tag=wgtListSnippet1&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [ListCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:ListCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/list/' ></iframe>

## Styling

List widget is highly configurable for instance you can change flowOrientation, decide whether to display code, value or both etc.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/list/Snippet.tpl?tag=wgtListSnippet2&lang=at&outdent=true'></script>

<iframe class='samples' style="height:600px" src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/list/styling/' ></iframe>

## Action

List widget is an action widget meaning, a callback function can be called based on the user action on the List widget

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/list/Snippet.tpl?tag=wgtListSnippet3&lang=at&outdent=true'></script>

<iframe class='samples' style="height:600px" src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/list/action/' ></iframe>

## Binding

The following properties are bindable for List widget

* disabled
* selected
* items
* maxOptions
* multipleSelect
* selectedIndex
* selectedValues
* tooltip

When you bind the list items to the data model, everytime you add or remove an item from the widget list, the widget is automatically refreshed and it displays the updates.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/list/Snippet.tpl?tag=wgtListSnippet5&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/list/editing/' ></iframe>

Here in this sample you can see how the binding works for multipleSelect and selectedValues properties.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/list/Snippet.tpl?tag=wgtListSnippet4&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/list/binding/' ></iframe>

For more information please read the article on [widget_bindings](widget_bindings).
