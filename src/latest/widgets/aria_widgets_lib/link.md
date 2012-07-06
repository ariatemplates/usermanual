Title: Link


{{ReadyForReview}}
Link widget creates a link with href attribute set to an empty function. Link widget is very useful, when you want to have a link and on click of that link needs to make an asynchronous requests.

The simple way to add Link widget to your application is as follows
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/link/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [LinkCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:LinkCfg).

## Action
Link widget is an extension of ActionWidget meaning that a callback function can be triggered on the user action, for instance when the user clicks on the link, onClick callback function will be invoked.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/link/Snippet.tpl' defer></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/link/' />

## Binding
The only property that is bind-able for Link widget is 
* tooltip

For more information please read the article on [widget bindings](widget_bindings).