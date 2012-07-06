Title: Template Inheritance



A template (either an HTML template, a macro library, a CSS template or a Text template) can extend another template (of the same type) so that it automatically inherits its macros, script methods, and also macro libraries, css, resources and text templates.

The parent template can be specified in the configuration of the root statement (`Template`, `CSSTemplate`, `Library`, `TextTemplate`) by setting the *`$extends`* property to the classpath of the parent template.

This article provides details and examples on how the inheritance mechanism works. in particular, it deals with:
* *macro inheritance:* how parent macros are inherited and overridden.
* *Script methods inheritance:* how methods form the parent script are inherited and overridden by the child template script.
* *Macro libraries inheritance:* how macro libraries are inherited and overridden. Bear in mind that the same mechanism described here for macrso libraries also applies to resources and text templates.
* *CSS inheritance:* how CSS templates associated to the parent are taken into account.

Widget libraries (declared in `$wlibs`) are not inherited at all by child templates.


## Inheriting macros

Each template can call macros defined in its parent templates and override them with its own macro definition. Look at the source code of the following sample.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/tplinheritance/step1/' />

The parent template (`ParentTemplate.tpl`) declares the three macros `main`, `parentMacro` and `overriddenMacro`. The child template (`ChildTemplate.tpl` - displayed in the sample) declares a new version of the `overriddenMacro` macro and another macro called `childMacro`.

Several points are interesting in this template:
* you can notice the *`$extends`* keyword (in the template configuration) by which inheritance is declared.
* There is *no need to have a main macro in the child template* as it is inherited from the parent template.
* It is possible to call any of the parent macros from the child template.
* An *`overridenMacro`* macro was already declared in the parent template and there is another declaration in the child template. The child declaration is overriding the parent one. It is still possible to call the parent macro explicitly by specifying the parent template name (last part of the classpath) prefixed with a '`$`' (*`$ParentTemplate`*) before the name of the macro to call, as shown in the example.


## Inheriting script methods

Functions defined in a script associated to the parent template are inherited and overridden by the child template, the latter having an associated script, too. Look at the source code of the following sample

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/tplinheritance/step2/' />

The parent template defines three macros and calls the methods `scriptParentMethod` and `scriptOverriddenMethod` that are defined in the associated script. Once again, the child template extends defines its own macro `childMacro`, and overrides the parent macro `overriddenMacro`. Moreover, its associated script defined the `scriptChildMethod` method and `scriptOverriddenMethod`. The latter overrides the method `scriptOverriddenMethod` defined in the parent template script.

The following remarks helps highlighting the most important emerging features:
* the child template has access to the methods defined in its parent script. In this case `scriptParentMethod` is called inside the macro `parentMacro`, which is inherited by the child template;
* method `scriptOverriddenMethod` defined in the child template script overrides the `scriptOverriddenMethod` defined in the parent template script. Indeed, it is the former that is actually called in the macro `overriddenMacro` (which calls the original macro `overriddenMacro` of the parent template);
* it is still possible to call the original methods defined in the parent template script, despite the fact that they have been overridden in the child template script. In this example, the `scriptOverriddenMethod` defined in the child template script is able to call the `scriptOverriddenMethod` of the parent by using the following syntax: `this.$ParentTemplateScript.scriptOverriddenMethod.call(this)`.


## Inheriting macro libraries

A template inherits the macro libraries defined in its parent template configuration. Look at the source code of the following sample. The parent template defines tow macro libraries (`libParent` and `libOverridden`) and the child template overrides one of them (`libOverridden`).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/tplinheritance/step3/' />

A few remarks are necessary in order to understand how macro libraries are inherited. Whenever a child template extends a parent template, it automatically inherits all the macrolibs of the latter. In particular, in this case `libParent` (shortcut for `ariadoc.samples.templates.tplinheritance.step3.LibParent`) and `libOverridden` (`ariadoc.samples.templates.tplinheritance.step3.LibParentOverridden`) would be available to the child template just because they are available to the parent. In fact, the child template can use all the macros defined in the `libParent` library. In this example, the macro `libParent.parentMacro` is called inside the `main` macro of the child template.

However, the child template explicitly redefines a `libOverridden` macro library (library `ariadoc.samples.templates.tplinheritance.step3.LibChildOverridden`) in the `$macrolibs` property of its own `Template` statement. As a consequence, the `libOverridden` of the parent template is *completely* overridden, namely it is *ignored*. This means, for instance, that the macro `justAnotherMacro` defined in the `libOverridden` of the parent template cannot be accessed by the child template. For this reason, it advisable to use the same macrolib key in the child as in the parent only if the macrolib of child extends the macrolib of the parent:

<table>
<tr>
<td style="padding: 30px">
Parent template<br/><div style="background: #F9F9F9">`$classpath: 'path.ParentTemplate'`<br/>`$macrolibs: { <b>libOne</b> : 'path.ParentLibOne'}`</div>
</td>
<td style="padding: 30px">
ParentLibOne<br/><div style="background: #F9F9F9">`$classpath: 'path.ParentLibOne'`</div>
</td>
</tr>
<tr>
<td style="padding: 30px">
Child template<br/><div style="background: #F9F9F9">`$classpath: 'path.ChildTemplate'`<br/>`<b>$extends: 'path.ParentTemplate'</b>`<br/>`$macrolibs: { <b>libOne</b> : "path.ChildLibOne"}`</div>
</td>
<td style="padding: 30px">
ChildLibOne<br/><div style="background: #F9F9F9">`$classpath: 'path.ChildLibOne'`<br/>`<b>$extends:  'path.ParentLibOne'</b>`</div>
</td>
</tr>
</table>


*Remark:* the same inheritance mechanism also applies to resources and text templates declared in the template configuration (respectively in the properties `$res` and `$texts`). On the contrary, widget libraries (declared in `$wlibs`) are not inherited at all.

## CSS inheritance

A child HTML template inherits the `$css` configuration property from its parent template *unless it redefines it in its own configuration*. If a `$css` property is explicitly specified, the parent one will be completely ignored.

Consider the following sample.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/tplinheritance/step4/' />

Looking at the source code, you can notice that the parent template `ParentTemplate.tpl` declares the CSS template `ariadoc.samples.templates.tplinheritance.step4.CSSParent` in the `$css` configuration property, whereas the child template does not include any CSS templates of its own. As a result, the CSS rules of the parent CSS apply to the markup generated by the child template.

On the contrary, in next sample the child template does define its own `$css`, so that the parent css specifications are ignored: the `div` of class `container` does not have the background color prescribed therein. 

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/templates/tplinheritance/step5/' />