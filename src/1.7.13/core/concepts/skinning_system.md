Title: Skinning system



The visual style of an application using Aria Templates is highly configurable through the skinning system.

In AT, widgets are grouped under widget libraries (`aria`, `html`, `embed` and `touch`).
Only the widgets under the `aria` widget library are skinnable and if we want to use them in an application it is mandatory to have skin.
Every single widget can have many different visual appearances depending on the skin of the application.
Moreover, even within the same skin, several different visual appearances of a widget can be configured, to be used in different places of the application.

The skin is nothing but an AT singleton class with classpath as `"aria.widgets.AriaSkin"` and to use the skin in an application we need load it in a `<script>` tag right after the AT framework is loaded (unlike other classes, that are loaded using AJAX).
Presently, AT provides two skins by default i.e [`atskin.js`](https://github.com/ariatemplates/ariatemplates/blob/master/src/aria/css/atskin.js) and [`atflatskin.js`](https://github.com/ariatemplates/ariatemplates/blob/master/src/aria/css/atflatskin.js).

It is possible to change the styling of widgets by defining our own definition of class `"aria.widgets.AriaSkin"`.

Apart from the styling of widgets, the skin also provides general styling for your application, like font, external CSS files to load,
color settings etc. For more information, refer to [this bean](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:PageGeneralCfg)

In Aria Templates, a visual appearance of a widget is called a "skinclass". The skinclass to be used in a specific instance of a widget can be defined in the `sclass` property
 of the widget configuration. By default, the "std" skinclass is used.
For example, here is the same button using two different skinclasses:
<iframe class='samples'  style='min-height:200px;' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/button/skinning/' ></iframe>

Here is an extract of the template source which produced these buttons:
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/skinning/Snippet.tpl?tag=wgtButtonSkin&lang=at&outdent=true'></script>

The first button uses the "std" default skinclass whereas second one uses the "important" skinclass of the button. Each skin defines the set of available skinclasses for each skinnable widget. The "std" skinclass must always be defined for every skinnable widget.


## How skinning works

All the properties which we use in atskin.js or atflatskin.js for the widgets are documented in [AriaSkinBeans.js](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans).
For example say for Button widget, we have the following properties (**states**, **frame**, **simpleHTML**, **label**) defined in AriaSkinBean.js.

We can use all the properties defined in the bean definition in order to style the application. For example, this is the extract of Button configuration from atskin.js.
In this article, we often refer this to explain different concepts of skinning .

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/skinning/AtSkinButton.js?tag=ButtonSkin&lang=javascript&outdent=true' defer></script>

From the above json, we can find that there are three skinclasses **important**, **simple** and **std** defined for the `aria:Button` widget

These values are used by `CSSTemplates`, specific to widgets, in order to generate the css declarations that dictate the application styling.


## Skinclass inheritance

For widget properties, to avoid having to define all properties each time a new skinclass is defined, any skinclass inherits from the "std" skinclass (of the same skinnable class), so that if a property is not defined in the skinclass, it will be looked for in the "std" skinclass.

For example for the same Button widget above we can see that for the skinclass "important" only the font weight is given as bold and the other properties are inherited from "std" skinclass.

## States and states inheritance

Most of the skinnable widgets have different states that we might want to style differently. That's why in the configuration of most widget we find a `states` property.
For example, a button can be "disabled":

<iframe class='samples' style='min-height:150px;' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/button/skinning/disabled/' ></iframe>

Indeed, you can note that the Button configuration in atskin.js for the disabled state has two properties **color (#B0B0B0)** and **sprIdx (2)**: that is the reason why text color of
above disabled button is **#B0B0B0** and a different portion of the sprites that are present in the skin configuration (*spriteURL* and *spriteURLv*) is selected (this will be clearer later when frames are introduced).

To avoid having to define all the properties for every state, especially when they do not change from state to state, every state automatically inherits from the **normal** state,
so that if a property is not defined for a specific state, it is looked for in the **normal** state.
Skinclass inheritance takes precedence over state inheritance.

## Frames

Most of the aria widgets (Div, TextField and all widgets that inherit from it) are styled by means of what we call a *frame*. The appearance of a widget as well as the generated markup in order to obtain it can heavily vary based on the type of frame that we choose for it.

There are four types of frames:
The list of properties that allow us to configure it is presented [here](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:FixedHeightFrameStateCfg)
* Simple - Used for widgets which have a basic span around them. [Here](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:SimpleFrameStateCfg) is the list of available configuration properties. An example in atskin.js is Div widget for `std` or `basic` skinclass.
* FixedHeight - Used for widgets which have a fixed height. It uses sprites to draw the background of the widget. It can be used to obtain, for example, cross-browser rounded corners. The generated markup is more complex than a Simple frame. [Here](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:FixedHeightFrameStateCfg) is the list of available configuration properties. Example widgets are Button, DatePicker, MultiSelect etc.
* Table - Used for widgets which have a layout based on a table. the markup is really obtained with a table. The styling is based on sprites that allow to draw the corners and the vertical and horizontal boundaries. A classical example for their usage in atskin.js is the TextArea or the Div widget(for `dlg` skinclass), whose heights are not fixed. [Here](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:TableFrameStateCfg) is the list of available configuration properties.
* SimpleHTML - Used for widgets which have no frame at all. It does not benefit from any skinning, but on the other hand the amount of generated markup is minimized.

For the same Button example above we can see that its frame is of type "FixedHeight" for the "std" skinclass.


## Icons

For each of the widgets in the aria library, it is possible to find an explanation on how to style them inside the bean definition that we have mentioned many times already.

We will just say a few words about icons. They can be used directly through the `aria:Icon` widget, but they are also used in other widgets, for example in all those widgets which have a dropdown icon.

In order to minimise the number of actual files that are fetched from the server, icons are grouped in sprites. Here is an example of definition of a set of icons in a skin:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/skinning/AtSkinIcon.js?tag=DropdownIcon&lang=javascript&outdent=true' defer></script>

The sprite image for the above dropdown looks like below:
<br/>
<img src='https://raw.githubusercontent.com/ariatemplates/ariatemplates/master/src/aria/css/atskin/imgs/dropdownbtns.gif' />
<br/>
Let's see the icon properties and their descriptions
* **`content`**: a json object where keys can be any names and values correspond to index of an icon in the sprite
* **`spriteSpacing`**: space between icons in pixels
* **`direction`**: either horizontal(x) or vertical(y)
* **`iconWidth`**: width of the icon
* **`spriteURL`**: url of sprite image
* **`iconHeight`**: height of the icon
* **`biDimensional`**: whether there are multiple rows and columns at the same time.

A sprite is referred to this way: `[skinclass]:[content]`. For example, if we want to display the second icon in the above image inside a template, we can use
```
{@aria:Icon {
    icon : "dropdown:selectbox_error"
}/}
```

## How to write my own skin

To write your own custom skin you need to create an AT singleton class with "aria.widgets.AriaSkin".
This is a sample custom skin for the widget **myWidget** with skinclasses **mySkinClass** and **std** (default one)

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/skinning/AtSkinGeneric.js?noheader=true&tag=GenericWidgetSkin&lang=javascript&outdent=true' defer></script>

Inside a template users can use the **mySkinClass** for **myWidget** as below
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/core/skinning/Snippet.tpl?tag=wgtMyWidgetSkin&lang=at&outdent=true'></script>

The physical file containing the class definition can be located anywhere in your project. In fact, it is not loaded with an AJAX call like any other class, but **it must be loaded explicitly with a `<script>` tag right after the bootstrap of the framework**.