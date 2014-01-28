Title: SortIndicator
Category: Widgets

A sorting indicator is simply a label followed by an icon that is used to trigger an ascending or descending sort operation on a list of elements.
The main purpose of this widget is, when the user click on it, switch from ascending to descending sorting.
By default, a sorting indicator is neither set to ascending, nor descending, a first activation sets it to ascending, and subsequent activations just cycle through the sorting modes.

Sorting indicator uses current functionality of views and sections to sort and render the data. For more information on views [click here](views)

The simple way to add SortIndicator widget to your application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/sortindicator/Snippet.tpl?tag=wgtSortIndicatorSnippet1&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [SortIndicatorCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:SortIndicatorCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/sortindicator/' ></iframe>

## Binding

The only property that is bindable for SortIndicator widget

* tooltip

For more information please read the article on [widget_bindings](widget_bindings).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/sortindicator/Snippet.tpl?tag=wgtSortIndicatorSnippet2&lang=at&outdent=true'></script>

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/sortindicator/binding/' ></iframe>