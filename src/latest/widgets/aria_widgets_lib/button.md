Title: Button


Button widget enables the creation of rich, graphical buttons that function like traditional HTML form buttons and trigger an action when pressed.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/button/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [ButtonCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:ButtonCfg).

## Styling

Styling your buttons can be done changing the properties of your widget or applying a sclass.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/button/style/' />

Button label can only be some text, for richer buttons please check [iconbutton](iconbutton).

## Action

Button is an action widget, meaning that it can call a function when an action happens on it. This is done providing a [callback](working_in_an_asynchronous_world#aria-templates-callback-object) to the *on*_event_.

In the next sample there are two buttons with different _*onclick*_ callback, a simple one and another one with arguments. Clicking on the buttons will open an alert dialog.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/button/action/' />

## Binding

For more information please read the article on [widget bindings](widget_bindings).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/button/binding/' />