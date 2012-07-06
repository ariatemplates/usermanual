Title: Using Sub Controllers


## Concept

Very often having only one module controller class to handle all the functional code is not a good idea. It is recommended to divide the application in smaller entities to achieve better reusability, testing and maintainability:

* First of all, any generic utility needed for the module can be extracted to a separate class.
* If the controller has several states and transitions between those states, using a [flow controller](flow_controllers) will make sure that this part is also outside the module controller.
* Finally, independent *functional* part of the application with an independent piece of display can be identified: this will be extracted to so-called "sub modules".

## Case study: a list of incremental counters

This feature will be illustrated starting with the sample built in [controllers](controllers) documentation. Goal for this case study is to build an application displaying a list of incremental counters.

## Hierarchical Data Model

The structure of this application will be the following:
* Module controller for the counter is already available, as well as an associated template for the display.
* A new module controller used to handle the list of counter will be introduced, in charge of managing each module controller attached to the counters.

The data model will follow the same structure: it will simply be an array of objects corresponding to the data model used by the counter module controller:

<syntaxhighlight lang="JavaScript">
{
    counters : [
        {
            count : 0
        }, 
        {
            count : 0
        }, 
       ...
        {
            count : 0
        }
    ]
}
</syntaxhighlight>

## Hierarchy of modules

The very same hierarchy will be used on module controllers. The application will be handled by a main controller which will create sub controllers to handle each counter.

Creating the sub controllers is done through the `loadSubModules` method or [aria.templates.Modules](http://ariatemplates.com/api/#aria.templates.Modules). This method is asynchronous, as it will also handle dependency loading for the sub controllers. It takes two arguments:
* A list of configuration of sub controllers. A configuration contains the classpath of the sub module controllers, and the path in the data model for the data associated to the sub module. This path can be completed with an index if it is part of an array. 
* A callback to be called when the sub module controllers are loaded. This callback first argument will be an object describing the load result:

<syntaxhighlight lang="Javascript">
{
   errors : 0, // number of sub module controllers that could not be loaded
   subModules : [...] // list of the sub module controller instances created
}
</syntaxhighlight>

Once the sub controllers are loaded, they can be accessed from public properties of the main controller using the same path as the path for their data inside the data model. For previous example, a method to add a sub controller is added. Path to use is the path to the array of counters in the data model and the next index in this array:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/modules/subcontrollers/MyMainController.js' defer></script>

Then, assuming `moduleCtrl` is the main module controller public interface, the sub module controller public interface for the first counter will be accessible through `moduleCtrl.counters[0]`.

### Communication between sub module controllers and parent module

The communication from the parent to the sub modules controllers is straight forward as the parent hold a reference to them on its instance. Communication from sub modules to a parent module is done through the event raised by the sub modules. Module controllers have a method that can be overridden to listen to events coming from all sub module controllers : `onSubModuleEvent`, but listener can also be added manually by the parent controller after the sub module controller is loaded.

## Templates and sub module controllers

As described in the module controller documentation, the main controller will be attached to the main template when it is loaded, and its public interface will be available in the `moduleCtrl` variable. As sub module controllers are available from the interface of the main module controller, they can be attached to some part of the display.

### Template widget from the Aria library and path matching

Using the Template widget from the Aria widget library allow to use different feature to have a better structure:
* A module controller instance to be used as module controller can be specified for the template widget, for example one of the sub module controllers.
* If the data provided to the template widget corresponds to the data of a sub controller, the module controller instance of this widget will be the sub module controller.

Using this feature the view can be structured the same way the data and the module controllers are. For the list of counters, the main template will then be:


<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/modules/subcontrollers/MyMainView.tpl' defer></script>