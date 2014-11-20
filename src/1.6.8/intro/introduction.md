Title: Introduction



## What is Aria Templates?

Aria Templates (later sometimes referred to as **AT** in this documentation), is a Javascript framework based on client-side templating.

### A what?

As a Javascript framework, AT provides a set of libraries and helpers that make it easier to develop your web application.  It provides familiar object-oriented features such as [class definitions](javascript_classes) and [inheritance](around_classes) as well as a number of useful ways to create your user interface such as [widgets](widgets) and [CSS templates](css_templates).

### Based on what?

Client-side templating basically means that your browser is responsible for rendering your web app, leaving the server in charge of handling what it's good at: the data.  Because it is based on the MVC model, Aria Templates make it a breeze to separate your business logic from the way it is represented.

## An introduction to client-side templating

You're already familiar with the concept of templates if you have ever done web development using technologies such as ASP, JSP or PHP: a common way to proceed is to design a part of your interface in a generic way so that it is able to represent different states of the data.  In the JSP world, the data is extracted and processed using JSTL or scriptlets (embedded chunks of Java code) and various taglibs.  The resulting markup is then sent to the browser each time an update occurs.

With the advent of AJAX and the ability to generate asynchronous requests from the client, web apps became more flexible and communications between the browser and the server were not limited to transmitting whole streams of markup and JS code anymore and developers were free to only use chunks of markup or even pure data, a process that was made even easier with the help of JSON.

<img src="../images/at_intro.png"/>

Server-side templating has two undeniable advantages:

1. it's efficient, because the processing is done on a powerful dedicated machine;
1. it's pretty much standard, meaning that documentation and tools are easy to find for developers.

However, as web applications became more and more complex, this mechanism quickly showed its limits: because of the amount of information needed to be sent back and forth, server-side templating weighs heavily on bandwidth and this has a huge impact on applications responsiveness.

The idea behind client-side templating is to solve this issue by shifting part of the processing to the client.  Basically, upon initialization, the browser receives the necessary files to render the interface (the template engine and the templates) as well as the initial data set; then, each time a request is made to the server, the application only retrieves data that it needs to update the interface state.

Not only does this mechanism allow for less data to be transmitted over the network but, because the display is clearly separated from the data and the logic, this also makes customization of the interface much simpler: one template can be replaced by another very easily.

<img src="../images/at_doc_template.jpg"/>

## Aria Templates principles

### Basic notions

Aria Templates relies on the MVC pattern to create applications.  For developers, this means a clear separation between the user interface, the actual data and the business logic.  Each of these layers has a specific representation in AT.

In this approach, the view &mdash;the user interface, describes the state of the data at a given moment.  The consequence of this is that developers do not need to manually modify the parts of UI impacted by a data update: in Aria Templates, data updates automatically trigger changes in the UI.

All these concepts are explained in details in the rest of this documentation.

So what do you need to know to start using Aria Templates?  Obviously, knowledge of Javascript is necessary, as well as some proficiency in HTML and CSS.  If you've ever used a high-level language like Java, some object-oriented notions will look familiar.

### A practical example

To illustrate practically how an AT app is built, let's have a look at a simple example.  Like most applications it will be based on:

1. a bootstrap: a piece of HTML that loads the framework engine and the initial script code to load the template;
1. a template;
1. some data.

First off, we start with the bootstrap, in our case a simple HTML page created from scratch:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/intro/index.html?lang=html5&numbers'></script>

There are 3 parts to look at here:

1. Lines 6 & 7 reference the needed files to include Aria Templates.
1. Line 11 creates an empty container (a `DIV` in this case) which will be used to display our template.
1. Finally, lines 14 to 21 contain the Javascript statement that will load a template called `amadeus.example.view.SgtGreeters` inside our `output` container.  In this example, it is also where we initialize some data to be used by the template.

Now let's see what `SgtGreeters.tpl` looks like:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/intro/view/SgtGreeters.tpl?lang=at&numbers'></script>

As you can see, AT introduces  a special kind of grammar to describe your interfaces, much of it being quite straightforward.  If we have a detailed look at the code we can see the following:

1. Lines 1 to 3 simply declare that the file is a template with a specific classpath.
1. Line 4 marks the entry point of the template.
1. Lines 8 to 10 iterates through the array that was given as an argument in the bootstrap.

And here's what the result looks like:


<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/intro/' ></iframe>

## Going further

Aria Templates aims at making it fast and easy to develop professional web applications.  It offers a wide variety of [widgets](widgets) covering most of modern UI use cases, as well as a complete [API](http://ariatemplates.com/aria/guide/apps/apidocs) to help tackle the common tasks of the application logic.

Thanks to the clear separation between its MVC layers, it also makes it simple to customize an existing application by modifying its interface or enhancing its business logic.

To go further, the rest of this documentation will present you each layer of the framework in detail.  To get a clear understanding of the basics, please refer to the Core Layer Concepts section.  The [Aria Templates Guide](http://ariatemplates.com/guides/) site is also a good place to find code samples and tutorials designed to illustrate practically various common patterns and use cases.  Finally, the [API reference](http://ariatemplates.com/aria/guide/apps/apidocs/) is where you'll find documentation about all the classes and methods exposed by the framework.
