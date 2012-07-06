Title: Writing Templates


This page describes the syntax used to write templates.  You will find here a complete documentation on statements as well as details regarding variables and the use of metadata in your data model.

## Special characters and comments

Because they have special meanings inside a template file, characters used in template tags will need to be escaped if you want to display them.  These characters are: ` $ { } \` and need to be escaped using the `\` (backslash) character.

Comments in templates use the same format as in Java:
<syntaxhighlight lang="AT">
// you can use single line comments...
/* ...or multiline
   when needed */
</syntaxhighlight>

Be careful though:

*If a single line comment is preceded by a colon, it will be ignored (and parsed as a URL)
 <nowiki>http://obviously.not.a.comment</nowiki>

*If you need to use the `/*` sequence inside a string, you will need to escape it, otherwise it will be interpreted as a comment:
 "String containing /\*"

## Expressions

*`${...}`* displays the value returned by the evaluation of the JavaScript expression it contains.

Expressions are widely used in templates, essentially to output the content of a variable, like:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
or to display the value returned by the call to a method (defined in the [template script](template_scripts)), like this:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

Expressions can also be used to execute Javascript statements, but remember that the return value of this statement will be displayed in the template.

For instance, if you write the following:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
the content of `myVar` will be pushed into `myArray` and the template output will be the array's new length.  If you want to execute Javascript code inside the template without displaying the return value, you can either:
* store it in the Template Script file in a method that doesn't return anything or
* use the [`var`](writing_templates#var) statement that will assign the return value to a variable instead of displaying it, or
* use the `eat` modifier described below.

### Modifiers

Modifiers are predefined functions that you can use to change a value you want to display. They can be chained to change a value in several ways. The syntax of modifiers is 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

Note that in modifiers parameters, pipe characters `|` have to be escaped.

Modifiers may only accept one parameter, but it can be of any type.  They also can be chained.  In the code example above, `modifier1` is applied to `value`, `modifier2` is then applied to the result, and so on.

#### List of available modifiers

* *`eat`*
This modifier returns an empty string for any entry.

* *`escape`*
This modifier returns the entry with &lt;, &gt; and &amp; escaped.

* *`capitalize`*
This modifier returns the entry in capital letters.

* *`default`*
 Parameter: a string used as default value.
This modifier returns the default value if the entry value is equal to null (this is a non-strict equal, so "" is considered as null).

* *`empty`*
 Parameter: a string used as default value.
This modifier is the same as default modifier, but it also returns the default value if the entry is a string composed of whitespace characters.

Example:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
returns the content of `myValue` to uppercase if it is not null, nor an empty string, nor a string composed of white spaces, otherwise it will return `MYDEFAULTVALUE`. 

* *`dateformat`*
 Parameter: the format pattern for the date to display.
This modifier formats a JSDate entry according to the given pattern.

Example
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
More information on patterns can be [found here](localization_and_resources#date-and-time).
* `*timeformat*`
 Parameter: the format pattern for the time to display.
Similar to the dateformat this modifier formats a JSDate entry according to the given pattern.

Example
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
More information on patterns can be [found here](localization_and_resources#date-and-time).
* `*pad*`
 Parameters: 
  1. {Integer} the targeted string size (e.g. 10 to have a string with 10 characters), 
  2. _optional_ {Boolean} indicator telling if the padding should be at the beginning of the string
     default value=false (i.e. padding at the end of the string)
This modifier allows to add padding with non-breaking spaces in order to ensure a fixed length to the result string. This is particularly useful with displays using fixed-size fonts that use non-breaking spaces to align content in columns<br/>

Example
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

It is not possible at the moment to create custom modifiers.  You can however easily manipulate any kind of variable by means of [methods](#methods) defined in your [template script](template_scripts).

For example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

calls the method `myCustomModifier` that you have defined in the template script and that, upon receiving `myValue` as a parameter, processes it to return the string to display.

## Common statements

### Template

...

{{Note|This statement is (obviously) not accepted in [CSS Templates](css_templates).}}

### var

`var` can be used to assign a value to a named variable that can then be used in your template.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

More information about template variables can be found [here](#variables).

### set

`set` can be used to assign a new value to an already defined variable. It has to be used inside a [macro](#macro).

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

More information about template variables can be found [here](#variables).

### checkDefault

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The `checkDefault` statement can be used to assign a value to a named variable only if it is not already defined to a non-null value.

The syntax is as follows:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

In the above example, assuming that `v` was already defined and is equal to `2`, then the statement would have no effect. However, if `v` was either null or undefined, then it would be set to `1`.

### if...else

The if statement, just like in a JavaScript file, evaluates a variable or expression, and if that variable or expression evaluates to "true" the contents of the block are executed.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

### for

Loops over a collection of items defined by a JavaScript expression. Any JavaScript expression permitted in the normal JavaScript `for` statement will work here.

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

### foreach

The `foreach` statement allows to loop over a map, an array or a [view](views).

Consider the following syntax:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

* `myMap`, `myArray` and `myView` are respectively a map, an array and a view.
* different `in...` keywords are available:
	* `in` to iterate over a map.
	* `inArray` to iterate over an array. Even if it is possible to iterate over an array using the `in` keyword, the `inArray` keyword should be used instead because it has better performances and ensures the correct order (it uses internally, in JavaScript: `for (var i=0;i<length;i++) {...}` which is better than: `for (var i in myArray) {...}` used for the in keyword).
	* `inSortedView` to iterate over a view, taking into account only the sort order (no filtering nor paging).
	* `inFilteredView` to iterate over the filtered in elements of a view, taking into account the sort order but not the paging.
	* `inView` or `inPagedView` to iterate over the filtered in elements of the current page in the view, taking into account the sort order.
* `varName`: name of the variable which will take the successive values in the array. Other variables constructed from this variable name are also available in a `foreach` loop:
	* `varName_index`: when iterating over arrays and maps, it is the index of the element inside the array or the map `(varName = expression[varName_index])`. When iterating over views, it is the index inside the items property of the view `(varName = expression.items[varName_index].value)`.
	* `varName_ct`: counter starting from 1 for the first loop and incremented at each loop.
	* `varName_info`: when iterating over views, contains information about the item `(varName_info = expression.items[varName_index])`. It is a Json object of type [aria.templates.ViewCfgBeans.Item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans:Item).  Here is the list of properties available:
		* `varName_info.value` Link to the value in the initial array or map.
		* `varName_info.initIndex` Index of the element inside the initial array or key of the element inside the initial map.
		* `varName_info.filteredIn` Indicates whether the element is filtered in or not.
		* `varName_info.sortKey` Last sort key used for this element.
		* `varName_info.pageIndex` Index of the page to which the element belongs. If not in page mode, it is 0 for all filtered in elements. If `filteredIn` is false, pageIndex = -1.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

### separator

The separator statement is a convenient way to add a separator between each loop in a [`foreach`](#foreach) structure.
If present, it must be the first statement inside a `foreach` loop.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

### macro

A macro is an independent piece of template code that can be executed whenever needed (see the `call` statement).

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

Wrapping pieces of template code into macros is useful when a particular part needs to be reused in several places. It is also a good idea when a piece of code becomes complex with `if` and `for` statements and depends on parameters.

Macros are equivalent to JavaScript functions, and in fact, they are actually transformed into functions when a [template is interpreted and turned into a class](what_are_templates?#lifecycle).

*The macro `main` serves as the entry point to the template* - its arguments are those passed when [loading the template](what_are_template?). Other macros must be called through the [`call`](#call) statement.

Macros can be defined also in separate templates that are called [macro libraries](macro_libraries). Also, they can be inherited from parent templates thanks to [template inheritance](template_inheritance).

### call

The `call` statement allows you to execute a macro.
* call a macro defined inside the template (or inside a [parent template](template_inheritance))
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
* call a macro defined in a [macro library](macro_libraries) (called `myMacroLib`)
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
* when macro `myMacro` is defined in a parent template (with class name `$MyParentTemplate`) and overridden, it is still possible to call the parent template macro
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

## DOM statements

### id

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The `id` statement should be used to add an id on a DOM element, so that it (or its child elements) can be accessed through a wrapper from the [template script](template_scripts) (through the `$getElementById` and `$getChild` methods). The generated id does not correspond to the original id. It is indeed modified by the framework so that there is no name conflict in case the same id is used in two different templates, or if the same template is used twice. In fact, raw html ids must not be used to avoid collisions and support multiple parallel instances of the same template.

It is used in the following way:
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

Read the articles about [template scripts](template scripts) and [DOM interactions](interactions with the dom) in order to learn how to retrieve elements through their ids and interact with them.

### on

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The `on` statement is used to attach events handlers to DOM elements.

Please check the [dom events](dom_events) article for details about how to use it.

## Advanced template statements

### CDATA

The CDATA container is used to output character data in the template that will not be parsed by the parser. CDATA cannot be nested. This container in useful to display source code. CDATA preserves spaces, returns, tabulations and comments.

The following code

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

will display in the page:

 // my comment
     ${myVar}
 5

### section

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The section denotes a sub part of a template that may be refreshed independently (when refreshing the whole template is not needed). Read the article about [template refresh](refresh) in order to learn about a section refresh can be triggered.

Examples
* Simplest form:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

The configuration of a section requires to specify the following properties:
* *`id`*: id that can be useful for manipulating or refreshing the section.
* *`macro`*: name macro that outputs the content of the section. It is called whenever the section markup has to be generated.


* Advanced usage

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>
This example contains all the configuration properties currently available for sections (see [aria.templates.CfgBeans.SectionCfg](http://ariatemplates.com/api/#aria.templates.CfgBeans.SectionCfg)). In particular:
* *`macro`* is now a Json Object that contains the name of the macro, a list of parameters to pass to the macro, and also a scope (by default it is `this`, but it might be also a macro library or a parent template).
* *`type`* and *`attributes`* denote respectively the tag name of the HTML element that wraps the section content and the attributes that you want to set on that tag. The list of allowed attributes is specified [here](http://ariatemplates.com/api/#aria.templates.CfgBeans:HtmlAttribute).
* *`bindRefreshTo`* specifies the values of the data model to which the referesh of the section is automatically bound. Bindings and automatic refreshes are key features of Aria Templates and are described in due details in [this article](refresh#section-automatic-refresh).
* *`bindProcessingTo`* allows to display a loading indicator on top of a section depending on whether a certain value is true or false. Optionally, a *`processingLabel`* can be specified. Loading indicators are treated in [this article](interactions with the dom).
* *`keyMap`* and *`tableNav`* allow to define section-specific keyboard shortcuts and table navigation options. Refer to [this article](keyboard_navigation) to learn more about keyboard navigation.

### createView

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The `createView` statement is used to create a view on an array or a map. A view is an object through which sorting, filtering and paging can be achieved easily (for more information, the [Views](views) article explains in more details how this is done).

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

* `viewName` name of the view to be created. It is accessible through this name in the macro where the statement is, or in the whole template if the statement is out of any macro. `viewName` can have the form `baseName[param]` or `baseName[param1][param2]` ... with any number of parameters (if you need arrays of views).
* `arrayOrMap` array or map on which the view has to be created.

The view is stored in the data model, as a private metadata of the template. The `createView` statement does not create the view if it already exists.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

### repeater

{{Note|This statement is not accepted in [CSS Templates](css_templates).}}

The `repeater` statement is somehow similar to a 
`foreach` loop, with the main difference that it creates refreshable sections for each item in the loop, so that insertion and removal of these sections can be handled transparently when changes are done in the iterated set. For example, adding an item in the iterated set will not trigger a refresh of the sections associated to the other items. For this reason, repeaters can be very useful for improving the performance of your application and their usage is strongly encouraged when the usecase allows to.

Consider the following example:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/templates/writingTemplates/TemplateStatements.tpl' defer></script>

The `repeater` is a special kind of section, containing a dynamic number of child sections. All the properties from the section statement are supported, both in the parent section (except the macro property, as the content is managed by the repeater) and in the child sections.

For child section properties, it is possible to set either a constant value (to have the same value for all child sections) or a callback function to make the value depend on the child section. An item parameter is given to the callback function and to the macro specified in the `childSections` property, containing the following properties:

* *sectionId*: id of the section, including the suffix
* *sectionIdSuffix*: suffix part of the section id
* *iteratedSet*: reference to the iterated set (the one declared in content, either an array, a view or a map)
* *item*: reference to the current item in the iterated set
* *index*: when iterating over arrays and maps, it is the index of the element inside the array or the map (`item = iteratedSet[index]`); when iterating over views, it is the index inside the items property of the view (`item = iteratedSet.items[index].value`)
* *ct*: counter starting from 1 for the first section and incremented at each section. This is a reliable variable to know the visual position of the section (may be used to determine the color for pyjama tables).
* *info*: when iterating over views, contains information about the item (json object of type [aria.templates.ViewCfgBeans.Item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans:Item), `info = iteratedSet.items[index]`)

Check [this article](refresh#repeater) for more information about repeaters.

See also the repeater [configuration](http://ariatemplates.com/api/#aria.templates.CfgBeans:RepeaterCfg) in the API reference.

## Variables

When working with templates it is very frequently needed to manage template-specific variables. Since templates can have [a very volatile existence](what_are_templates%3f#lifecycle), internal template variables persistence should be looked at very carefully. This section aims at explaining how to manage variables in your templates.

### Predefined variables

When writing your templates, some variables are made automatically available by the framework. Here are the most relevant ones:
* *`data`:* an object that references the data model. For a detailed presentation of the data model, refer to [this article](data model and data binding). This object should be used to store data that needs to be persisted through template refreshes.
**`moduleCtrl`:* it is the interface of the [module controller](controllers) that is provided when loading the template, if any.
**`flowCtrl`:* it is the interface of the [flow controller](flow controllers) associated with the module controller.
**`moduleRes`:* resources available in the module controller.
* any shortcut to [macro libraries](macro libraries), text templates and resources that you define in the configuration of your template.

Other variables are also available, but they are not used very frequently. In particular:
* the configuration properties, for example `$classpath`, `$width` and `$height` (see the [article on adaptive display](adaptive display) for more information about the value that they are given), and so on.
* *`$json`:* it is a reference to the singleton class [aria.utils.Json](http://ariatemplates.com/api/#aria.utils.Json).
* references to the prototypes of the ancestor classes: every HTML template is transformed into a class that extends the [aria.templates.Template](http://ariatemplates.com/api/#aria.templates.Template) class, unless a parent template is specified (see the [article about template inheritance](template inheritance)). The prototypes of the ancestor classes are available at `$[name of the class]`.

### Defining variables

When you want to define your own template-related variables, you have two options:

* *using the [var statement](#var)*: you can define _global-scope_ variables by using the `var` statement outside any macro, or you can define _macro-scope_ variables by using the `var` statement inside a macro. When refreshing the template, macro-scope variables are reinitialized, whereas global-scope variables are persistent. However, keep in mind that global-scope variables are destroyed when refreshing the template that contains your template: in fact, in that case the instance of your subtemplate is completely disposed.

* *putting your variables inside the `data` object*: this is the correct solution if you want your data to be persistent over refreshes of any container template. However, you have to be aware of the origin of the data object: if it is the data model of a module controller that is disposed, you still lose all of your data. Most importantly, it is a good practice to use meta-data in order to store persistent information that is related to your template, as explained [here](data model and data binding).

## Methods

The methods available inside a template are
* those defined in [template script](template scripts). Furthermore, all [methods available in a template script](template_scripts#available-methods)
* Those defined in the module controller and flow controller associated to the template in its loading configuration (`moduleCtrl.moduleMethod` and `flowCtrl.flowMethod`). In this case, only methods exposed by the module/flow interfaces will be available.

Examples are available in the articles on [template scripts](template scripts), [module controllers](controllers) and [flow controllers](flow controllers).