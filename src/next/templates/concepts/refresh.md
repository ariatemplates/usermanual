Title: Refresh


The traditional ways of updating the UI in a web application means either reloading the entire page from the server (aka web 1.0 navigation) or, more generally, modifying the DOM using scripting.  While the latter works well for small changes, it quickly becomes challenging when complex updates must be performed, often leading to cross-browser display issues and memory leaks.

<div style="background:#FAFFDD;border:1px solid #EFFAB4;border-radius:3px;color:#666;font-size:12px;padding:2px 5px;">**Note:** The refresh strategy you choose can greatly influence the perceived responsiveness of the application. It is in general advisable to choose automatic refresh.
</div>

Aria Templates takes a different approach to the issue by redrawing the parts of your interface that need to be updated.  This is achieved by using one of these mechanisms:

* **[Automatic refresh](#automatic-refresh)**: changes done in the data automatically trigger a redrawing of associated elements of the template.
* **[Manual refresh](#manual-refresh)**: explicit redrawing of specific parts of the template is driven by code.
* **[Indirect DOM access](#indirect-dom-access)**: small UI updates where only CSS rules are involved are done using DOM wrappers.

In all cases, the developer never has to deal with direct access to the DOM, which allows for greater security and better code readability.

## Automatic refresh

In most cases, the most appropriate refresh mechanism is the automatic one. In Aria Templates, it is possible to **bind** the refresh of sections and widgets to parts of your data model. The framework then automatically adds listeners that will be notified whenever a change occurs (you can read more about listeners [here](helpers#json-helper).)

### Section automatic refresh

The [section statement](writing_templates#section) allows to bind the refresh of a container to a list of values. Consider this example:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/Refresh.tpl?tag=sectionDefTwo&lang=at&outdent=true'></script>

The property `bindRefreshTo` is an array of objects of type <code>[aria.templates.CfgBeans.BindingConfiguration](http://ariatemplates.com/api/#aria.templates.CfgBeans:BindingConfiguration)</code>. Each binding configuration allows to specify a portion of data by its container (`inside`) and its key (`to`) inside the container. The framework will automatically [add a listener](helpers#json-manipulation) to react to data changes. Indeed, you can also specify whether the listener has to be recursive or not by setting the `recursive` property of the binding (which defaults to true). A recursive listener will be notified if the specified node or any of its subnodes are changed. A non-recursive listener is notified only when the node itself is changed.

In the example above, the section `"autoSection"` is refreshed whenever `data.myContainer["myFirstValue"]` (or any of its subnodes) changes. The following code inside the template script would be able to change `data.myContainer["myFirstValue"]` and trigger a refresh at the same time:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=refreshThree&lang=at&outdent=true'></script>

On the contrary, since the second binding is not recursive, the following code
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=refreshFour&lang=at&outdent=true'></script>
would not trigger a refresh because a subnode of `data.myContainer["mySecondValue"]` is modified. The section would be refreshed by the following expression
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=refreshFive&lang=at&outdent=true'></script>

`this.$json` is a shortcut for the singleton class <code>[aria.utils.Json](http://ariatemplates.com/api/#aria.utils.Json)</code>. [This article](helpers#json-manipulation) explains its role and introduces in more detail the concept of recursive/non-recursive listeners. Keep in mind that non-recursive listeners perform better.

Consider the following sample. By clicking on the "Increase" box, the score of a team is augmented and at the same time the display is refreshed.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/automatic/'></iframe>

By looking at the data model of the sample, it is also possible to identify the metadata due to the automatic addition of a listener on the specified portion of the data model.

### Animations for sections

It is possible to animate sections across refreshes.
The `animation` property allows to specify `animateIn` and `animateOut` as strings selecting the desired kind of animation as shown [here](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.pageEngine.CfgBeans:PageAnimation).

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/Refresh.tpl?tag=sectionDefFour&lang=at&outdent=true'></script>

This Section property can also be bound to a variable as shown in the following snippet.
The `bindRefreshTo` items accept the `animate` boolean value that specifies whether the animation should be activated when a refresh occurs due to a change in the data described in that refresh binding. It defaults to true. Anyway, even if it is equal to true, when no animation property is configured (either herd-coded or through bindings) for the section, no animation will be performed.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/Refresh.tpl?tag=sectionDefThree&lang=at&outdent=true'></script>

Furthermore, in case of manual refresh, the `animate` property provides the possibility to refresh a Section without animating it:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/Refresh.tpl?tag=sectionDefFive&lang=at&outdent=true'></script>

Even in this case, the animate value defaults to true.

You can see in action the described features of animations for section in the following sample:

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/animate/'></iframe>


### Repeater

When you have an array or map that you iterate through to display the properties of their entries, it is a good idea to use a repeater. The [repeater statement](writing_templates#repeater) is somehow similar to a foreach loop, with the main difference that it creates refreshable sections for each item in the loop, so that insertion and removal of these sections can be done without refreshing the other sections. Consider the following sample:

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/repeater/' ></iframe>

You can see that:

* the removal/insertion of new entries in the array are done by the methods <code>[this.$json.add](http://ariatemplates.com/api/#aria.utils.Json:add:method)</code> and <code>[this.$json.removeAt](http://ariatemplates.com/api/#aria.utils.Json:removeAt:method)</code> (look at the template script). These methods notify the listeners that the framework has added automatically on the repeater content.
* When updating the array by adding/removing entries, the other child sections are not refreshed.
* It is possible to specify all properties of a section configuration when defining `childSections`. Also, you can provide either a constant value (to have the same value for all child sections) or a callback function to make the value depend on the child section. In this case, the `bindRefreshTo` and the `attributes` properties are functions that return a different value according to the item (that is automatically given as a parameter to the callback).
* Since the `attributes` configuration property has an impact on the container of each child section, if you provide a function, it will be called for each child section whenever you update the bound map/array, even when simply removing or adding an entry. The newly computed attributes will be applied to each child section. This feature allows, for instance, to update the className applied to each section. It is used in the above example in order to obtain a pyjama table effect.

For more information on the repeater statement go to [this article](writing_templates#repeater). If you want to learn about how to modify JSON objects in order to notify the listeners you might want to read [this article](helpers#json-manipulation).

### Widget bindings

A very common situation in which you need to refresh your markup occurs when you have widgets. Aria Templates provides automatic bindings that allow you to bind some widgets properties to a piece of the data model. When this mechanism is used, you don't have to manually keep track of when the template should be refreshed: the widget itself keeps track of when it needs to be refreshed.

The documentation for this feature is available in [this article](widget_bindings).

## Manual refresh

Aria Templates allows to refresh a template from its template script by means of the **`$refresh`** method. The automatic refresh mechanism introduced in the [previous section](#automatic-refresh) is based on this method, which is called automatically as a reaction to a data change.

### Full template refresh

A full template refresh is achieved by calling the `$refresh` method with no parameters in a template script. Consider the following sample.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/full/' ></iframe>

When clicking on the "refresh" div, the `fullTemplateRefresh` defined in the script is called. As you can see, this method simply calles the `$refresh` method with no parameters.

### Partial template refresh

It is cumbersome to perform a full refresh when it is not strictly needed. Indeed, it is possible to refresh only a section of a template by specifying the section id as parameter of the `$refresh` method. Suppose you define the following section in a template:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/Refresh.tpl?tag=sectionDef&lang=at&outdent=true'></script>

You can refresh this section in the template script by using the following statements:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=refreshOne&lang=at&outdent=true'></script>

Consider the following sample.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/partial/' ></iframe>

Additionally, you can also specify a `macro` property in the argument of the `$refresh` method:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=refreshTwo&lang=at&outdent=true'></script>

By default, the macro that is called is the one specified in the configuration of the section with id `"mySectionId"`. In this case, the macro parameter is only useful to provide new parameters to the macro that would be called anyway.

However, if another macro is specified, the section markup will be replaced by the output of that macro.

## Stopping and resuming refreshes

In order to avoid duplicate and/or unnecessary refreshes, two statements are introduced:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=stopResumeOne&lang=at&outdent=true'></script>

The statements should be called, respectively, _before_ and _after_ a number of updates to the data model:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/refresh/RefreshScript.js?tag=stopResumeTwo&lang=at&outdent=true'></script>

When the `resume()` is called, the framework will automatically work out the minimum number of refreshes which account for all the changes occurred while in the <i>stopped</i> state. It is important to note that [module controllers](controllers) methods are automatically wrapped in `stop()`/`resume()`.

Play with the following sample that uses the repeater seen above with the possibility to stop and resume the refresh manager.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/refresh/stopresume/' ></iframe>

## Indirect DOM access

As explained in [this article](interactions_with_the_dom#dom-elements-wrappers), Aria Templates provides a scoped access to DOM elements in order to facilitate simple UI updates that would not require a complete refresh.

The typical way to provide easy visual feedback in a web application is to rely on CSS rules updates.  This can be achieved in AT by using the `getClassName()` and `setClassName()` methods of the [aria.templates.DomElementWrapper](http://ariatemplates.com/api/#aria.templates.DomElementWrapper) class.

<div data-sample="missing">missing sample</div>

In Aria Templates, Refresh operations (automatic or manual) should mainly be used when the DOM actually needs to be modified.  In cases where the elements remain the same but their appearance change, it is clearly preferable to rely on CSS and use the `DomElementWrapper`, keeping in mind that these changes will not be restored after a refresh.