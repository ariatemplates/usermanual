Title: Controllers


## MVC applied to Aria Templates

In order to build rich, interactive and scalable application, we recommend to relying on an architecture following the MVC pattern and split the different functional part into independent entities called modules. Aria Templates provides a set of features to achieve this:

* First of all, templates: they will be the View part of the architecture. They render the model and provide user interaction.
* A JavaScript object, which will be used as a model. It holds the data of your application.
* An instance of [`aria.modules.ModuleCtrl`](http://ariatemplates.com/api/#aria.modules.ModuleCtrl). It plays the role of the controller, and also keeps a reference to the JavaScript object used as a model. This instance will hold the functional code of the application: executing calls, interpreting results...

## Case Study

To understand the relations between those different elements and how an application is built, a very simple web application will be used as a case study: a counter incremented when the user pushes a button on a user interface.

### A JavaScript model
The model is a simple JavaScript object that keeps track of the counter current value.

<div data-sample="hardcoded"><pre><code>
{
 count : 0
}
</code></pre></div>

### The controller interface

Next step is to define an interface for the controller associated to this model. A simple method which increments the count parameter of the data model is required. This interface needs to extend the default module controller interface:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/controller/IMyModuleController.js?lang=javascript&outdent=true'></script>

An interface on a module controller is **mandatory**. If not specified, default interface will be used and the methods added to the module controller will not be accessible.


### Controller - Data model interaction

The module controller is used as a container for the data model, and will be responsible for exposing it through the `getData()` method of each module controller instance. You can either:

* Implement its own getter and setter for the data of the module : `getData()` and `setData()`.
* Use the default `getData()` and `setData()` method.

For the case study, second solution is used: the data model described above will be created and stored in the controller using `setData()` in its constructor, and the `incrementCount` method exposed by the module controller will act on the data model returned by `getData()`.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/controller/MyModuleController.js?lang=javascript&outdent=true'></script>


### Interaction with Templates

#### Exposing the module controller and its data to the view

When a template is loaded into a page through [`Aria.loadTemplate()`](http://ariatemplates.com/api/#Aria:loadTemplate:method), the classpath or an instance of a module controller can be provided as a configuration parameter. If so:

* The data for the template will be automatically retrieved from the module controller `getData` method.
* The module controller interface will be exposed in the `moduleCtrl` variable in the template. This interface can be called on user action. For the case study, the template will call the `incrementCount` method of the module controller when the button is pressed.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/controller/MyView.tpl?tag=button&lang=at&outdent=true'></script>

#### Interact with the view

Module controller can interact with the view in several ways:

* With events: template listen to events coming from the module controller they are attached to. By overriding the `onModuleEvent` of the template script, the view can update itself when an event is raised in the module controller.
* Using autorefresh: if changes on the data model are done using the methods from the [aria.utils.Json](http://ariatemplates.com/api/#aria.utils.Json) utility, template can use the binding mechanism to benefit from automatic refresh. See [refresh](refresh) for more details.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/modules/controller/MyView.tpl?tag=display&lang=at&outdent=true'></script>

## Summary

This schema sums-up the interactions between the data model, the controller and the view.

![Module Controller](../images/modulectrlschema.png)