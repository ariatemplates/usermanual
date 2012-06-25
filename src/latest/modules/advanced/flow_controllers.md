Title: Flow_Controllers



{{Draft}}

The goal of flow controllers is to contain the flow logic and keep it separated from the rest of the application so that it can be managed and customized independently and more easily. The flow controller is in charge of managing the flow, which means the following:

* maintaining in the data model the current state of the flow
* intercepting calls to the module controller to update that state
* receiving navigation requests from templates
* and raising events so that templates can be refreshed to reflect the current state of the flow

For each module controller instance, there is an associated flow controller instance (if a flow controller is present). The following schema describes the relation between a module controller, its flow controller and templates:

[Image:at_doc_overview_flow_controller.png](Image:at_doc_overview_flow_controller.png)

# Similarities with module controllers

Flow controllers are very similar to module controllers:

* a flow controller is a class which extends `aria.templates.FlowCtrl`, which itself extends `aria.templates.PublicWrapper`
* a flow controller has a public interface (the interface is created and attached to the flow controller in the same way as for [module controllers](Controllers) with the difference that flow controller interfaces must inherit `aria.templates.IFlowCtrl` (currently empty) and not `aria.templates.IModuleCtrl`)
* a flow controller is created and destroyed at the same time as its associated module controller
* templates can access the public interface wrapper of the associated flow controller through the `flowCtrl` variable (similar to the `moduleCtrl` variable)
* template scripts can receive events from the flow controller by implementing the `onFlowEvent` method (similar to the `onModuleEvent`)

# Associating a flow controller with a module controller

Currently, there is a naming convention to find the flow controller associated to a given module controller: the flow controller classpath is the classpath of the module controller with the "Flow" suffix added. The framework knows that there is an associated flow controller if the $hasFlowCtrl variable is set to true in the prototype of the module controller. Then, when the module controller is created (either through `Aria.loadTemplate` or `this.loadSubModules` in a parent module, or directly through the module controller factory `aria.templates.ModuleCtrlFactory`), the flow controller is automatically created as well.

Remember that flow controllers can be customized (this feature will be provided in a future release of Aria Templates), so that the flow controller associated to a module controller can actually be different from the one with the "Flow" suffix added. There should not be any assumption made on which flow controller is associated to a given module controller (anyway, the module controller does not have any reference to the flow controller).

If a special flow controller has to be used, the `$hasFlowCtrl` property can be set directly to the flow controller classpath:

<srcinclude lang="JavaScript" outdent="true">modules/flow_controllers/MyModuleController.js
</srcinclude>

# Intercepting module controller calls

A flow controller can intercept calls to its associated module controller, so that each time a template (or the parent module controller) is calling the module controller, the flow controller is notified and can update its internal state, do extra action before, after or on the callback of the call to the module controller, and/or even cancel the call to the module controller.

To intercept calls to the module controller, the following naming convention is used for intercepting methods in flow controllers (_MethodName_ should be replaced by the corresponding module controller method declared in its public interface)

* `on<<MethodName>>CallBegin` - called before the corresponding method is called on the module controller.
* `on<<MethodName>>CallEnd` - called after the corresponding method of the module controller returns.
* `on<<MethodName>>Callback` - called if the method is asynchronous (as declared in the interface) when the callback is called, before the call of the normal callback. Note that "Callback" can sometimes be called before "CallEnd" if the module controller method calls its callback synchronously.

These methods are automatically called, if present, when the corresponding method is called in the module controller. The parameter passed to these functions is described in [the article about interceptors](Interceptors), which also gives more details about the concept of interceptors in Aria Templates.

# Example Code

## Module controller interface

Let's consider the following public interface of the module controller:

<srcinclude lang="JavaScript" outdent="true">modules/flow_controllers/IMyModule.js</srcinclude>

## Flow controller interface

Here is the public interface of the flow controller:

<srcinclude lang="javascript" outdent="true">modules/flow_controllers/IMyModuleFlow.js</srcinclude>

## Flow controller implementation

Here is a flow controller implementation. Note: so that the flow controller is actually used, the associated module controller (`modules.mymodule.MyModule`) must contain `$hasFlowCtrl: true` on its prototype - like here - or as a property defined in the constructor.

<srcinclude lang="JavaScript" outdent="true">modules/flow_controllers/MyModuleFlow.js</srcinclude>