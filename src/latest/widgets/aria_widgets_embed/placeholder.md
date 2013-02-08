Title: Placeholder

Placeholder widgets in Aria Templates are used to include configurable content. Below is the code snippet to create a Placeholder using Aria Templates framework.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/placeholder/Snippet.tpl?tag=wgtPlaceHolderSnippet1&lang=at&outdent=true' defer></script>

Below scenarios can be handled by Placeholder widget.

* ** On a given page, switching from template 'A' to template 'B' and reverting to template 'A' again shall restore initial state (placeholders and rulesets).
* ** It is also possible to share a Placeholder instance among several pages.

## PlaceholderManager

The PlaceholderManager is the central object which allows to link the content providers to the placeholder. It has a method register(contentProvider) which register a new content provider as in the below code snippet.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/widgets/placeholder/PlaceholderSampleController.js?tag=wgtPlaceHolderSnippet&lang=at&outdent=true' defer></script>


## Sample usage


<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/widgets/placeholder/' ></iframe>