Title: Template


{{ReadyForReview}}
Template widget allows application developer to include external template file in a template.This allows flexibility to separate common code and add as a sub template where ever needed.

The simple way to add Template widget to your application is as follows

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/template/Snippet.tpl' defer></script>

Also the data can be passed from the parent template to the sub template via data property. If no data is set, the the sub template uses parent template data, unless moduleCtrl is specified, in which case the data model of that module controller is used as data.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/widgets/template/Snippet.tpl' defer></script>

The whole list of configuration parameters is available in [TemplateCfg bean](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TemplateCfg).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/widgets/template/' />

## Binding
The only property bindable for template is
* tooltip
For more information please read the article on [widget bindings](widget_bindings).