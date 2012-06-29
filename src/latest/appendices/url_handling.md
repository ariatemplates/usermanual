Title: URL handling


This article will guide you through services provided in Aria Templates to handle URLs.  The first part focuses on mapping files paths to URLs, the second part details how to create custom URLs to communicate with your server.

## Classpaths and URL mapping

Aria Templates' default behavior is to load classes using the Download Manager (<code>aria.core.DownloadMgr</code>) based on these steps:

* The classpath is turned into a physical path by replacing (i.e. the template <code>foo.bar.Main</code> becomes <code>foo/bar/Main.tpl</code>.)

* The resulting path is appended to AT's root folder.

URL mapping provides a way to modify this behavior.  It may be useful in two cases:

* You need to specify that a class identified by a given classpath + extension is in a specific file.

* You need to specify that a given package is located somewhere else.

### Mapping a class or a package to a file

Let's say you want to force the definition of the <code>foo.bar.BarClass</code> Javascript class to be fetch from <code>foo/bar/AnotherBarClass.js</code> instead of <code>foo/bar/BarClass.js</code>; you would then write:
<syntaxhighlight lang="javascript">
aria.core.DownloadMgr.updateUrlMap({
 foo : {
  bar : {
   "BarClass" : "foo/bar/AnotherBarClass.js"
  }
 }
});
</syntaxhighlight>

You could also specify that all classes of a package are available in one file like this:
<syntaxhighlight lang="javascript">
aria.core.DownloadMgr.updateUrlMap({
 foo : {
  {
   bar : {
    "*" : "foo/bar.js"
   }
  }
 }
});
</syntaxhighlight>

In the example above, any class which classpath starts with <code>foo.bar</code> is expected to be declared inside the bar.js file.

### Mapping the URL root path

You can define what to use as a root path for a given package using the <code>updateRootMap()</code> method:
<syntaxhighlight lang="javascript">
 aria.core.DownloadMgr.updateRootMap({
  foo : {
   "*" : "/newroot/",
   specialclasses : "/specialroot/"
  }
 })
</syntaxhighlight>

In this example:

* <code>foo.bar.Main</code> will be retrieved in <code>/newroot/foo/bar/Main.js</code>

* <code>foo.specialclasses.Main</code> will be retrieved in <code>/specialroot/foo/specialclasses/Main.js</code>

You can use <code>updateUrlMap</code> in conjunction with <code>updateRootMap</code> to create custom URLs.

### Advanced mapping

UrlMap and RootMap accept function references and instances of <code>aria.utils.Callback</code> in their definition. Such a function must be defined as follows:

* An *urlMap* callback receives one argument: the logical path to a file (e.g. <code>foo/bar/MyClass.js</code>) and it must return the new path (relative to rootUrl.)
<syntaxhighlight lang="javascript">
myUrlMapper : function (logicalPath) {
    return logicalPath + ";jsessionid=" + d.currentSessionId;
}
</syntaxhighlight >

<span style="color:red; font-weight:bold">>> doc missing for rootMap</span>

The callbacks can be used this way:
<syntaxhighlight lang="javascript">
aria.core.DownloadMgr.updateUrlMap({
 foo : {
  "**" : myUrlMapper
 }
});
</syntaxhighlight >

or using anonymous functions:
<syntaxhighlight lang="javascript">
aria.core.DownloadMgr.updateUrlMap({
 foo : {
  "**" : function (logicalPath) {
   return logicalPath + ";jsessionid=" + someGlobalObject.currentSessionId;
  } 
 }
});
</syntaxhighlight >

{{Note|Classic callback descriptions, i.e. <code>{ fn : myMethod, scope : myScope }</code> cannot be used here as they would result in non-determinist maps structures.  You can however define such callbacks using the <code>aria.utils.Callback</code> class.}}

Example:
<syntaxhighlight lang="javascript">
var myUrlMapper = new aria.utils.Callback({
 fn : function (logicalPath) {
  return logicalPath + ";jsessionid=" + this.currentSessionId;
 },
 scope : anObjectWithTheSessionId
});
</syntaxhighlight >

## Server requests URL handling

In order to be as independent as possible from the server-side framework, Aria Templates provides a simple way to build the URLs used for [server requests](Request_from_a_controller) and [retrieving resources](Localization_and_Resources): the URL Creation Service.

To define the way URLs are created, you need to create a class implementing the [aria.modules.urlService.IUrlService](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.modules.urlService.IUrlService) interface and its two methods:

* *<code>createActionUrl</code>*: used to create URLs used for actions.  This method is passed the following parameters:
	* <code>moduleName</code>: relative path of the package from which the request occurs, e.g. <code>foo/bar</code> if the request is done from foo.bar.MyClass
	*<code>actionName</code>: the name of the action given in the [RequestObject](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.modules.RequestBeans:RequestObject) passed to the request
	*<code>sessionId</code>: the id, if any, given to the [setSession()](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.templates.ModuleCtrl:setSession:method) method

* *<code>createI18nUrl</code>*: the same for resources for this module...

Here is a sample method from an urlService class to create the call URL:
<div class="callout">
{{Color box |
Border=#D1F2A5|
Background=#EFFAB4|
Width=95%|
Title=Did you know?|
Content=<div style="text-align: center;"><code>Aria.rootFolderPath</code> contains the path to the root of the framework, it can be used to build the server path.</div>
}}
</div>
<srcinclude tag="actionUrl" lang="Javascript" outdent="true">modules/controller/MyUrlService.js</srcinclude>