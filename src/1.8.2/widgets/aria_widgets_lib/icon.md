Title: Icon

Icon widget provides easy way to add an icon image to the user application. This widget adds the icons as an  image sprite.

The simple widget for adding collapse icon.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/icon/Snippet.tpl?tag=wgtIconSample&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [IconCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:IconCfg).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/icon/' ></iframe>

## Icon Library

All standard icons are of size 16x16 pixels. Here is the whole list of icons available in Library

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/icon/library/' ></iframe>

## Font Icons

It is possible to use font icons when defining a skin for your Icon Widget in order to use external or ad hoc icons. 

Giving an example, let's say you want to use the icons provided by [font-awesome](http://fortawesome.github.io/Font-Awesome/) inside your application.
What you need to do is specify inside your skin that you want to load some external css using the [externalCSS property](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:PageGeneralCfg) giving to the property an array of css with classpath and file name.

In our case you'll add to the general configuration inside the skin the following line:

`"externalCSS" : ["style/font-awesome.css"]`.

The path will be generated starting from what you have specified inside the [imagesRoot](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.AriaSkinBeans:PageGeneralCfg) property, adding the path specified inside the `externalCSS` property.

Next thing to do is to define an icon sclass and his content, in order to give a name to the icons you want to use and the css classes that you want to apply according to your css.
In our example, let's say we want to use those icons:

* fa-camera-retro
* fa-spinner
* fa-cog
* fa-pencil

To use them we will have to define this sclass inside our skin:
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/icon/FontIcon.tpl?tag=wgtIconSample&lang=at&outdent=true'></script>

After that, in order to use one of our new custom icon we will use this syntax (like we've seen before at the very top of this page):
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/icon/FontIconDeclaration.tpl?tag=wgtIconSample&lang=at&outdent=true'></script>

Doing that, the framework will add the css classes that you have specified inside the skin to the icons you have inside your template.