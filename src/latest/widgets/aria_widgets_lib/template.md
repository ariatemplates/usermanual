Title: Template


Template widget allows application developer to include external template file in a template. This allows for gathering of common code into a sub template.

The simple way to add Template widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/template/Snippet.tpl?tag=wgtTemplateSnippet1&lang=at&outdent=true'></script>

Also the data can be passed from the parent template to the sub template via data property. If no data is set, the the sub template uses parent template data, unless moduleCtrl is specified, in which case the data model of that module controller is used as data.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/widgets/template/Snippet.tpl?tag=wgtTemplateSnippet2&lang=at&outdent=true'></script>

The whole list of configuration parameters is available in [TemplateCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TemplateCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/widgets/template/?skip=1' ></iframe>

## Binding
The only property bindable for template is
* tooltip
For more information please read the article on [widget_bindings](widget_bindings).