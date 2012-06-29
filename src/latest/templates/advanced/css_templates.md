Title: CSS Templates



CSS templates are special kinds of templates designed to bring the flexibility of Aria Templates to your style declarations.  CSS templates benefit from all the advantages of the template engine, such as variables, macros, control statements or scripts.

## Definition and use

CSS Templates are defined using the <code>CSSTemplate</code> statement and stored with the <code>.tpl.css</code> extension:
<srcinclude noheader="true" lang="at" outdent="true">templates\cssTemplates\MyCSSTemplate.tpl.css</srcinclude>
As shown above, in its simplest form, a CSS template really is a template file in which styles declarations are defined directly inside the <code>main</code> macro.

To use these declarations from an HTML template, you just need to reference the classpath in the <code>$css</code> configuration property:
<srcinclude noheader="true" lang="at" outdent="true">templates\cssTemplates\MyTemplate.tpl</srcinclude>
Note that <code>$css</code> expects an array since you might want to include more than just one CSS template.

## Similarities and differences with HTML templates

Of course, if CSS templates were just about embedding styles inside a template declaration they wouldn't be very useful.  Their interest obviously resides in the features offered by the templating engine.

### Syntax and allowed statements

You write CSS templates the same way you would write an HTML template.  The main difference is that you don't need to escape the curly brackets characters (<code>{</code> and <code>}</code>).  Contrary to basic CSS files, both comments formats (<code>//</code> and <code>/*...*/</code>) are accepted.

Most of the AT statements can be used in CSS templates and irrelevant ones (<code>id</code>, <code>on</code>, <code>section</code>, <code>checkDefault</code>, and <code>createView</code>) are noted as such in the [Writing Templates](Writing_Templates#Common_statements) article.

<srcinclude noheader="true" tag="statements" lang="at" outdent="true">templates\cssTemplates\AnotherCSSTemplate.tpl.css</srcinclude>

As illustrated in the example below, CSS templates really come in handy when conditional processing or repetitive declarations are concerned.

### Special variables

Because they are meant to be shared among different modules, CSS templates do not have access to external data by design. They do however provide access to two special variables besides those explicitly declared in the template itself using <code>var</code>.  They are:

**<code>cssPath</code>*: the complete classpath of the CSS Template file, using folder notation, e.g. <code>ariadoc/snippets/templates/cssTemplates/MyCssTemplate</code>.

**<code>cssFolderPath</code>*: the URL of the CSS template location, relative to the [Aria.rootFolderPath](http://ariatemplates.com/aria/guide/apps/apidocs/#Aria:rootFolderPath:property).

The latter in particular is quite useful to define URLs of images located in the same folder as your CSS files.  Note that it takes into account the rootMap (not the urlMap) defined through the [download manager](Core_Layer_Configuration#Download_manager_configuration).

<srcinclude noheader="true" tag="specialvars" lang="at" outdent="true">templates\cssTemplates\AnotherCSSTemplate.tpl.css</srcinclude>

Both of these properties are inherited from the [CSSTemplate](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CSSTemplate) class.

### Declaration and configuration

CSS Templates can use inheritance.  Using *<code>$extends</code>* and the classpath of another CSS template, it makes it easy to reuse styles defined in other templates (see the [article about template inheritance](Template Inheritance).)

CSS Templates also support scripts when the *<code>$hasScript</code>* property is true.  The script has to be defined in the same way as for [HTML Templates](Template_Scripts).)  This mechanism is particularly useful when complex logic has to be used.

Here's how a script method would be declared:
<srcinclude noheader="true" lang="javascript">templates\cssTemplates\AnotherCSSTemplateScript.js</srcinclude>
...and then used in a CSS template:
<srcinclude noheader="true" tag="script" lang="at" outdent="true">templates\cssTemplates\AnotherCSSTemplate.tpl.css</srcinclude>

{{Note|At the moment, [Macro Libraries](Macro_Libraries) cannot be used in CSS Templates.}}

## Using CSS templates

The framework provides automatic scoping for style rules defined in CSS templates in order to avoid collisions.  This is done transparently by prefixing all the definitions with a unique global class selector assigned to the HTML element in which the template is rendered.

For instance, an application may include two different templates with their own css style for the main header:

<syntaxhighlight lang="at">
h1 {
    color: red;
}
</syntaxhighlight>

and

<syntaxhighlight lang="at">
h1 {
    color: green;
}
</syntaxhighlight>

These 2 rules will be translated as follow by AT:

<syntaxhighlight lang="at">
.CSS1 h1 {
    color: red;
}
.CSS2 h1 {
    color: green;
}
</syntaxhighlight>

This definition is ultimately injected in a <code><style></code> statement inside the <code><head></code> of the page.  The HTML container of the respective templates are then assigned the <code>CSS1</code> and <code>CSS2</code> classes.

Note that it is also possible to include a CSS template as dependency in a normal class, using the <code>$css</code> property.  This is mainly used when defining [custom widgets](Widget_Libraries).

## CSS Template code sample

<sample sample="templates/cssTemplates" />

A few remarks on this example:

* Two macros are defined inside the css template (*<code>opacity</code>* and *<code>roundedCorners</code>*). Macros and control statements can be useful for generating CSS rules that depend on the browser.

* The *<code>cssFolderPath</code>* has been used in order to specify the path of the background pattern image.

* The *<code>cssClass</code>* and *<code>type</code>* configuration properties of sections have been used in order to style them in the CSS template.

* The *<code>getClassName</code>* and *<code>setClassName</code>* methods of the [aria.templates.DomElementWrapper](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.DomElementWrapper) class are used in the template script in order to change the appearance of each item after clicking on it.