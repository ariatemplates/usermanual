Title: Template Inheritance



A template (either an HTML template, a macro library, a CSS template or a Text template) can extend another template (of the same type) so that it automatically inherits its macros, script methods, and also macro libraries, css, resources and text templates.

The parent template can be specified in the configuration of the root statement (<code>Template</code>, <code>CSSTemplate</code>, <code>Library</code>, <code>TextTemplate</code>) by setting the *<code>$extends</code>* property to the classpath of the parent template.

This article provides details and examples on how the inheritance mechanism works. in particular, it deals with:
* *macro inheritance:* how parent macros are inherited and overridden.
* *Script methods inheritance:* how methods form the parent script are inherited and overridden by the child template script.
* *Macro libraries inheritance:* how macro libraries are inherited and overridden. Bear in mind that the same mechanism described here for macrso libraries also applies to resources and text templates.
* *CSS inheritance:* how CSS templates associated to the parent are taken into account.

Widget libraries (declared in <code>$wlibs</code>) are not inherited at all by child templates.


## Inheriting macros

Each template can call macros defined in its parent templates and override them with its own macro definition. Look at the source code of the following sample.

<sample sample="templates/tplinheritance/step1" />

The parent template (<code>ParentTemplate.tpl</code>) declares the three macros <code>main</code>, <code>parentMacro</code> and <code>overriddenMacro</code>. The child template (<code>ChildTemplate.tpl</code> - displayed in the sample) declares a new version of the <code>overriddenMacro</code> macro and another macro called <code>childMacro</code>.

Several points are interesting in this template:
* you can notice the *<code>$extends</code>* keyword (in the template configuration) by which inheritance is declared.
* There is *no need to have a main macro in the child template* as it is inherited from the parent template.
* It is possible to call any of the parent macros from the child template.
* An *<code>overridenMacro</code>* macro was already declared in the parent template and there is another declaration in the child template. The child declaration is overriding the parent one. It is still possible to call the parent macro explicitly by specifying the parent template name (last part of the classpath) prefixed with a '<code>$</code>' (*<code>$ParentTemplate</code>*) before the name of the macro to call, as shown in the example.


## Inheriting script methods

Functions defined in a script associated to the parent template are inherited and overridden by the child template, the latter having an associated script, too. Look at the source code of the following sample

<sample sample="templates/tplinheritance/step2" />

The parent template defines three macros and calls the methods <code>scriptParentMethod</code> and <code>scriptOverriddenMethod</code> that are defined in the associated script. Once again, the child template extends defines its own macro <code>childMacro</code>, and overrides the parent macro <code>overriddenMacro</code>. Moreover, its associated script defined the <code>scriptChildMethod</code> method and <code>scriptOverriddenMethod</code>. The latter overrides the method <code>scriptOverriddenMethod</code> defined in the parent template script.

The following remarks helps highlighting the most important emerging features:
* the child template has access to the methods defined in its parent script. In this case <code>scriptParentMethod</code> is called inside the macro <code>parentMacro</code>, which is inherited by the child template;
* method <code>scriptOverriddenMethod</code> defined in the child template script overrides the <code>scriptOverriddenMethod</code> defined in the parent template script. Indeed, it is the former that is actually called in the macro <code>overriddenMacro</code> (which calls the original macro <code>overriddenMacro</code> of the parent template);
* it is still possible to call the original methods defined in the parent template script, despite the fact that they have been overridden in the child template script. In this example, the <code>scriptOverriddenMethod</code> defined in the child template script is able to call the <code>scriptOverriddenMethod</code> of the parent by using the following syntax: <code>this.$ParentTemplateScript.scriptOverriddenMethod.call(this)</code>.


## Inheriting macro libraries

A template inherits the macro libraries defined in its parent template configuration. Look at the source code of the following sample. The parent template defines tow macro libraries (<code>libParent</code> and <code>libOverridden</code>) and the child template overrides one of them (<code>libOverridden</code>).

<sample sample="templates/tplinheritance/step3" />

A few remarks are necessary in order to understand how macro libraries are inherited. Whenever a child template extends a parent template, it automatically inherits all the macrolibs of the latter. In particular, in this case <code>libParent</code> (shortcut for <code>ariadoc.samples.templates.tplinheritance.step3.LibParent</code>) and <code>libOverridden</code> (<code>ariadoc.samples.templates.tplinheritance.step3.LibParentOverridden</code>) would be available to the child template just because they are available to the parent. In fact, the child template can use all the macros defined in the <code>libParent</code> library. In this example, the macro <code>libParent.parentMacro</code> is called inside the <code>main</code> macro of the child template.

However, the child template explicitly redefines a <code>libOverridden</code> macro library (library <code>ariadoc.samples.templates.tplinheritance.step3.LibChildOverridden</code>) in the <code>$macrolibs</code> property of its own <code>Template</code> statement. As a consequence, the <code>libOverridden</code> of the parent template is *completely* overridden, namely it is *ignored*. This means, for instance, that the macro <code>justAnotherMacro</code> defined in the <code>libOverridden</code> of the parent template cannot be accessed by the child template. For this reason, it advisable to use the same macrolib key in the child as in the parent only if the macrolib of child extends the macrolib of the parent:

<table>
<tr>
<td style="padding: 30px">
Parent template<br/><div style="background: #F9F9F9"><code>$classpath: 'path.ParentTemplate'</code><br/><code>$macrolibs: { <b>libOne</b> : 'path.ParentLibOne'}</code></div>
</td>
<td style="padding: 30px">
ParentLibOne<br/><div style="background: #F9F9F9"><code>$classpath: 'path.ParentLibOne'</code></div>
</td>
</tr>
<tr>
<td style="padding: 30px">
Child template<br/><div style="background: #F9F9F9"><code>$classpath: 'path.ChildTemplate'</code><br/><code><b>$extends: 'path.ParentTemplate'</b></code><br/><code>$macrolibs: { <b>libOne</b> : "path.ChildLibOne"}</code></div>
</td>
<td style="padding: 30px">
ChildLibOne<br/><div style="background: #F9F9F9"><code>$classpath: 'path.ChildLibOne'</code><br/><code><b>$extends:  'path.ParentLibOne'</b></code></div>
</td>
</tr>
</table>


*Remark:* the same inheritance mechanism also applies to resources and text templates declared in the template configuration (respectively in the properties <code>$res</code> and <code>$texts</code>). On the contrary, widget libraries (declared in <code>$wlibs</code>) are not inherited at all.

## CSS inheritance

A child HTML template inherits the <code>$css</code> configuration property from its parent template *unless it redefines it in its own configuration*. If a <code>$css</code> property is explicitly specified, the parent one will be completely ignored.

Consider the following sample.

<sample sample="templates/tplinheritance/step4" />

Looking at the source code, you can notice that the parent template <code>ParentTemplate.tpl</code> declares the CSS template <code>ariadoc.samples.templates.tplinheritance.step4.CSSParent</code> in the <code>$css</code> configuration property, whereas the child template does not include any CSS templates of its own. As a result, the CSS rules of the parent CSS apply to the markup generated by the child template.

On the contrary, in next sample the child template does define its own <code>$css</code>, so that the parent css specifications are ignored: the <code>div</code> of class <code>container</code> does not have the background color prescribed therein. 

<sample sample="templates/tplinheritance/step5" />