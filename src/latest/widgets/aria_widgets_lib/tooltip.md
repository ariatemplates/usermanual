Title: Tooltip


Tooltip widget allows application developer to specify an offset to position the tooltip in some palce where it does not hide important information. For instance, tooltip will be placed below the mouse pointer and this will sometimes hide the important information.

The main features of Tooltip widget are as follows
* **Initial delay** - the delay after which the tooltip will be shown if the the mouse remains stationary over the element
* **Removal delay** - the delay after which the tooltip is removed, even if the mouse remains stationary
* **Reshow delay** - the delay after which the tooltip is displayed again if the user moves the mouse over an element and is supposed to be shorter than the initial delay
* **Timeframe** - the delay after which to show the tooltip is reset to the initial delay

The simple way to add Tooltip widget to the application is as follows
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/tooltip/Snippet.tpl?tag=wgtTooltipSnippet&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [TooltipCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TooltipCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/tooltip/?skip=1' ></iframe>

## Binding
The only property that is bind-able for Tooltip widget is 
* tooltip

For more information please read the article on [widget_bindings](widget_bindings).