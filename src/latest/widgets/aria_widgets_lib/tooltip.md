Title: Tooltip

The Tooltip widget allows to create a piece of markup that can be shown when hovering over other widgtes, for example a Link or a Div.

The simplest way to add Tooltip widget to the application is as follows

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/tooltip/Snippet.tpl?tag=wgtTooltipSnippet&lang=at&outdent=true'></script>

You can notice that the
* the `id` property is mandatory because it will be used by other widgets to use the tooltip
* the `macro` property is mandatory because the corresponding macro is responsible for the content of the tooltip.

The whole list of configuration parameters is available in [TooltipCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TooltipCfg).

You can notice some interesting features:
* `showDelay` - the delay after which the tooltip will be shown if the the mouse remains stationary over the element
* `closeOnMouseOutDelay` - the delay after which the tooltip is removed

Here is a sample showing some examples of usage.

<iframe class='samples' style="height:700px" src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/tooltip/' ></iframe>
