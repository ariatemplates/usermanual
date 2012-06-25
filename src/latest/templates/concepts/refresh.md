Title: Refresh


The traditional ways of updating the UI in a web application means either reloading the entire page from the server (aka web 1.0 navigation) or, more generally, modifying the DOM using scripting.  While the latter works well for small changes, it quickly becomes challenging when complex updates must be performed, often leading to cross-browser display issues and memory leaks.

{{Note|The refresh strategy you choose can greatly influence the perceived responsiveness of the application. It is in general advisable to choose automatic refresh.
}}

Aria Templates takes a different approach to the issue by redrawing the parts of your interface that need to be updated.  This is achieved by using one of these mechanisms:
* *[Automatic refresh](#Automatic_refresh)*: changes done in the data automatically trigger a redrawing of associated elements of the template.
* *[Manual refresh](#Manual_refresh)*: explicit redrawing of specific parts of the template is driven by code.
* *[Indirect DOM access](#Indirect_DOM_access)*: small UI updates where only CSS rules are involved are done using DOM wrappers.

In all cases, the developer never has to deal with direct access to the DOM, which allows for greater security and better code readability.

# Automatic refresh

In most cases, the most appropriate refresh mechanism is the automatic one. In Aria Templates, it is possible to *bind* the refresh of sections and widgets to parts of your data model. The framework then automatically adds listeners that will be notified whenever a change occurs (you can read more about listeners [here](Helpers#JSON_Helper).)

## Section automatic refresh

The [section statement](Writing_Templates#section) allows to bind the refresh of a container to a list of values. Consider this example: 

<srcinclude tag="sectionDefTwo" lang="at" outdent="true">templates\refresh\Refresh.tpl</srcinclude>

The property <code>bindRefreshTo</code> is an array of objects of type [aria.templates.CfgBeans.BindingConfiguration](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.CfgBeans:BindingConfiguration). Each binding configuration allows to specify a portion of data by its container (<code>inside</code>) and its key (<code>to</code>) inside the container. The framework will automatically [add a listener](Helpers#JSON_manipulation) to react to data changes. Indeed, you can also specify whether the listener has to be recursive or not by setting the <code>recursive</code> property of the binding (which defaults to true). A recursive listener will be notified if the specified node or any of its subnodes are changed. A non-recursive listener is notified only when the node itself is changed.

In the example above, the section <code>"autoSection"</code> is refreshed whenever <code>data.myContainer["myFirstValue"]</code> (or any of its subnodes) changes. The following code inside the template script would be able to change <code>data.myContainer["myFirstValue"]</code> and trigger a refresh at the same time:

<srcinclude tag="refreshThree" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

On the contrary, since the second binding is not recursive, the following code
<srcinclude tag="refreshFour" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>
would not trigger a refresh because a subnode of <code>data.myContainer["mySecondValue"]</code> is modified. The section would be refreshed by the following expression
<srcinclude tag="refreshFive" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

<code>this.$json</code> is a shortcut for the singleton class [aria.utils.Json](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Json). [This article](Helpers#JSON_manipulation) explains its role and introduces in more detail the concept of recursive/non-recursive listeners. Keep in mind that non-recursive listeners perform better.

Consider the following sample. By clicking on the "Increase" box, the score of a team is augmented and at the same time the display is refreshed.

<sample sample="templates/refresh/automatic" />

By looking at the data model of the sample, it is also possible to identify the metadata due to the automatic addition of a listener on the specified portion of the data model.

## Repeater

When you have an array or map that you iterate through to display the properties of their entries, it is a good idea to use a repeater. The [repeater statement](Writing_Templates#repeater) is somehow similar to a foreach loop, with the main difference that it creates refreshable sections for each item in the loop, so that insertion and removal of these sections can be done without refreshing the other sections. Consider the following sample:

<sample sample="templates/refresh/repeater" />

You can see that:
* the removal/insertion of new entries in the array are done by the methods [this.$json.add](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Json:add:method) and [this.$json.removeAt](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Json:removeAt:method) (look at the template script). These methods notify the listeners that the framework has added automatically on the repeater content.
* When updating the array by adding/removing entries, the other child sections are not refreshed.
* It is possible to specify all properties of a section configuration when defining <code>childSections</code>. Also, you can provide either a constant value (to have the same value for all child sections) or a callback function to make the value depend on the child section. In this case, the <code>bindRefreshTo</code> and the <code>attributes</code> properties are functions that return a different value according to the item (that is automatically given as a parameter to the callback).

For more information on the repeater statement go to [this article](Writing_Templates#repeater). If you want to learn about how to modify JSON objects in order to notify the listeners you might want to read [this article](Helpers#JSON_manipulation).

## Widget bindings

A very common situation in which you need to refresh your markup occurs when you have widgets. Aria Templates provides automatic bindings that allow you to bind some widgets properties to a piece of the data model. When this mechanism is used, you don't have to manually keep track of when the template should be refreshed: the widget itself keeps track of when it needs to be refreshed.

The documentation for this feature is available in [this article](Widget_Bindings).

# Manual refresh

Aria Templates allows to refresh a template from its template script by means of the *<code>$refresh</code>* method. The automatic refresh mechanism introduced in the [previous section](#Automatic_refresh) is based on this method, which is called automatically as a reaction to a data change.

## Full template refresh

A full template refresh is achieved by calling the <code>$refresh</code> method with no parameters in a template script. Consider the following sample.

<sample sample="templates/refresh/full" />

When clicking on the "refresh" div, the <code>fullTemplateRefresh</code> defined in the script is called. As you can see, this method simply calles the <code>$refresh</code> method with no parameters.

## Partial template refresh

It is cumbersome to perform a full refresh when it is not strictly needed. Indeed, it is possible to refresh only a section of a template by specifying the section id as parameter of the <code>$refresh</code> method. Suppose you define the following section in a template:

<srcinclude tag="sectionDef" lang="at" outdent="true">templates\refresh\Refresh.tpl</srcinclude>

You can refresh this section in the template script by using the following statements:
<srcinclude tag="refreshOne" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

Consider the following sample.

<sample sample="templates/refresh/partial" />

Additionally, you can also specify a <code>macro</code> property in the argument of the <code>$refresh</code> method:

<srcinclude tag="refreshTwo" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

By default, the macro that is called is the one specified in the configuration of the section with id <code>"mySectionId"</code>. In this case, the macro parameter is only useful to provide new parameters to the macro that would be called anyway.

However, if another macro is specified, the section markup will be replaced by the output of that macro.

# Stopping and resuming refreshes

In order to avoid duplicate and/or unnecessary refreshes, two statements are introduced:

<srcinclude tag="stopResumeOne" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

The statements should be called, respectively, _before_ and _after_ a number of updates to the data model:

<srcinclude tag="stopResumeTwo" lang="at" outdent="true">templates\refresh\RefreshScript.js</srcinclude>

When the <code>resume()</code> is called, the framework will automatically work out the minimum number of refreshes which account for all the changes occurred while in the <i>stopped</i> state. It is important to note that [module controllers](Controllers) methods are automatically wrapped in <code>stop()</code>/<code>resume()</code>.

Play with the following sample that uses the repeater seen above with the possibility to stop and resume the refresh manager.

<sample sample="templates/refresh/stopresume" />

# Indirect DOM access

As explained in [this article](Interactions_with_the_DOM#DOM_elements_wrappers), Aria Templates provides a scoped access to DOM elements in order to facilitate simple UI updates that would not require a complete refresh.

The typical way to provide easy visual feedback in a web application is to rely on CSS rules updates.  This can be achieved in AT by using the <code>getClassName()</code> and <code>setClassName()</code> methods of the [aria.templates.DomElementWrapper](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.DomElementWrapper) class.

>> sample

In Aria Templates, Refresh operations (automatic or manual) should mainly be used when the DOM actually needs to be modified.  In cases where the elements remain the same but their appearance change, it is clearly preferable to rely on CSS and use the <code>DomElementWrapper</code>, keeping in mind that these changes will not be restored after a refresh.