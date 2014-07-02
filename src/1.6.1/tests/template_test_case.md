Title: Template Test Case

A Template test case allows to test an entire template (or module) in the DOM.
A template is loaded into the page just as if it was loaded in a whole applcation,
the test class however provides methods to check what is displayed in the page and to interact with it simulating user behavior.

It makes use of the class aria.jsunit.helpers.OutObj to mock a TemplateCtxt and provide a test area in the DOM.
OutObj is available as the property this.outObj of the test class.

## Test Structure

The structure of a Template test case is different from other unit tests. Due to the test complexity, a single TemplateTestCase class should be used only for one asynchronous test (usually corresponding to one template).

The skeleton is as follow:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TemplateTestCase.js?tag=skeleton&lang=javascript&outdent=true&noheader=true'></script>

There's only one entry point, runTemplateTest and the test can only be asynchronous, for this reason it's necessary to call this.end(); at the end of testing.

If the test class is called MyTemplateTest, by default, the test runner will load the template MyTemplateTestTpl inside the page and initialize it with an empty data-model. It is possible to change this behavior by configuring the environment as explained in the paragraph below.

## Environment

The environment configuration allows to change the default Template test case behavior.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TemplateTestCase.js?tag=configuration&lang=javascript&outdent=true&noheader=true'></script>

The environment can be changed in the test constructor calling `this.setTestEnv();`,
this method takes a configuration object with the following properties:

* `template` : Template classpath, defaults to this.$classpath + "Tpl".
* `moduleCtrl` : Module controller description. It should match the ModuleCtrl bean, defaults to null.
* `data` : Initial data model, default to an empty object.
* `iframe` : Whether the template should be loaded inside an iframe or directly in the test page.
Using an iframe gives more isolation but makes the test slower as the framework must be loaded twice. Defaults to false.
* `css` and `baseCss` : CSS text around the test area or iframe.
It is useful to change for instance the window size and assert what happens on viewport resize.
Use css if you want to append to default CSS text, or baseCss to change it completely.

As the test might run in different environments (in the test page or inside an iframe) TemplateTestCase class provide shortcuts to useful these objects:

* `this.templateCtxt` : Reference to the template context.
* `this.testWindow` : Reference to the window object containing the template under test.
* `this.testDocument` : Reference to the document object containing the template under test.
* `this.testDiv` : Element containing the template output.

The template context is particularly useful to test the internals of the template. It is an instance of aria.templates.TemplateCtxt so it has the interesting properties:

* `this.templateCtxt.data` : Template's data model.
* `this.templateCtxt.moduleCtrl` : Public interface of the module controller.
* `this.templateCtxt.moduleCtrlPrivate` : Private instance of the module controller.
* `this.templateCtxt._tpl` : Template instance, it has all the methods defined in the template script.

Through the templateCtxt is possible to call the methods (among many others):

* `this.templateCtxt.$refresh()` : Refresh the whole template of a specific section.
* `this.templateCtxt.$focus(id)` : Give focus to the element with the specified id.
* `this.templateCtxt.$getElementById(id)` : Returns an HTMLElement wrapped in DomElementWrapper.

## DOM Assertions

Usual assertion for this type of test case are the presence of DOM elements on the page, their attributes or properties when the template is loaded or after user interaction or template refresh.

The following utilities might be of help when asserting DOM element properties:

* `aria.utils.Dom` with methods like `calculatePosition`, `getGeometry` and `getStyle`.
* `aria.popups.PopupManager` with methods like `getZIndexForPopup`.

The above utilities are useful once you have a DOM element, to retrieve it you can use any of the following methods of the test class.

* `getElementById(id)` : Return the DOM element in the current template with the specified id
(the id should have been given with the {id .../} statement).
* `getElementsByClassName(dom, classname)` : Get the element with the given class, child of a dom element.
* `getWidgetInstance(id)` : Get the instance of a widget from the template, given its ID.
* `getWidgetDomElement(id, tagName)` : Get the first DOM element with the given tag name from the given widget in the template.
* `getInputField(id)` : Get the input DOM element of an input based widget.
* `getWidgetDropDownPopup(id)` : Get the DOM element of the dropdown popup associated to a DropDownTrait widget
(MultiSelect, AutoComplete, ...).
* `getExpandButton(id)` : Get the expand button of a dropdown-based widget (MultiSelect, AutoComplete, ...).
* `getLink(id)` : Get the a DOM element of a Link widget.

This test class provides also methods to retrieve information of DOM elements:

* `computeZIndex(element)` : Compute the z-index of an element.

## User Interaction

The greatest advantage of TemplateTestCase class is the ability to simulate user behavior like click, type, mouse move and so on.

The class provides the following methods:

* `this.clickAndType(id, text, callback, blur)` : Calling this method will click on the element with id id, type the text in text, blur the field if blur is true (default value) and execute the callback after.

clickAndType is convenient shortcut for a common user action, the implementation of this method use the utility class aria.utils.SynEvents that is a wrapper around syn, the Standalone Synthetic Event Library by bitovi and available as shortcut on this.synEvent.

* `this.synEvent.click(element, callback)` : Emulates a click event on a specific DOM element, it'll also fire in the correct order the events mosedown, mousemove and mouseup.
* `this.synEvent.move(options, from, callback)` : Emulates a mouse move from a given element from or a point in the screen to another point as described in options. It'll fire the eventsmouseover and mouseout as well as mouseenter and mouseleave on Internet Explorer.
* `this.synEvent.type(element, text, callback)` : Emulates typing in a specific DOM element. It fires the events keydown, keypress and keyup on the given target.

It is recommended to use the shortcut `this.synEvent` over the full classpath because the shortcut fires the events
in the correct environment, even when the test runs inside an iframe.

For more flexibility it's also possible to use the Syn object directly using this.testWindow.Syn.
This allows to call any method provided by Syn, the drawback is that the callback must be a plain function and
cannot be Aria Templates callback.

Syn provides the following actions:

* `Syn.click(options, element, callback)`.
* `Syn.dblclick(options, element, callback)`.
* `Syn.rightClick(options, element, callback)`.
* `Syn.move(options, element, callback)`.
* `Syn.drag(options, element, callback)`.
* `Syn.key(options, element, callback)`.
* `Syn.type(options, element, callback)`.

The actions provided by Syn are always more complex than simply raising an event,
in most cases they fire multiple events or simply require different implementation depending on the browser.

A lower level API is exposed by:

* `Syn.trigger(type, options, element)` : This method allows to create a synthetic event and dispatch it on the element.
It also runs any default actions for that element (like following a link on `<a>` tags).
* `aria.utils.FireDomEvent.fireEvent(type, element, options)` :
Fire any event on a target HTML element. It supports mouse, keyboard and generic HTML events.
It can be used as well to simulate touch events.
* `aria.utils.Delegate.delegate(event)` : Use the internal delegate mechanism to fire any event,
even non-standard ones. Events can be created calling `aria.DomEvent.getFakeEvent(type, element)` and then adding properties on it.
This is the lowest level API and only works for framework parts that rely on event delegation.

## Examples

Template Test using a module controller

The following example shows how to use a module controller in a template test.
Currently it is necessary to set the data object inside the Environment explicitly
to null to access the same object from the template/template script and the module controller.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/tests/TemplateTestCase.js?tag=moduleController&lang=javascript&outdent=true&noheader=true'></script>

.
