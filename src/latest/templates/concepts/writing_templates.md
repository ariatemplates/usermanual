Title: Writing Templates


This page describes the syntax used to write templates.  You will find here a complete documentation on statements as well as details regarding variables and the use of metadata in your data model.

## Special characters and comments

Because they have special meanings inside a template file, characters used in template tags will need to be escaped if you want to display them.  These characters are: <code> $ { } \</code> and need to be escaped using the <code>\</code> (backslash) character.

Comments in templates use the same format as in Java:
<syntaxhighlight lang="AT">
// you can use single line comments...
/* ...or multiline
   when needed */
</syntaxhighlight>

Be careful though:

*If a single line comment is preceded by a colon, it will be ignored (and parsed as a URL)
 <nowiki>http://obviously.not.a.comment</nowiki>

*If you need to use the <code>/*</code> sequence inside a string, you will need to escape it, otherwise it will be interpreted as a comment:
 "String containing /\*"

## Expressions

*<code>${...}</code>* displays the value returned by the evaluation of the JavaScript expression it contains.

Expressions are widely used in templates, essentially to output the content of a variable, like:
<srcinclude noheader="true" tag="basicStatementOne" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
or to display the value returned by the call to a method (defined in the [template script](Template_Scripts)), like this:
<srcinclude noheader="true" tag="basicStatementTwo" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

Expressions can also be used to execute Javascript statements, but remember that the return value of this statement will be displayed in the template.

For instance, if you write the following:
<srcinclude noheader="true" tag="basicStatementThree" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
the content of <code>myVar</code> will be pushed into <code>myArray</code> and the template output will be the array's new length.  If you want to execute Javascript code inside the template without displaying the return value, you can either:
* store it in the Template Script file in a method that doesn't return anything or
* use the <code>[var](Writing_Templates#var)</code> statement that will assign the return value to a variable instead of displaying it, or
* use the <code>eat</code> modifier described below.

### Modifiers

Modifiers are predefined functions that you can use to change a value you want to display. They can be chained to change a value in several ways. The syntax of modifiers is 

<srcinclude noheader="true" tag="sampleModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

Note that in modifiers parameters, pipe characters <code>|</code> have to be escaped.

Modifiers may only accept one parameter, but it can be of any type.  They also can be chained.  In the code example above, <code>modifier1</code> is applied to <code>value</code>, <code>modifier2</code> is then applied to the result, and so on.

#### List of available modifiers

* *<code>eat</code>*
This modifier returns an empty string for any entry.

* *<code>escape</code>*
This modifier returns the entry with &lt;, &gt; and &amp; escaped.

* *<code>capitalize</code>*
This modifier returns the entry in capital letters.

* *<code>default</code>*
 Parameter: a string used as default value.
This modifier returns the default value if the entry value is equal to null (this is a non-strict equal, so "" is considered as null).

* *<code>empty</code>*
 Parameter: a string used as default value.
This modifier is the same as default modifier, but it also returns the default value if the entry is a string composed of whitespace characters.

Example:
<srcinclude noheader="true" tag="emptyModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
returns the content of <code>myValue</code> to uppercase if it is not null, nor an empty string, nor a string composed of white spaces, otherwise it will return <code>MYDEFAULTVALUE</code>. 

* *<code>dateformat</code>*
 Parameter: the format pattern for the date to display.
This modifier formats a JSDate entry according to the given pattern.

Example
<srcinclude noheader="true" tag="dateModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
More information on patterns can be [found here](Localization_and_Resources#Date_and_Time).
* <code>*timeformat*</code>
 Parameter: the format pattern for the time to display.
Similar to the dateformat this modifier formats a JSDate entry according to the given pattern.

Example
<srcinclude noheader="true" tag="timeModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
More information on patterns can be [found here](Localization_and_Resources#Date_and_Time).
* <code>*pad*</code>
 Parameters: 
  1. {Integer} the targeted string size (e.g. 10 to have a string with 10 characters), 
  2. [optional] {Boolean} indicator telling if the padding should be at the beginning of the string
     default value=false (i.e. padding at the end of the string)
This modifier allows to add padding with non-breaking spaces in order to ensure a fixed length to the result string. This is particularly useful with displays using fixed-size fonts that use non-breaking spaces to align content in columns<br/>

Example
<srcinclude noheader="true" tag="padModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

It is not possible at the moment to create custom modifiers.  You can however easily manipulate any kind of variable by means of [methods](#Methods) defined in your [template script](Template_Scripts).

For example:

<srcinclude noheader="true" tag="customModifier" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

calls the method <code>myCustomModifier</code> that you have defined in the template script and that, upon receiving <code>myValue</code> as a parameter, processes it to return the string to display.

## Common statements

### Template

...

{{Note|This statement is (obviously) not accepted in [CSS Templates](CSS_Templates).}}

### var

<code>var</code> can be used to assign a value to a named variable that can then be used in your template.

<srcinclude noheader="true" tag="var" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

More information about template variables can be found [here](#Variables).

### set

<code>set</code> can be used to assign a new value to an already defined variable. It has to be used inside a [macro](#macro).

<srcinclude noheader="true" tag="set" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

More information about template variables can be found [here](#Variables).

### checkDefault

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The <code>checkDefault</code> statement can be used to assign a value to a named variable only if it is not already defined to a non-null value.

The syntax is as follows:

<srcinclude noheader="true" tag="checkDefault" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

In the above example, assuming that <code>v</code> was already defined and is equal to <code>2</code>, then the statement would have no effect. However, if <code>v</code> was either null or undefined, then it would be set to <code>1</code>.

### if...else

The if statement, just like in a JavaScript file, evaluates a variable or expression, and if that variable or expression evaluates to "true" the contents of the block are executed.

<srcinclude noheader="true" tag="ifelse" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

### for

Loops over a collection of items defined by a JavaScript expression. Any JavaScript expression permitted in the normal JavaScript <code>for</code> statement will work here.

<srcinclude noheader="true" tag="for" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

### foreach

The <code>foreach</code> statement allows to loop over a map, an array or a [view](Views).

Consider the following syntax:

<srcinclude noheader="true" tag="aforeach" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

* <code>myMap</code>, <code>myArray</code> and <code>myView</code> are respectively a map, an array and a view.
* different <code>in...</code> keywords are available:
	* <code>in</code> to iterate over a map.
	* <code>inArray</code> to iterate over an array. Even if it is possible to iterate over an array using the <code>in</code> keyword, the <code>inArray</code> keyword should be used instead because it has better performances and ensures the correct order (it uses internally, in JavaScript: <code>for (var i=0;i<length;i++) {...}</code> which is better than: <code>for (var i in myArray) {...}</code> used for the in keyword).
	* <code>inSortedView</code> to iterate over a view, taking into account only the sort order (no filtering nor paging).
	* <code>inFilteredView</code> to iterate over the filtered in elements of a view, taking into account the sort order but not the paging.
	* <code>inView</code> or <code>inPagedView</code> to iterate over the filtered in elements of the current page in the view, taking into account the sort order.
* <code>varName</code>: name of the variable which will take the successive values in the array. Other variables constructed from this variable name are also available in a <code>foreach</code> loop:
	* <code>varName_index</code>: when iterating over arrays and maps, it is the index of the element inside the array or the map <code>(varName = expression[varName_index])</code>. When iterating over views, it is the index inside the items property of the view <code>(varName = expression.items[varName_index].value)</code>.
	* <code>varName_ct</code>: counter starting from 1 for the first loop and incremented at each loop.
	* <code>varName_info</code>: when iterating over views, contains information about the item <code>(varName_info = expression.items[varName_index])</code>. It is a Json object of type [aria.templates.ViewCfgBeans.Item](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.ViewCfgBeans:Item).  Here is the list of properties available:
		* <code>varName_info.value</code> Link to the value in the initial array or map.
		* <code>varName_info.initIndex</code> Index of the element inside the initial array or key of the element inside the initial map.
		* <code>varName_info.filteredIn</code> Indicates whether the element is filtered in or not.
		* <code>varName_info.sortKey</code> Last sort key used for this element.
		* <code>varName_info.pageIndex</code> Index of the page to which the element belongs. If not in page mode, it is 0 for all filtered in elements. If <code>filteredIn</code> is false, pageIndex = -1.

Consider the following example:

<srcinclude noheader="true" tag="bforeachexample" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

### separator

The separator statement is a convenient way to add a separator between each loop in a [<code>foreach</code>](#foreach) structure.
If present, it must be the first statement inside a <code>foreach</code> loop.

Consider the following example:

<srcinclude noheader="true" tag="separator" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

### macro

A macro is an independent piece of template code that can be executed whenever needed (see the <code>call</code> statement).

<srcinclude noheader="true" tag="macro" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

Wrapping pieces of template code into macros is useful when a particular part needs to be reused in several places. It is also a good idea when a piece of code becomes complex with <code>if</code> and <code>for</code> statements and depends on parameters.

Macros are equivalent to JavaScript functions, and in fact, they are actually transformed into functions when a [template is interpreted and turned into a class](What_are_Templates?#Lifecycle).

*The macro <code>main</code> serves as the entry point to the template* - its arguments are those passed when [loading the template](What_are_template?). Other macros must be called through the [<code>call</code>](#call) statement.

Macros can be defined also in separate templates that are called [macro libraries](Macro_Libraries). Also, they can be inherited from parent templates thanks to [template inheritance](Template_Inheritance).

### call

The <code>call</code> statement allows you to execute a macro.
* call a macro defined inside the template (or inside a [parent template](Template_Inheritance))
<srcinclude noheader="true" tag="acall" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
* call a macro defined in a [macro library](Macro_Libraries) (called <code>myMacroLib</code>)
<srcinclude noheader="true" tag="bcall" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
* when macro <code>myMacro</code> is defined in a parent template (with class name <code>$MyParentTemplate</code>) and overridden, it is still possible to call the parent template macro
<srcinclude noheader="true" tag="ccall" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

## DOM statements

### id

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The <code>id</code> statement should be used to add an id on a DOM element, so that it (or its child elements) can be accessed through a wrapper from the [template script](Template_Scripts) (through the <code>$getElementById</code> and <code>$getChild</code> methods). The generated id does not correspond to the original id. It is indeed modified by the framework so that there is no name conflict in case the same id is used in two different templates, or if the same template is used twice. In fact, raw html ids must not be used to avoid collisions and support multiple parallel instances of the same template.

It is used in the following way:
<srcinclude noheader="true" tag="id" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

Read the articles about [template scripts](Template Scripts) and [DOM interactions](Interactions with the DOM) in order to learn how to retrieve elements through their ids and interact with them.

### on

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The <code>on</code> statement is used to attach events handlers to DOM elements.

Please check the [DOM Events](DOM_Events) article for details about how to use it.

## Advanced template statements

### CDATA

The CDATA container is used to output character data in the template that will not be parsed by the parser. CDATA cannot be nested. This container in useful to display source code. CDATA preserves spaces, returns, tabulations and comments.

The following code

<srcinclude noheader="true" tag="cdata" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

will display in the page:

 // my comment
     ${myVar}
 5

### section

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The section denotes a sub part of a template that may be refreshed independently (when refreshing the whole template is not needed). Read the article about [template refresh](Refresh) in order to learn about a section refresh can be triggered.

Examples
* Simplest form:

<srcinclude noheader="true" tag="asection" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

The configuration of a section requires to specify the following properties:
* *<code>id</code>*: id that can be useful for manipulating or refreshing the section.
* *<code>macro</code>*: name macro that outputs the content of the section. It is called whenever the section markup has to be generated.


* Advanced usage

<srcinclude noheader="true" tag="bsection" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>
This example contains all the configuration properties currently available for sections (see [aria.templates.CfgBeans.SectionCfg](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans.SectionCfg)). In particular:
* *<code>macro</code>* is now a Json Object that contains the name of the macro, a list of parameters to pass to the macro, and also a scope (by default it is <code>this</code>, but it might be also a macro library or a parent template).
* *<code>type</code>* and *<code>attributes</code>* denote respectively the tag name of the HTML element that wraps the section content and the attributes that you want to set on that tag. The list of allowed attributes is specified [here](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans:HtmlAttribute).
* *<code>bindRefreshTo</code>* specifies the values of the data model to which the referesh of the section is automatically bound. Bindings and automatic refreshes are key features of Aria Templates and are described in due details in [this article](Refresh#Section_automatic_refresh).
* *<code>bindProcessingTo</code>* allows to display a loading indicator on top of a section depending on whether a certain value is true or false. Optionally, a *<code>processingLabel</code>* can be specified. Loading indicators are treated in [this article](Interactions with the DOM).
* *<code>keyMap</code>* and *<code>tableNav</code>* allow to define section-specific keyboard shortcuts and table navigation options. Refer to [this article](Keyboard_Navigation) to learn more about keyboard navigation.

### createView

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The <code>createView</code> statement is used to create a view on an array or a map. A view is an object through which sorting, filtering and paging can be achieved easily (for more information, the [Views](Views) article explains in more details how this is done).

<srcinclude noheader="true" tag="view" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

* <code>viewName</code> name of the view to be created. It is accessible through this name in the macro where the statement is, or in the whole template if the statement is out of any macro. <code>viewName</code> can have the form <code>baseName[param]</code> or <code>baseName[param1][param2]</code> ... with any number of parameters (if you need arrays of views).
* <code>arrayOrMap</code> array or map on which the view has to be created.

The view is stored in the data model, as a private metadata of the template. The <code>createView</code> statement does not create the view if it already exists.

Consider the following example:

<srcinclude noheader="true" tag="anotherView" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

### repeater

{{Note|This statement is not accepted in [CSS Templates](CSS_Templates).}}

The <code>repeater</code> statement is somehow similar to a 
<code>foreach</code> loop, with the main difference that it creates refreshable sections for each item in the loop, so that insertion and removal of these sections can be handled transparently when changes are done in the iterated set. For example, adding an item in the iterated set will not trigger a refresh of the sections associated to the other items. For this reason, repeaters can be very useful for improving the performance of your application and their usage is strongly encouraged when the usecase allows to.

Consider the following example:

<srcinclude noheader="true" tag="repeater" lang="at" outdent="true">templates\writingTemplates\TemplateStatements.tpl</srcinclude>

The <code>repeater</code> is a special kind of section, containing a dynamic number of child sections. All the properties from the section statement are supported, both in the parent section (except the macro property, as the content is managed by the repeater) and in the child sections.

For child section properties, it is possible to set either a constant value (to have the same value for all child sections) or a callback function to make the value depend on the child section. An item parameter is given to the callback function and to the macro specified in the <code>childSections</code> property, containing the following properties:

* *sectionId*: id of the section, including the suffix
* *sectionIdSuffix*: suffix part of the section id
* *iteratedSet*: reference to the iterated set (the one declared in content, either an array, a view or a map)
* *item*: reference to the current item in the iterated set
* *index*: when iterating over arrays and maps, it is the index of the element inside the array or the map (<code>item = iteratedSet[index]</code>); when iterating over views, it is the index inside the items property of the view (<code>item = iteratedSet.items[index].value</code>)
* *ct*: counter starting from 1 for the first section and incremented at each section. This is a reliable variable to know the visual position of the section (may be used to determine the color for pyjama tables).
* *info*: when iterating over views, contains information about the item (json object of type [aria.templates.ViewCfgBeans.Item](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.ViewCfgBeans:Item), <code>info = iteratedSet.items[index]</code>)

Check [this article](Refresh#Repeater) for more information about repeaters.

See also the repeater [configuration](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans:RepeaterCfg) in the API reference.

## Variables

When working with templates it is very frequently needed to manage template-specific variables. Since templates can have [a very volatile existence](What_are_Templates%3F#Lifecycle), internal template variables persistence should be looked at very carefully. This section aims at explaining how to manage variables in your templates.

### Predefined variables

When writing your templates, some variables are made automatically available by the framework. Here are the most relevant ones:
* *<code>data</code>:* an object that references the data model. For a detailed presentation of the data model, refer to [this article](Data Model and Data Binding). This object should be used to store data that needs to be persisted through template refreshes.
**<code>moduleCtrl</code>:* it is the interface of the [module controller](Controllers) that is provided when loading the template, if any.
**<code>flowCtrl</code>:* it is the interface of the [flow controller](Flow Controllers) associated with the module controller.
**<code>moduleRes</code>:* resources available in the module controller.
* any shortcut to [macro libraries](Macro Libraries), text templates and resources that you define in the configuration of your template.

Other variables are also available, but they are not used very frequently. In particular:
* the configuration properties, for example <code>$classpath</code>, <code>$width</code> and <code>$height</code> (see the [article on adaptive display](Adaptive Display) for more information about the value that they are given), and so on.
* *<code>$json</code>:* it is a reference to the singleton class [aria.utils.Json](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Json).
* references to the prototypes of the ancestor classes: every HTML template is transformed into a class that extends the [aria.templates.Template](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.Template) class, unless a parent template is specified (see the [article about template inheritance](Template Inheritance)). The prototypes of the ancestor classes are available at <code>$[name of the class]</code>.

### Defining variables

When you want to define your own template-related variables, you have two options:

* *using the [var statement](#var)*: you can define _global-scope_ variables by using the <code>var</code> statement outside any macro, or you can define _macro-scope_ variables by using the <code>var</code> statement inside a macro. When refreshing the template, macro-scope variables are reinitialized, whereas global-scope variables are persistent. However, keep in mind that global-scope variables are destroyed when refreshing the template that contains your template: in fact, in that case the instance of your subtemplate is completely disposed.

* *putting your variables inside the <code>data</code> object*: this is the correct solution if you want your data to be persistent over refreshes of any container template. However, you have to be aware of the origin of the data object: if it is the data model of a module controller that is disposed, you still lose all of your data. Most importantly, it is a good practice to use meta-data in order to store persistent information that is related to your template, as explained [here](Data Model and Data Binding).

## Methods

The methods available inside a template are
* those defined in [template script](Template Scripts). Furthermore, all [methods available in a template script](Template_Scripts#Available_methods)
* Those defined in the module controller and flow controller associated to the template in its loading configuration (<code>moduleCtrl.moduleMethod</code> and <code>flowCtrl.flowMethod</code>). In this case, only methods exposed by the module/flow interfaces will be available.

Examples are available in the articles on [template scripts](Template Scripts), [module controllers](Controllers) and [flow controllers](Flow Controllers).