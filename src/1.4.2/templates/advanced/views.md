Title: Views


Among common use cases web application developers have to deal with on a daily basis, filtering, sorting and paging are probably the most frequent ones when it comes to manipulate sets of data.  Template Views, or just Views for short, have been designed to make implementation of these use cases easier.

A View allows you to work on any part of your data model you want without actually modifying it: it provides a copy of the data as well as a set of methods to manipulate it.

To use Views, you first need to create one.  You do that using the `createView` statement:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=createView&noheader=true&lang=at'></script>


Provided that `data.hotels` is an Array or a Map, this statement will create a `vHotels` variable.  If it has been created inside a macro (including the `main` macro), its scope will be local and the view will only be available from inside the macro.  If it has been set as a global variable, the view will be available both from the template using `vHotels` and from its associated script using `this.vHotels`.

Let's now see how ways we can use this object.

## Filtering

In order to use the View filtering mechanism, you simply define which of its elements should be kept.  This is achieved by using the `filterIn()` method.

Let's see how it is used in a template script:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=filterIn&noheader=true&lang=javascript&outdent=true'></script>


This example tells the view to keep only hotels for which the daily rate is beyond 200€.

Two arguments are passed to `filterIn()`:

* The **filter type**, which defines how the filter should be applied to the View.  In this example, the `FILTER_SET` property of the View class states that the filter must be applied to all the items in the View.  We will see other possible values below.

* The **filter method** (inline or reference), which is provided with a single argument, a [View item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans), and must return a boolean value indicating whether this item should be kept or not.  This object gives access to the following properties:

	* `value`: the item itself.
	* `initIndex`: the index of the item if the initial container is an array, or its key if it is a map.
	* `sortKey`: (when using sorting) the last used sort key of the item.
	* `filteredIn`: (when using filtering) a boolean value indicating whether the item is filtered in.
	* `pageIndex`: (when using paging) the index of the page in which the item appears.

To display the content of a View using the filter mode, you must <span style="background:#ffc">iterate over the items using the `inFilteredView` keyword</span> as follows:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=inFilteredView&noheader=true&lang=at'></script>


### Combining filters

Once a filter is set, you can add new ones to filter in more items using the Views `FILTER_ADD` property:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=filterAddElement&noheader=true&lang=javascript&outdent=true'></script>


In this case, the filter method is applied to items that are not filtered in.  This example, added to the previously set filter, instructs the View to list all hotels for which the daily rate is beyond 200€ **or** which have at least 5 stars.

Conversely, it is also possible to specify new filters to refine the list of items to be kept using the `FILTER_REMOVE` property:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=filterRemoveElement&noheader=true&lang=javascript&outdent=true'></script>


In this case, the filter method is applied to items that are already filtered in.  This example, added with the first filter we've set, tells the View to list all hotels for which the daily rate is beyond 200€ **and** which have more than 2 stars.

### Additional features

The [aria.templates.View](http://ariatemplates.com/api/#aria.templates.View) class provides useful features to handle common filtering tasks:


* `allFilteredIn()`: a method to filter in all the items of the view.
* `allFilteredOut()`: a method to remove all the items from the view.
* `filteredInCount`: a property that returns the number of items currently filtered in.

### Example
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/views/filtering/' ></iframe>

## Sorting

Sorting items of a View is achieved by using the `setSort()` method, as illustrated in this example:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=sortByPrice&noheader=true&lang=javascript&outdent=true'></script>


This method requires three parameters:

* The **sort order**, a self-explaining constant which can have the following values: `SORT_ASCENDING`, `SORT_DESCENDING` and `SORT_INITIAL`.  The latter sets the items of the View in the same order as in the original container from which was created.
* The **sort name**, a string of your choice which will be used as an identifier for the current sort key method.
* The **sort key method** (inline or reference), which is provided with a single argument, a [View item](http://ariatemplates.com/api/#aria.templates.ViewCfgBeans), and must return the item property that will be used for sorting.

<span style="color:#D13838">Be careful!</span>  When using Views on maps, if you set the sort order to `SORT_INITIAL`, the order in which the elements of the View will be accessed is browser dependent.  You can check [this post](http://ejohn.org/blog/javascript-in-chrome/) by J. Resig to read details about this.

To display the content of a View using the sorting mode, you must iterate over the items using the `inSortedView` keyword as follows:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=inSortedView&noheader=true&lang=at'></script>


Once a View has been sorted, you can modify the sort order by changing its `sortOrder` property to one of the values listed above.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=ascSortOrder&noheader=true&lang=javascript&outdent=true'></script>

You can also alternatively use `toggleSortOrder()` instead of `setSort()`: provided with a sort name and a sort key method, this method will toggle the sort order of your View from `SORT_ASCENDING` to `SORT_DESCENDING` each time it is called.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=toggleSortOrder&noheader=true&lang=javascript&outdent=true'></script>


### Example
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/views/sorting/' ></iframe>

## Paging

The paging functionality of a View is triggered by the `setPageSize()` method:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=pageNumber&noheader=true&lang=javascript&outdent=true'></script>


The method requires one numeric parameter:

* Any positive integer: the number of items per page.
* `-1`: turns off paging.

To display the content of a paged View, you must iterate over the items using the `inView` keyword as follows:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=inView&noheader=true&lang=at'></script>


When the page size has not been set, this will display the entire list of items in the View.  If `setPageSize(n)` has been set to a positive integer, the loop will display the `n` first items in the first page of the View.

To modify the current page used by the View, you need to change its `currentPageIndex` property:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=nextPage&noheader=true&lang=javascript&outdent=true'></script>


### Example
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/views/pagination/' ></iframe>

### Mixing filtering, sorting and paging

You can combine the effects of the `filterIn()`, `setSort()` or `toggleSortOrder()` and `setPageSize()` methods on a single View.  In this case, to display its content, you must iterate over the items using the `inView` keyword as you would for a paged View.

The View class provides information about its content through two interesting properties:

* `items`: the array of View items.  When the View is sorted, this array is too.
* `pages`: the array of pages when paging is used.  Each element provides the following information about its page:

	* `pageIndex`: index of the page in the pages array (0 based).
	* `pageNumber`: index of the page in the pages array (1 based), i.e. `pageIndex+1`.
	* `firstItemIndex`: index of the current page first item, counting all items (0 based).
	* `firstItemNumber`: index of the current page first item, counting only filtered-in items (1 based).
	* `lastItemIndex`: index of the current page last item, counting all items (0 based).
	* `lastItemNumber`: index of the current page last item, counting only filtered-in items (1 based).

Let's illustrate these properties with an example.  Consider the following array of data:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=defaultData&noheader=true&lang=javascript'></script>

If we create a View on it to which we apply the following features:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=defaultInit&noheader=true&lang=javascript&outdent=true'></script>

Here's what the `items` array looks like and the value of the different properties:

![Views][view_image]

### Example
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/templates/views/' ></iframe>

## Using Views

As we've seen, using Views in your application requires iterating over it in your template and calling various methods in your script.  This means that each time you change the way your View should behave, like changing the sort order, the pagination or applying a new filter, you need to refresh its display.  Have a look at the [refresh](refresh) article to define the best strategy for your needs.

When using paging, or when you need your View to be displayed sorted and/or filtered right from the start, you need to make sure the proper methods are called before iterating on its items.  This is usually done by calling the appropriate script code from the template after the View has been created and before it is used.

This is illustrated in the following example: note the `initView()` call from the template:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/View.tpl?tag=simpleUsage&noheader=true&lang=at'></script>

And `initView` could be defined like this in your script:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/templates/views/ViewScript.js?tag=initView&noheader=true&lang=javascript&outdent=true'></script>


[view_image]: ../images/views.png