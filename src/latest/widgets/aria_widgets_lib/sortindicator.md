Title: SortIndicator


{{ReadyForReview}}
A sorting indicator is simply a label followed by an icon that is used to trigger an ascending or descending sort operation on a list of elements.The main purpose of this widget is, when the user click on it, switch from ascending to descending sorting. By default, a sorting indicator is neither set to ascending, nor descending, a first activation sets it to ascending, and subsequent activations just cycle through the sorting modes.

Sorting indicator uses current functionality of views and sections to sort and render the data. For more information on [Views click here](views)

The simple way to add SortIndicator widget to your application is as follows 
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/sortindicator/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [SortIndicatorCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:SortIndicatorCfg).
<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/sortindicator/' />

## Binding
The only property that is bindable for SortIndicator widget
* tooltip
For more information please read the article on [widget bindings](widget_bindings).
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/sortindicator/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/sortindicator/binding/' />