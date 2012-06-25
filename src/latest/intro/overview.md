Title: Overview


# A 4 layer framework
Aria Templates is designed as a stack of 4 layers that allow a partial usage of the framework: i.e.
the first <i>core</i> layer can be used alone, the 2nd _template_ layer only
requires the <i>core</i> layer, and so on...

## Layer #1: Aria core

The first layer provides core JavaScript features that are used to build the framework, such as:

* a Java-inspired [class syntax](Javascript Classes) that simplifies the management of the (prototype-based) object inheritance
* support for class namespaces
* on-demand load support through static & dynamic class dependencies management
* support for [asynchronous programming](Working in an Asynchronous World), through asynchronous methods and generic callback patterns
* support for [interfaces](Around Classes), to support safe service layers
* support for a simple XSD-inspired [JSON grammar](JSON Bean Definitions), coming with dynamic validators and normalizers
* [utility classes](Helpers), such as AJAX Connection support, log Manager and AJAX response mocks to redirect dynamic calls to static files
* and last but not least, a simple Js Unit framework supporting asynchronous tests and loading tests on-demand

## Layer #2: Templates

The second layer provides the [template engine](http://en.wikipedia.org/wiki/Template_engine_%28web%29) used to generate and display any UI piece. This engine comes with
many interesting features, such as:

* full and [partial template refresh](Refresh)
* [template inheritance](Template Inheritance) and nested templates
* [template scripts](Template Scripts) to support advanced rendering logic
* [CSS templates](CSS Templates) - that allow to optimize the CSS payload, and also offer easy support for skinning and browser-specific CSS fixes
* [sorting, filtering and paging](Views) features on any data lists
* [rich widget library](The Aria Templates Widgets Collection) - covering the most frequently used UI widgets
* widget [data-bindings](Data Model and Data Binding) to automatically synchronize widget properties with the template data
* [keyboard navigation](Keyboard Navigation)
* [internationalization](Localization and Resources) and UI themes
* ...and soon complete support for widget libraries in order to let any developer provide its own widgets

## Layer #3: Modules

The third layer provides the support for UI modules, that can be considered as mini application blocks, and as such
are composed of files of different nature: JavaScript classes, JSON resources, HTML and CSS templates, image resources, etc.
The interesting aspect of modules is that they can (and shall) be developed and tested independently and re-used in different
applications or contexts. Modules can also load and interact with [sub-modules](Using Sub Controllers) in order to implement complex functionalities.

On a technical point of view, modules have to follow an
[MVC pattern](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) where:

* The *Model* is implemented as a JSON object, that can be specified with the JSON grammar
* The *View* is implemented with a set of templates
* The *Controller* is developed through JavaScript classes and is split in 2 entities:
	* A service controller (aka [Module Controller](Controllers)) that implements the core functional features exposed through a Service interface
	* A [flow controller](Flow Controllers) - that technically belongs to the View layer - and that is in charge of managing the User Interface flow

## Layer #4: Page Engine

Although full applications can be implemented with a root module driving a series of sub-modules, the general use case requires applications to

* mix content - ideally user-generated and [CMS](http://en.wikipedia.org/wiki/Content_management_system)-driven - with technical features implemented in modules
* support pages that bind content, layout and modules to make up global views, that can easily be navigated back and forth
* be adaptable enough to quickly integrate new content, modules or pages without any coding

These are the main features that will be provided by the page engine (to be released soon). Technically, it is implemented
as a module that is able to read JSON page configurations and can dynamically load any module
and manage page navigation.

# Tools

Like most RIA frameworks, Aria Templates has developed a series of tools that aim at improving
development efficiency and product optimizations:

* The Aria Templates packager allows to [minify](http://en.wikipedia.org/wiki/Minification_%28programming%29) and bundle JavaScript resources. It also generates
unique file names so that different versions of the application will use different URLs, and as
such will support web-proxy and browser caching
* The Eclipse plugin provides an efficient template editor
* The JS Doc generator allows to generate documentation for all the project classes - this is the same tool that is used to document the framework classes

*Note:* these tools have been originally developed in Java and are being migrated on node.js - which explains why they are not published yet.