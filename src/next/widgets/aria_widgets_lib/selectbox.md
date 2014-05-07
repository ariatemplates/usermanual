Title: SelectBox




A dropdown list of selectable items, with type ahead feature.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/selectbox/Snippet.tpl?tag=wgtSelectBoxField&lang=at&outdent=true' defer></script>

The whole list of configuration parameters is available in [SelectBoxCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:SelectBoxCfg).

## Sample Usage
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/selectbox/' ></iframe>

## Bindable options

Users can modify the options in SelectBox without refreshing the page by binding options as follows.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/selectbox/Snippet.tpl?tag=wgtSelectBoxBinding&lang=at&outdent=true' defer></script>
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/widgets/selectbox/bindoptions/' ></iframe>

## Highlighting and selection

When it comes to options highlighting and selection, the user interaction with the SelectBox depends on the **preselect** property. It can be set to
* `"always"` (default): the first option is always highlighted.
* `"none"`: the first option is never highlighted.