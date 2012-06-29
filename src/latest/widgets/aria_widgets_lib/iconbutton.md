Title: IconButton


{{ReadyForReview}}
IconButton widget is an extension of [Button widget](Button), so both holds the same behaviour. For instance alike button widget iconButton can also trigger an action when you click on it.IconButton is an action widget, meaning that it can call a function when an action happens on it.Also IconButton widget create a [Icon widget](Icon)

The simple way to include an IconButton to your application is

<srcinclude tag="wgtIconButton1" lang="AT" outdent="true">widgets/iconbutton/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [IconButtonCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:IconButtonCfg).

<sample sample="widgets/iconbutton" />

## Styling
Styling your buttons can be done by changing the properties of your widget or applying a sclass or changing the icon. 

<sample sample="widgets/iconbutton/styling" />

## Binding
The following properties are bindable for IconButton widget
* selected
* disabled
* tooltip
For more information please read the article on [Widget Bindings](Widget_Bindings).

<srcinclude tag="wgtIconButton2" lang="AT" outdent="true">widgets/iconbutton/Snippet.tpl</srcinclude>

<sample sample="widgets/iconbutton/binding" />