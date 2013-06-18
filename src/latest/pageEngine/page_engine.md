Title: Page Engine

The page engine is an independent layer of the Aria Templates framework that allows to build page-oriented applications, both for desktop and mobile.

The word "page" reminds us of web 1.0 paradigm, where navigation from one page to another came with a complete reload. However, in this context, the concept of page is more related to the way in which all the different components that are visible in the web application at a certain time are described.

The page engine comes with the following features:
* simple page definitions in JSON format. A page definition contains information on the layout, the contents, the functional modules and the menus available on a given page.
* Dependencies preload: ability to infer the dependencies of a page from its page definition and to load them before the page is actually shown.
* Hash-based navigation or history API-based navigation, with full support of back and forward.
* Definition of modules and data bindings mechanisms for data synchronization. Modules can be developed independently of the page engine, then easily embedded inside a page by binding data with global application data.
* Possibility to define page providers, namely classes that are in charge of building the site configuration and page definitions.
* Animations for page transitions.


## Getting started

Here is a sample `index.html` file that initializes the page engine.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/index.html?lang=html5'></script>

The main entry point is the class [aria.pageEngine.PageEngine](http://ariatemplates.com/api/#aria.pageEngine.PageEngine) class. After creating an instance of this class, it is possible to start the page engine by providing a page provider, which will be discussed [later](#Page_providers).

'''Remark:''' It is important to add the [aria.embed.EmbedLib](http://ariatemplates.com/api/#aria.embed.EmbedLib) library to the default widget libraries needed in your templates. Indeed, the [Placeholder](http://ariatemplates.com/api/#aria.embed.Placeholder) widget has a key role in embedding contents, templates and modules inside pages. We will see examples later in this article.


## Page providers

Page providers are instances of classes (or simple objects) that implement [this interface](http://ariatemplates.com/api/#aria.pageEngine.pageProviders.PageProviderInterface).

The page engine will ask the page provider for
* the site configuration right at the outset of its existence.
* Page definitions when navigation to a new page is triggered. A page request ([PageRequest](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageRequest) is identified by a `pageId` and/or a `url`. When creating your own page provider, it is up to you to create maps between pageId's and urls, define routes for friendly urls, put in place caching mechanisms for page definitions.

As you can see in the [interface](http://ariatemplates.com/api/#aria.pageEngine.pageProviders.PageProviderInterface), a page provider can raise the `pageDefinitionChange` event, by specifying the pageId of the page whose definition has changed. If the id corresponds to the current page, the page engine will automatically issue a new request for the new page definition and refresh the page.

The framework provides a base page provider [aria.pageEngine.pageProviders.BasePageProvider](http://ariatemplates.com/api/#aria.pageEngine.pageProviders.BasePageProvider) which allows to load site configuration and page definitions stored in static ''.json'' files. Caching is enabled by default, and url-pageId maps are learnt as you navigate through pages, so that back and forward actions work fine.


## Site configuration

The site configuration is a json object described in [this bean](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:Site). Here is an example of page configuration.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/siteConfiguration.json?lang=javascript&outdent=true'></script>

Some remarks:
* the `containerId` is the id of the HTMLElement in which the pages will be loaded. As you can see in the index.html above, there is a div in the body with that id.
* `appData` consists in data that are shared across the whole application. It typically contains data that is bound to the data models of modules, and also menus. In particular, `appData.navigation` contains all the menus available in the application. In this case, it is initialized with a default menu. However, menus can also be added in the definition of a page, as explained [later](#Page_definition).
* `commonModules` contains the definition of modules that are shared across pages, meaning that, through a certain syntax, it is possible to embed in a page a global instance of a module. The inclusion of modules will be dealt with [later](#Modules) in more details.
* `navigation` can be either "hash"-based or "history"-based. More details will be discussed [later](#Urls).
* `css` is an array of standard css files that are global to the application. They are added as `rel` tags and survive page navigations. This feature is not encouraged because css rules should be managed throught CSSTemplates in an AT-based application. Nevertheless, It is possible to declare standard css files as site dependencies.
* `animations` has to be set to true if you want to use animations for page transitions. The page engine will preload all the classes needed for the animation, so that everything is ready when navigating to the first page. If no animations are needed, the load of useless classes will be avoided. See [below](#Animations) for more details.

## Page definition

Page definitions are the core structures of the page engine. A page definition is a JSON object that describes the layout of the page (through templates), static contents, functional modules and menus.

Here is the [bean for the page definition](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageDefinition). As an example:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/pageDefinition.json?lang=javascript&outdent=true'></script>

A page definition is made of two main parts:
* [PageContents](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageContents) represents pure content that can be retrieved, for example, from a Content Management System (within your custom page provider). It contains
** menus that will be automatically available in `appData.navigation`.
** `placeholderContents`, which is a map whose keys correspond to `contentId`s present in the placeholder descriptions of the page composition.
* [PageComposition](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageComposition), which represents the description of the layout and of the functional parts of the page, namely modules. It contains
** the main template used to display the page.
** a list of standard css files that are specific to the page. They are added as `rel` when the page is loaded, and removed when navigating away from the page. This feature is not encouraged because css rules should be managed throught CSSTemplates in an AT-based application. Nevertheless, It is possible to declare standard css files as page dependencies. The removal of the `rel` tags on page change helps managing the styling of your application and helps preventing that the number of css rules actually applied in a page overcomes the limitations imposed by certain browsers.
** The list of placeholders. The description of a placeholder will be detailed [later](#Placeholders ).
** The description of page-specific modules. If one or more placeholders need this module, an instance will be created before loading the page.

This separation of the pageDefinition has been conceived in order to clearly split pure contents, that can be reused in different parts of the page, from layout-related and functional parts.

The page definition can be decorated with other information, like the url and the page title. These properties are used for updating the url according to the navigation strategy you have chosen in the site configuration. It is also possible to define animations for the page, as explained in more details [below](#Animations).


### Placeholders

The description of a placeholder is very flexible. Look at the [bean definition](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:Placeholder) to find out all the available options.
The keys used in `pageComposition.placeholders` allows to define nested placeholders in a flat data structure. By looking at the above example of page definition, it is possible to realize that `"applicationBox.albums.noPhotos"` placeholder is nested under `"applicationBox.albums"`. 

There are mainly three properties that determine the nature of a single placeholder:
* `template`: the classpath of the template to display. If no `module` or `contentId` is provided, then it is likely that the template is needed to create a certain layout, and the real embedded content is in nested placeholders.
As an example, consider the placeholder declaration

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/pageDefinition.json?tag=placeholder&lang=javascript&outdent=true'></script>

The corresponding template looks like this

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/FacebookResults.tpl?lang=at&outdent=true'></script>


As you can see, the role of this placeholder is to define a position for the nested placeholders `"applicationBox.title"`, `"applicationBox.user"` and `"applicationBox.albums"`. Notice how the name of the placeholder corresponds to the last part of the path.

When a template does not have a module controller associated to it, it automatically inherits the module controller of the template in which it is included.

The main template of the page, whose classpath is in `pageComposition.template` of the page definition, is automatically associated to a wrapper of the site root module, which is an instance of class [aria.pageEngine.SiteRootModule](http://ariatemplates.com/api/#aria.pageEngine.SiteRootModule). In particular, the keyword `moduleCtrl` inside the template will refer to an object which corresponds to the interface [aria.pageEngine.SiteRootModuleInterface](http://ariatemplates.com/api/#aria.pageEngine.SiteRootModuleInterface), which is mostly needed for page navigation.

* If a `module` is provided along with a template, then the template normally represents a view of the data model managed by the module controller. They are automatically associated, and the module data is automatically available in the template, according to the basic principles of Aria Templates.

* If a `contentId` is provided, then the actual content is retrieved from `contents.placeholderContents` inside the page definition, and output as markup through the placeholder widget. If a template is provided along with the contentId, the content (which can be also an array), is given as argument to the main macro of the template. This situation is typically useful when the display of the content requires some behaviour that relies on some script logic. For example, the content could consist in an array of images that have to be displayed in a carousel with navigation commands.

* `css` is an array of standard css files that are specific to that placeholder. They are added as `rel` when the page is loaded, and removed when navigating away from the page. This feature is not encouraged because css rules should be managed throught CSSTemplates in an AT-based application. Nevertheless, It is possible to declare standard css files as page dependencies. The removal of the `rel` tags on page change helps managing the styling of your application and helps preventing that the number of css rules actually applied in a page overcomes the limitations imposed by certain browsers.

## Modules

When we talk about modules in the context of the page engine, we always refer to Aria Templates module controllers. As we have anticipated before, the page engine allows to introduce some functional modules inside pages. Here we will provide more details on how to declare and use them and on their lifecycle.


### Declaration

A module declaration corresponds to the [Module bean definition](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:Module). The classpath of the module controller class is mandatory, initialization arguments can also be provided, which is also the case when normally using module controllers inside AT-based applications. As an example,

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/pageDefinition.json?tag=friendfinder&lang=javascript&outdent=true'></script>

There two types of modules: common and page-specific ones.

#### Common modules

Common modules have to be declared in the site configuration, as shown [above](#Site_configuration). Their declaration accepts an extra parameter, `priority`, which tells the page engine whether to load the module in the initialization phase (priority=1) or as soon as a page uses it (priority=2). Once a common module is loaded, it can be used by any page by its reference path, which is `"friendFinder"` in this case. All pages share the same instance.

#### Page-specific modules

Page specific modules have to be declared in the `pageComposition.modules` map of the page definition. A unique instance is created.


### Usage

In a placeholder declaration (see [above](#Placeholders)), the module property can correspond, either to the reference path of a page-specific module (like `"friendFinder"` in the example), either to a common module reference path prefixed with `"common:"` (like `"common:facebookUser"` in the example).


### Lifecycle

All these modules are automatically loaded as sub-modules of the site root module, which is an instance of [aria.pageEngine.SiteRootModule](http://ariatemplates.com/api/#aria.pageEngine.SiteRootModule). When used in a placeholder of a page, all their dependencies are loaded and all modules are initialized just before displaying the page. When navigating away from a page, page-specific modules are not disposed, they keep on living just in case the page is visited again.

### Bindings

The interaction between the page engine and module controllers has been conceived in such a way that the module can be developed independently. The way in which modules communicate with the page engine relies on bindings.

Consider the excerpt of the previously shown site configuration:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/siteConfiguration.json?tag=facebookUser&lang=javascript&outdent=true'></script>


The "bind" syntax means that "profile" (namely `this._data.profile` inside the module controller) is synchronized with `appData.selected.facebook`. It is also possible to bind module data to page-specific data, which can be retrieved from the page definition. In that case, instead of using the prefix `"appData:"`, `"pageData:"` must be used.

Bindings are very powerful ways of enabling commuincation between modules that are bound to the same part of the data model.


## Access to the PageEngine instance

The core class of the page engine layer is [aria.pageEngine.PageEngine](http://ariatemplates.com/api/#aria.pageEngine.PageEngine). As shown [ above](#Getteing_started), you have to create an instance of this class and then call the [start](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:start:method) method (giving a page provider as argument).

At that stage, it is possible to store the instance of page engine that you have created, so that you can then use it to call the [navigate](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:method) method, which is at the most important method of the page engine layer.

On top of that, it is possible to access a wrapped version of the current `PageEngine` instance from module controllers that are declared the page. The instance is wrapped using the interface [aria.pageEngine.PageEngineInterface](http://ariatemplates.com/api/#aria.pageEngine.PageEngineInterface), which only exposes some useful methods. It is injected in the initialization arguments of each module controller (first argument of the `init` method that you can implement in controllers) as value of the `"pageEngine"` key, so it is up to you to store it in a class variable if you want to reuse it within it.

### Available methods

The following methods are available on the `PageEngine` instance:

* [navigate](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:method), in order to change page or update the information on the current page (see [below](#Navigation) for more informtation).
* [getData](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:getData:method), which returns the data model of the page engine (more information [below](#Access_to_data)).
* [getPageProvider](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:getPageProvider:method), which returns instance of page provider given as argument to the `start` method. It can be useful to have it because you might have defined other methods in a customized page provider, and you might want to access them from your modules.
* [isModuleInPage](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:isModuleInPage:method), which accepts an instance of module controller and returns `true` if the module is currently present in the page. This feature is useful because page-specific modules are not destroyed when navigating away from the page (this allows persistence of data model across different navigations to the same page). Since a page-specific module is still alive even when the page is not didplayed, it can be important to know when it is actually present so that some actions (most notably calls to the server) that depend on data model changes (especially in the case of module bindings) can be avoided when they have no impact on the current UI.


## Access to data

The data model of the page engine consists in an object that looks like this:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/dataModel.json?lang=javascript&outdent=true'></script>

where:

* `appData` represents data that is shared across pages.
* `pageData` is page-specific, it is filled with the pageData specified in the page definition and thus it changes whenever a navigation occurs.
* `pageInfo` contains information about the current page, such as `pageId`, `url`, `title`.

You can access these data
* from a template that is not associated to a module controller, in `data.storage`.
* by using the [getData](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:getData:method) method on the [instance of page provider](#Access_to_the_PageEngine_instance).


## Navigation

The purpose of this section is to explain how to navigate from a page to another, how to manage urls and animations.

### Turning pages

It is possible to navigate to a page from templates or modules.

#### From a template

If the template is associated to the site root module, then it is possible to call `this.moduleCtrl.navigate(pageRequest);`, where `pageRequest` is of type [PageNavigationInformation](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageNavigationInformation).
You can provide a pageId and/or a url. If the url has already been targeted before, the pageId will be known by the page engine, otherwise it is up to the specified [page provider](#Page_providers) to be aware of the correct mapping.

If you set the type of navigation to `"history"` (see [below](#Urls)), then if is also possible to provide
* `data`: used in pushing the new state (as part of the history API),
* `title`: used in pushing the new state (as part of the history API),
* `replace`: in case you want to replace the current state instead of simply pushing the new one.

If the `pageId` corresponds to the current one, no real navigation will be performed, but all the other information provided (`url`, `data`, `title`) will be taken into account and reflected in the application.

When a page is requested with a certain url, and the corresponding page definition has a different url inside of it, the request url will be used. Nevertheless, the url that is present in the page definition will be mapped to that pageId for future use.


#### From a module

In order to navigate from a module it is sufficient to raise a `"navigate"` event providing the right properties when firing it:

`this.$raiseEvent({name : "navigate", page : page});`

where `page` is, once again, of type [PageNavigationInformation](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageNavigationInformation).

We recall that in order to raise such an event from a module, it is necessary to declare it in its interface.

The site root module will automatically listen to these events and call the navigation method. This strategy is in line with the standard paradigm of Aria Templates, in which sub-modules of a module controller cannot access it directly, but can raise events to which the parent module can register.


#### From anywhere

As long as you have access to the instance of pageEngine (or to its interface), you can call the [navigate](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:method) method that it provides. For more details on how to access the instance of the page engine class, read [this section](#Access_to_the_PageEngine_instance).


### Urls

As shortly explained in [above](#Site_configuration), there are two types of navigation:

* '''hash-based''': the url that you specify for a certain page is add in the hash. It is not possible to set a title for the page or to specify some data to be saved in the history state.
* '''history-based''': it is based on the [aria.utils.History](http://ariatemplates.com/api/#aria.utils.History) utility, which provides a cross-browser implementation of the HTML5 History API. For browsers that do not natively support it, it falls back on a hash-based implementation, but it still provides the same API, so that it is possible to set a title, save some data in the history state, and replace a state in the history (all these properties can be specified in the [navigate](http://ariatemplates.com/api/#aria.pageEngine.PageEngine:navigate:method) method of the page engine).

### Page reload and external navigation

When unloading the page (whether because an external navigation has occurred, or because you pressed F5), the page engine is automatically storing some information about the mapping between urls and pageId's inside the browser local storage. At re-initialization, this information is recovered, so that the page engine is already able to direct you to the page that you were at when leaving. This mechanism also allows to keep the history of your navigation: if you navigate to a couple of pages and then navigate to an external resource, you can click on the back button several times and really see the pages you visited, as in a standard web 1.0 website (in IE7, due to some browsers limitations, the full history is lost, but the last visited page is still correctly restored).


### Animations

It is possible to perform animations in navigating from one page to another. As described in [this bean](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageDefinition), a page definition can contain an `animation` property (of type [PageAnimation](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageAnimation)). It consists in an Object in which you can specify:
* how the new page has to be displayed (`animateIn`),
* how the previous page has to be removed (`animateOut`).

The list of animations can be found [here](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:PageAnimation). Animations are based on class [aria.utils.css.Animations](http://ariatemplates.com/api/#aria.utils.css.Animations)<!-- , some documentation on its generic usage can be found [here](Aria_Templates_-_CSS3_animations) -->.

## Content processors

Before passing contents over to the placeholder widget, which is able to display them, the page engine is able to process them by using content processors that can be registered in the site configuration.

Consider the following site configuration:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/simpleSiteConfig.json?lang=javascript&outdent=true'></script>

When the page engine is initialized, class `my.markdown.Processor` will be loaded and an instance of it will be created. All classes registered as content processors have to offer a method `processContent`, which receives an object of type [Content](http://ariatemplates.com/api/#aria.pageEngine.CfgBeans:Content) and returns an object of the same type. Content processors are chained until the returned value has no contentType, or its contentType has no registered processor.

When a content is of type "markdown"

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/pageEngine/simplePageDef.json?lang=javascript&outdent=true'></script>

the method `processContent` of the instance of `my.markdown.Processor` is called.

Aria Templates offers one content processor that you can already use: [aria.pageEngine.contentProcessors.MarkdownProcessor](http://ariatemplates.com/api/#aria.pageEngine.contentProcessors.MarkdownProcessor).