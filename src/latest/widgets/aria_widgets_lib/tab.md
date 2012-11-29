Title: Tab


{{ReadyForReview}}
Tabs, in any graphical user interface, are very often used to optimize the space taken by some content on the screen. They make it possible to show several content areas, one at a time, by clicking on the corresponding tab.
A tab may be set to one of these 3 states
* normal
* selected
* disabled
Knowing that when a set of tabs are attached to the same content panel, only one of them can be selected at any given time. This implies that when one tab is selected and the user selects another one, the first one will become normal again.
A tab should be able to be deactivated after it has been created.

The simple way to add Tab widget to your application is as follows
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/tab/Snippet.tpl?tag=wgtTabSnippet1&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [TabCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TabCfg).
<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/tab/?skip=1' ></iframe>

Tab widget is not a container widget, so the content of the Tab widget have to be placed in [tabpanel](tabpanel) widget.

## Styling
* It is possible to close a tab: using a close icon, it should be possible to remove a tab from the screen.
* It is possible to give several types of styling to a tab (the images and colors used for the normal, disabled and active tabs should be skinnable)
* It is possible to add ellipse to the tab.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/tab/Snippet.tpl?tag=wgtTabSnippet2&lang=at&outdent=true'></script>

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/tab/styling/?skip=1' ></iframe>

## Binding
The bindable properties of tab widget are
* selectedTab
* tooltip
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/tab/Snippet.tpl?tag=wgtTabSnippet3&lang=at&outdent=true'></script>
For more information please read the article on [widget_bindings](widget_bindings).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/tab/binding/?skip=1' ></iframe>