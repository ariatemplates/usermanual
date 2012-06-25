Title: Button


Button widget enables the creation of rich, graphical buttons that function like traditional HTML form buttons and trigger an action when pressed.

<srcinclude tag="wgtButtonAction" lang="AT" outdent="true">widgets\button\Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [ButtonCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:ButtonCfg).

# Styling

Styling your buttons can be done changing the properties of your widget or applying a sclass.

<sample sample="widgets/button/style" />

Button label can only be some text, for richer buttons please check [IconButton](IconButton).

# Action

Button is an action widget, meaning that it can call a function when an action happens on it. This is done providing a [callback](Working_in_an_Asynchronous_World#Aria Templates Callback Object) to the *on*_event_.

In the next sample there are two buttons with different _*onclick*_ callback, a simple one and another one with arguments. Clicking on the buttons will open an alert dialog.

<sample sample="widgets/button/action" />

# Binding

For more information please read the article on [Widget Bindings](Widget_Bindings).

<sample sample="widgets/button/binding" />