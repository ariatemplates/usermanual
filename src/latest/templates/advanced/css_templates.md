Title: CSS Templates



CSS templates are special kinds of templates designed to bring the flexibility of Aria Templates to your style declarations.  CSS templates benefit from all the advantages of the template engine, such as variables, macros, control statements or scripts.

## Definition and use

CSS Templates are defined using the `CSSTemplate` statement and stored with the `.tpl.css` extension:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/MyCSSTemplate.tpl.css?noheader=true&lang=at&outdent=true' defer></script>
As shown above, in its simplest form, a CSS template really is a template file in which styles declarations are defined directly inside the `main` macro.

To use these declarations from an HTML template, you just need to reference the classpath in the `$css` configuration property:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/MyTemplate.tpl?noheader=true&lang=at&outdent=true' defer></script>
Note that `$css` expects an array since you might want to include more than just one CSS template.

## Similarities and differences with HTML templates

Of course, if CSS templates were just about embedding styles inside a template declaration they wouldn't be very useful.  Their interest obviously resides in the features offered by the templating engine.

### Syntax and allowed statements

You write CSS templates the same way you would write an HTML template.  The main difference is that you don't need to escape the curly brackets characters (`{` and `}`).  Contrary to basic CSS files, both comments formats (`//` and `/*...*/`) are accepted.

Most of the AT statements can be used in CSS templates and irrelevant ones (`id`, `on`, `section`, `checkDefault`, and `createView`) are noted as such in the [Writing Templates](writing_templates#common-statements) article.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/AnotherCSSTemplate.tpl.css?noheader=true&tag=statements&lang=at&outdent=true' defer></script>

As illustrated in the example below, CSS templates really come in handy when conditional processing or repetitive declarations are concerned.

### Special variables

Because they are meant to be shared among different modules, CSS templates do not have access to external data by design. They do however provide access to two special variables besides those explicitly declared in the template itself using `var`.  They are:


***`cssPath`**: the complete classpath of the CSS Template file, using folder notation, e.g. `ariadoc/snippets/templates/cssTemplates/MyCssTemplate`.

***`cssFolderPath`**: the URL of the CSS template location, relative to the [Aria.rootFolderPath](http://ariatemplates.com/api/#Aria:rootFolderPath:property).

The latter in particular is quite useful to define URLs of images located in the same folder as your CSS files.  Note that it takes into account the rootMap (not the urlMap) defined through the [download manager](core_layer_configuration#download-manager-configuration).

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/AnotherCSSTemplate.tpl.css?noheader=true&tag=specialvars&lang=at&outdent=true' defer></script>

Both of these properties are inherited from the [CSSTemplate](http://ariatemplates.com/api/#aria.templates.CSSTemplate) class.

### Declaration and configuration

CSS Templates can use inheritance.  Using **`$extends`** and the classpath of another CSS template, it makes it easy to reuse styles defined in other templates (see the [article about template inheritance](template_inheritance).)

CSS Templates also support scripts when the **`$hasScript`** property is true.  The script has to be defined in the same way as for [HTML Templates](template_scripts).)  This mechanism is particularly useful when complex logic has to be used.

Here's how a script method would be declared:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/AnotherCSSTemplateScript.js?noheader=true&lang=javascript' defer></script>
...and then used in a CSS template:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/templates/cssTemplates/AnotherCSSTemplate.tpl.css?noheader=true&tag=script&lang=at&outdent=true' defer></script>

<div style="background:#FAFFDD;border:1px solid #EFFAB4;border-radius:3px;color:#666;font-size:12px;padding:2px 5px;"><strong>Note:</strong> At the moment, [macro_libraries](macro_libraries) cannot be used in CSS Templates.</div>

## Using CSS templates

The framework provides automatic scoping for style rules defined in CSS templates in order to avoid collisions.  This is done transparently by prefixing all the definitions with a unique global class selector assigned to the HTML element in which the template is rendered.

For instance, an application may include two different templates with their own css style for the main header:


<div data-sample="hardcoded"><code><pre>
h1 {
    color: red;
}
</code></pre></div>

and

<div data-sample="hardcoded"><code><pre>
h1 {
    color: green;
}
</code></pre></div>

These 2 rules will be translated as follow by AT:


<div data-sample="hardcoded"><code><pre>
.CSS1 h1 {
    color: red;
}
.CSS2 h1 {
    color: green;
}
</code></pre></div>

This definition is ultimately injected in a `<style>` statement inside the `<head>` of the page.  The HTML container of the respective templates are then assigned the `CSS1` and `CSS2` classes.

Note that it is also possible to include a CSS template as dependency in a normal class, using the `$css` property.  This is mainly used when defining [custom widgets](widget_libraries).

## CSS Template code sample

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/%VERSION%/samples/templates/cssTemplates/?skip=1' ></iframe>

A few remarks on this example:


* Two macros are defined inside the css template (**`opacity`** and **`roundedCorners`**). Macros and control statements can be useful for generating CSS rules that depend on the browser.

* The **`cssFolderPath`** has been used in order to specify the path of the background pattern image.

* The **`cssClass`** and **`type`** configuration properties of sections have been used in order to style them in the CSS template.

* The **`getClassName`** and **`setClassName`** methods of the [aria.templates.DomElementWrapper](http://ariatemplates.com/api/#aria.templates.DomElementWrapper) class are used in the template script in order to change the appearance of each item after clicking on it.