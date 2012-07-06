Title: TabPanel



The content of the Tab widget is presented by using TabPanel widget. The TabPanel widget loads the content in one of 2 ways. The method depends on whether the TabPanel has been used as a container or not. If it has been used as a container, then the details for which data should be displayed need to be described in the TabPanel itself.

If the TabPanel hasn't been used as a container then it is necessary to specify a macro, which is used in the refresh. This method is considerable faster and is recommended where possible.

Here is an example of initialising a TabPanel widget
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/tabpanel/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [TabPanelCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TabPanelCfg).

Since TabPanel widget is used along with Tab widget, for more understanding please read [Tab Widget](tab).

Here is an example for TabPanel widget using macro content

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/tab/tabpanel/' />