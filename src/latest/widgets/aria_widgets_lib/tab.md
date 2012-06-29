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
<srcinclude tag="wgtTabSnippet1" lang="AT" outdent="true">widgets/tab/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [TabCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TabCfg).
<sample sample="widgets/tab" />

Tab widget is not a container widget, so the content of the Tab widget have to be placed in [TabPanel](TabPanel) widget.

## Styling
* It is possible to close a tab: using a close icon, it should be possible to remove a tab from the screen.
* It is possible to give several types of styling to a tab (the images and colors used for the normal, disabled and active tabs should be skinnable)
* It is possible to add ellipse to the tab.

<srcinclude tag="wgtTabSnippet2" lang="AT" outdent="true">widgets/tab/Snippet.tpl</srcinclude>

<sample sample="widgets/tab/styling" />

## Binding
The bindable properties of tab widget are
* selectedTab
* tooltip
<srcinclude tag="wgtTabSnippet3" lang="AT" outdent="true">widgets/tab/Snippet.tpl</srcinclude>
For more information please read the article on [Widget Bindings](Widget_Bindings).

<sample sample="widgets/tab/binding" />