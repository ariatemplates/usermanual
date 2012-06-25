Title: PasswordField


PasswordField widget creates an input text field of type password. It has the same features as [TextField](TextField) widget, but the characters in the field are masked exactly like in a plain password input.

<srcinclude tag="wgtPasswordField" lang="AT" outdent="true">widgets/passwordfield/Snippet.tpl</srcinclude>

The whole list of configuration parameters is available in [PasswordFieldCfg bean](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.widgets.CfgBeans:PasswordFieldCfg).

# Features
<sample sample="widgets/passwordfield" />

Features such as [bindings](Widget Bindings) and [transforms](transforms), styling and [validation](Validators) is done exactly in the same way as [TextField](TextField) widget.

The only constraint is that PasswordField does *not* allow the use of _helptext_.