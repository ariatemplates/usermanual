Title: Views


Among common use cases web application developers have to deal with on a daily basis, <span style="background:#ffc">filtering, sorting and paging</span> are probably the most frequent ones when it comes to manipulate sets of data.  Template Views, or just Views for short, have been designed to make implementation of these use cases easier.

A View allows you to work on any part of your data model you want without actually modifying it: it provides a <span style="background:#ffc">copy of the data as well as a set of methods to manipulate it</span>.

To use Views, you first need to create one.  You do that using the <code>createView</code> statement:

<syntaxhighlight lang="AT">
{createView vHotels on data.hotels/}
</syntaxhighlight>

Provided that <code>data.hotels</code> is an Array or a Map, this statement will create a <code>vHotels</code> variable.  If it has been created inside a macro (including the <code>main</code> macro), its scope will be local and the view will only be available from inside the macro.  If it has been set as a global variable, the view will be available both from the template using <code>vHotels</code> and from its associated script using <code>this.vHotels</code>.

Let's now see how ways we can use this object.

==Filtering==

In order to use the View filtering mechanism, <span style="background:#ffc">you simply define which of its elements should be kept</span>.  This is achieved by using the <code>filterIn()</code> method.

Let's see how it is used in a template script:

<syntaxhighlight lang="javascript">
this.vHotels.filterIn(this.vHotels.FILTER_SET, function(o) {
    return (o.value.price < 200);
});
</syntaxhighlight>

This example tells the view to keep only hotels for which the daily rate is beyond 200€.

Two arguments are passed to <code>filterIn()</code>:
* The *filter type*, which defines how the filter should be applied to the View.  In this example, the <code>FILTER_SET</code> property of the View class states that the filter must be applied to all the items in the View.  We will see other possible values below.
* The *filter method* (inline or reference), which is provided with a single argument, a [View item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans), and must return a boolean value indicating whether this item should be kept or not.  This object gives access to the following properties:
	*<code>value</code>: the item itself.
	*<code>initIndex</code>: the index of the item if the initial container is an array, or its key if it is a map.
	*<code>sortKey</code>: (when using sorting) the last used sort key of the item.
	*<code>filteredIn</code>: (when using filtering) a boolean value indicating whether the item is filtered in.
	*<code>pageIndex</code>: (when using paging) the index of the page in which the item appears.

To display the content of a View using the filter mode, you must <span style="background:#ffc">iterate over the items using the <code>inFilteredView</code> keyword</span> as follows:

<syntaxhighlight lang="AT">
{foreach htl inFilteredView vHotels}
    <li>${htl.name} (${htl.price})</li>
{/foreach}
</syntaxhighlight>

===Combining filters===

Once a filter is set, you can add new ones to <span style="background:#ffc">filter in more items using the Views <code>FILTER_ADD</code></span> property:

<syntaxhighlight lang="javascript">
this.vHotels.filterIn(this.vHotels.FILTER_ADD, function(o) {
    return (o.value.stars >= 5);
});
</syntaxhighlight>

In this case, the filter method is applied to items that are not filtered in.  This example, added to the previously set filter, instructs the View to list all hotels for which the daily rate is beyond 200€ *or* which have at least 5 stars.

Conversely, it is also possible to specify new filters to <span style="background:#ffc">refine the list of items to be kept using the <code>FILTER_REMOVE</code></span> property:

<syntaxhighlight lang="javascript">
this.vHotels.filterIn(this.vHotels.FILTER_REMOVE, function(o) {
    return (o.value.stars > 2);
});
</syntaxhighlight>

In this case, the filter method is applied to items that are already filtered in.  This example, added with the first filter we've set, tells the View to list all hotels for which the daily rate is beyond 200€ *and* which have more than 2 stars.

===Additional features===

The [aria.templates.View](http://ariatemplates.com/api/#aria.templates.View) class provides useful features to handle common filtering tasks:

* <code>allFilteredIn()</code>: a method to filter in all the items of the view.
* <code>allFilteredOut()</code>: a method to remove all the items from the view.
* <code>filteredInCount</code>: a property that returns the number of items currently filtered in.

===Example===
<sample sample="templates/views/filtering" />

==Sorting==

Sorting items of a View is achieved by using the <code>setSort()</code> method, as illustrated in this example:

<syntaxhighlight lang="javascript">
this.vHotels.setSort(this.vHotels.SORT_ASCENDING, "sortByPrice", function(o) {
    return o.value.price;
});
</syntaxhighlight>

This method requires three parameters:
* The *sort order*, a self-explaining constant which can have the following values: <code>SORT_ASCENDING</code>, <code>SORT_DESCENDING</code> and <code>SORT_INITIAL</code>.  The latter sets the items of the View in the same order as in the original container from which was created.
* The *sort name*, a string of your choice which will be used as an identifier for the current sort key method.
* The *sort key method* (inline or reference), which is provided with a single argument, a [View item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans), and must return the item property that will be used for sorting.

<span style="color:#D13838">Be careful!</span>  When using Views on maps, if you set the sort order to <code>SORT_INITIAL</code>, the order in which the elements of the View will be accessed is browser dependent.  You can check [this post](http://ejohn.org/blog/javascript-in-chrome/) by J. Resig to read details about this.

To display the content of a View using the sorting mode, you must <span style="background:#ffc">iterate over the items using the <code>inSortedView</code> keyword</span> as follows:

<syntaxhighlight lang="AT">
{foreach htl inSortedView vHotels}
    <li>${htl.name} (${htl.price})</li>
{/foreach}
</syntaxhighlight>

Once a View has been sorted, <span style="background:#ffc">you can modify the sort order by changing its <code>sortOrder</code> property</span> to one of the values listed above.

<syntaxhighlight lang="javascript">
this.vHotels.sortOrder = this.vHotels.SORT_DESCENDING;
</syntaxhighlight>

You can also alternatively use <code>toggleSortOrder()</code> instead of <code>setSort()</code>: provided with a sort name and a sort key method, this method will toggle the sort order of your View from <code>SORT_ASCENDING</code> to <code>SORT_DESCENDING</code> each time it is called.

<syntaxhighlight lang="javascript">
this.vHotels.toggleSortOrder("sortByPrice", function(o) {
    return o.value.price;
});
</syntaxhighlight>

===Example===
<sample sample="templates/views/sorting"/>

==Paging==

The paging functionality of a View is triggered by the <code>setPageSize()</code> method:

<syntaxhighlight lang="javascript">
this.vHotels.setPageSize(3);
</syntaxhighlight>

The method requires one numeric parameter:
* Any positive integer: the number of items per page.
* <code>-1</code>: turns off paging.

To display the content of a paged View, you must <span style="background:#ffc">iterate over the items using the <code>inView</code> keyword</span> as follows:

<syntaxhighlight lang="AT">
{foreach htl inView vHotels}
    <li>${htl.name} (${htl.price})</li>
{/foreach}
</syntaxhighlight>

When the page size has not been set, this will display the entire list of items in the View.  If <code>setPageSize(n)</code> has been set to a positive integer, the loop will display the <code>n</code> first items in the first page of the View.

To modify the current page used by the View, you need to change its <code>currentPageIndex</code> property:
<syntaxhighlight lang="javascript">
this.vHotels.currentPageIndex++;
</syntaxhighlight>

===Example===
<sample sample="templates/views/pagination" />

===Mixing filtering, sorting and paging===

You can combine the effects of the <code>filterIn()</code>, <code>setSort()</code> or <code>toggleSortOrder()</code> and <code>setPageSize()</code> methods on a single View.  In this case, to display its content, you must <span style="background:#ffc">iterate over the items using the <code>inView</code> keyword</span> as you would for a paged View.

The View class provides information about its content through two interesting properties:
* <code>items</code>: the array of View items.  When the View is sorted, this array is too.
* <code>pages</code>: the array of pages when paging is used.  Each element provides the following information about its page:
	* <code>pageIndex</code>: index of the page in the pages array (0 based).
	* <code>pageNumber</code>: index of the page in the pages array (1 based), i.e. <code>pageIndex+1</code>.
	* <code>firstItemIndex</code>: index of the current page first item, counting all items (0 based).
	* <code>firstItemNumber</code>: index of the current page first item, counting only filtered-in items (1 based).
	* <code>lastItemIndex</code>: index of the current page last item, counting all items (0 based).
	* <code>lastItemNumber</code>: index of the current page last item, counting only filtered-in items (1 based).

Let's illustrate these properties with an example.  Consider the following array of data:

<syntaxhighlight lang="javascript">
[{desc:"Item1", price:42},
 {desc:"Item2", price:27},
 {desc:"Item3", price:36},
 {desc:"Item4", price:40},
 {desc:"Item5", price:97},
 {desc:"Item6", price:7},
 {desc:"Item7", price:16},
 {desc:"Item8", price:11},
 {desc:"Item9", price:66}]
</syntaxhighlight>

If we create a View on it to which we apply the following features:

<syntaxhighlight lang="javascript">
this.vItems.setSort(this.vItems.SORT_ASCENDING, "sortByPrice", function(o) {
    return o.value.price;
});
this.vItems.setPageSize(5);
this.vItems.filterIn(this.vItems.FILTER_SET, function(o) {
    return (o.value.price != 36 && o.value.price != 40);
});
</syntaxhighlight>

Here's what the <code>items</code> array looks like and the value of the different properties:
[File:Views.PNG](File:Views.PNG)

===Example===
<sample sample="templates/views" />

==Using Views==

As we've seen, using Views in your application requires iterating over it in your template and calling various methods in your script.  This means that each time you change the way your View should behave, like changing the sort order, the pagination or applying a new filter, you need to refresh its display.  Have a look at the [Refresh](Refresh) article to define the best strategy for your needs.

When using paging, or when you need your View to be displayed sorted and/or filtered right from the start, you need to make sure the proper methods are called before iterating on its items.  This is usually done by calling the appropriate script code from the template after the View has been created and before it is used.

This is illustrated in the following example: note the <code>initView()</code> call from the template:

<syntaxhighlight lang="AT">
{Template {
    $classpath: "ariadoc.snippets.SimpleTemplate",
    $hasScript: true
}}

    {createView vHotels on data.myItems/}

    {macro main()}

        ${initView()}

        <ul>
            {foreach htl inView vHotels}
                <li>${htl.desc} ${htl.price} EUR</li>
            {/foreach}
        </ul>

    {/macro}

{/Template}

</syntaxhighlight>

And <code>initView</code> could be defined like this in your script:

<syntaxhighlight lang="javascript">
initView : function() {
    this.vHotels.setSort(this.vHotels.SORT_ASCENDING, "sortByPrice", function(o) {
        return o.value.price;
    });
}
</syntaxhighlight>