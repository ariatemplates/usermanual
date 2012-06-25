Title: Tooltip


{{ReadyForReview}}
Tooltip widget allows application developer to specify an offset to position the tooltip in some palce where it does not hide important information. For instance, tooltip will be placed below the mouse pointer and this will sometimes hide the important information.

The main features of Tooltip widget are as follows
* *Initial delay* - the delay after which the tooltip will be shown if the the mouse remains stationary over the element
* *Removal delay* - the delay after which the tooltip is removed, even if the mouse remains stationary
* *Reshow delay* - the delay after which the tooltip is displayed again if the user moves the mouse over an element and is supposed to be shorter than the initial delay
* *Timeframe* - the delay after which to show the tooltip is reset to the initial delay

The simple way to add Tooltip widget to the application is as follows
<srcinclude tag="wgtTooltipSnippet" lang="AT" outdent="true">widgets/tooltip/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [TooltipCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TooltipCfg).

<sample sample="widgets/tooltip" />

==Binding==
The only property that is bind-able for Tooltip widget is 
* tooltip

For more information please read the article on [Widget Bindings](Widget_Bindings).