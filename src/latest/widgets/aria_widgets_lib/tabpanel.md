Title: TabPanel

The [Tab Widget](tab) is strictly linked with the TabPanel. The latter is in charge of displaying a different content according to the selected tab.

Here is an example of usage of the TabPanel widget.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/tabpanel/Snippet.tpl?tag=wgtTabPanelSnippet1&lang=at&outdent=true'></script>

You have to specify the `macro` that is responsible for the content display.

The whole list of configuration parameters is available in [TabPanelCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TabPanelCfg).

## Bindable options

The `selectedTab` property can be bound to the data model. Its change will trigger a refresh of the TabPanel content. In a realistic scenario, the same data model is bound to a set of tabs. Here is a sample.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/tab/tabpanel/' ></iframe>
