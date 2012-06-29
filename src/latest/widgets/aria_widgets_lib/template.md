Title: Template


{{ReadyForReview}}
Template widget allows application developer to include external template file in a template.This allows flexibility to separate common code and add as a sub template where ever needed.

The simple way to add Template widget to your application is as follows

<srcinclude tag="wgtTemplateSnippet1" lang="AT" outdent="true">widgets/template/Snippet.tpl</srcinclude>

Also the data can be passed from the parent template to the sub template via data property. If no data is set, the the sub template uses parent template data, unless moduleCtrl is specified, in which case the data model of that module controller is used as data.

<srcinclude tag="wgtTemplateSnippet2" lang="AT" outdent="true">widgets/template/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [TemplateCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:TemplateCfg).

<sample sample="widgets/template" />

## Binding
The only property bindable for template is
* tooltip
For more information please read the article on [Widget Bindings](Widget_Bindings).