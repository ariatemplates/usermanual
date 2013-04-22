Title: Keyboard Navigation



Keyboard navigation plays an important role in the usability and accessibility of your application.  Depending on your requirements, Aria Templates provide different means to handle keyboard interactions easily.

## Tab Navigation

Using the tab key to navigate through the list of controls in your interface is the most basic keyboard navigation that is natively available in any browser.
Control of this behavior can be achieved using the `tabindex` property of elements that defines the order in which they should receive focus.
This property being also supported by AT widgets, it is very intuitive to indicate the tabbing sequence for the controls of a template.

<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/KeyboardNav.tpl?tag=simpleSample&lang=at&noheader=true&outdent=true" ></script>


<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/tabnavigation/' ></iframe>

Because it is possible in the same application to use templates in which the same `tabIndex` is used for different widgets, or simply because the same template may be used several times in the same panel, collisions may occur.
To avoid this issue, the Template widget provides a <code>[baseTabIndex](http://ariatemplates.com/api/#aria.widgets.CfgBeans:TemplateCfg)</code> property that sets the base index from which all of its widgets' `tabIndex` should be computed.

Consider the following code:

<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/KeyboardNav.tpl?tag=subTpls&lang=at&noheader=true&outdent=true" ></script>


In this example, each `tabindex` used by widgets in `SubTpl1.tpl` will be incremented by 100, and those in `SubTpl2.tpl` by 200.
Thus, if the following button is defined in `SubTpl1.tpl`...


<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/SubTpl1.tpl?tag=subTplIndex&lang=at&noheader=true&outdent=true" ></script>

...its real `tabindex` in the resulting page will be 104.

Keep in mind the following when using `baseTabIndex`:

* It will only affect the `tabindex` property of widgets and will not have any effect on regular HTML elements.
* It is not applied recursively: if a template sets a `baseTabIndex` to 100 and one of its child templates sets it to 200, widgets in the child template will use 200 as a base for their `tabIndex`, not 300.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/subTemplate/' ></iframe>


## Keymaps

Keymaps are mechanisms that AT uses to catch sets of keystrokes and assign them to specific actions.
They can be created to handle keyboard shortcuts inside a specific section or at application level.


### Creating keymaps

The <code>[keymap object](http://ariatemplates.com/api/#aria.templates.CfgBeans:KeyMapConfiguration)</code> defines a keystroke and which method it should execute.  It has the following properties:

* **`key`**: a key (see below)
* **`shift`**: _ (optional)_ a boolean indicating whether or not the Shift key must be pressed
* **`ctrl`**: _ (optional)_ a boolean indicating whether or not the Ctrl key must be pressed
* **`alt`**: _ (optional)_ a boolean indicating whether or not the Alt key must be pressed
* **`callback`**: a callback object as defined in [this article](working_in_an_asynchronous_world#aria-templates-callback-object)

The `key` parameter can either be:

* A key code, e.g. `120`
* An <code>[aria.DomEvent](http://ariatemplates.com/api/#aria.DomEvent)</code> code constant, e.g. `aria.DomEvent.KC_F9`
* The `"*"` wildcard character (see [using keymaps at section level](keyboard_navigation#at-section-level))
* A key shortcut string, e.g. `"F9"`
  <pre>
    BACKSPACE, TAB, NUM_CENTER, ENTER, RETURN, SHIFT, CTRL, CONTROL,
    ALT, PAUSE, CAPS_LOCK, ESCAPE, SPACE, PAGEUP, PAGE_UP, PAGEDOWN,
    PAGE_DOWN, END, HOME, LEFT, ARROW_LEFT, UP, ARROW_UP, RIGHT,
    ARROW_RIGHT, DOWN, ARROW_DOWN, PRINT_SCREEN, INSERT, DELETE, ZERO,
    ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, A, B, C, D,
    E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
    CONTEXT_MENU, NUM_ZERO, NUM_ONE, NUM_TWO, NUM_THREE, NUM_FOUR,
    NUM_FIVE, NUM_SIX, NUM_SEVEN, NUM_EIGHT, NUM_NINE, MULTIPLY,
    PLUS, MINUS, PERIOD, DIVISION, DIVIDE, F1, F2, F3, F4, F5, F6,F7,
    F8, F9, F10, F11, F12
  </pre>

Example:

<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/KeyboardNavScript.js?tag=keyMapSyntax&lang=javascript&noheader=true&outdent=true" ></script>

### Using keymaps

There are two ways to assign keymaps to your app depending on the scope you want your shortcuts to have.


#### At Section Level

Keymaps assigned to a section will only be active when the focus is inside this section.
To do so, you need to supply an array of keymaps objects to the `keyMap` property of your [section](http://ariatemplates.com/api/#aria.templates.CfgBeans:SectionCfg), like in this example:

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/sectionkeyMap/' ></iframe>

The return value of a section keymap's callback method defines whether or not the keyboard event should bubble or not.
If the method returns `true`, the event will be propagated to parent sections and globally defined keymaps hooks (see below), if it returns `false` the shortcut will only be interpreted by the current section.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/bubbleKeyMap/' ></iframe>

We've seen earlier that it was possible to use the `"*"` wildcard character in a keymap definition.
In this case, the keymap will match any key (with specified modifiers if any) that was not previously caught by the other definition for the same section.
Because this happens before the keyboard event is passed to the parent section, a wildcard keymap can be used to trap shortcuts defined at a higher level inside a subsection.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/wildcardKeyMap/' ></iframe>


#### At Application Level

Keymaps assigned at application level will be triggered wherever the focus is.
In this case, they must be set using the `addGlobalKeyMap()` method of <code>[aria.templates.NavigationManager](http://ariatemplates.com/api/#aria.templates.NavigationManager:addGlobalKeyMap:method)</code>.
This can be done anywhere in your code.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/applicationLevelKeyMap/' ></iframe>

Note that, if you can provide multiple keymap in a section configuration, `addGlobalKeyMap()` only accepts one definition per call, meaning you need to use it for each keyboard shortcut you want to set.

It is also possible to delete a globally assigned keymap using the `removeGlobalKeyMap()` method to which you pass a simpler keymap definition without callback, as illustrated below:


<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/KeyboardNavScript.js?tag=removeGlobal&lang=javascript&noheader=true&outdent=true" ></script>


<span style="color:#D13838">Be careful!</span> Hooks set using `addGlobalKeyMap()` are not automatically removed when the object that created them is destroyed.  Don't forget to remove them.


## Table-Like Navigation

The table-like navigation feature of Aria Templates allows moving focus using arrow keys inside a section.
When set, using the `up` and `down` arrow keys (along with modifiers if activated) moves the focus from one element to the next one.
Note that in this context "next one" has to be understood as "the next element defined in the template": the `tabIndex` widgets property (explained at the beginning of this article) has no effect in this case.

To enable table-like navigation for a section, you can simply set its `tableNav` property to `true` or to a <code>[TableNavConfiguration](http://ariatemplates.com/api/#aria.templates.CfgBeans:TableNavConfiguration)</code> object (a keymap definition without callback) to trigger it only when the specified modifiers are used.
The following example illustrates the functionality in a section where you can move from one textfield to another using `ctrl` + arrows keys.

<script src="http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/keyboard_nav/KeyboardNav.tpl?tag=tableLikeNav&lang=at&noheader=true&outdent=true" ></script>


<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/tableNavigation/' ></iframe>

In tables defined within sections that enable `tableNav`, focus can be moved from cell to cell using the `left` and `right` arrows on top of `up` and `down`.
This applies to cells that contain at least a focusable element and if more than one are present focus will be set on the first one.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/tableNavigationFocus/' ></iframe>

There are few things to note when using table-like navigation:

* Subsections will inherit the behavior of their parent section.
* A consequence of this is that when a parent section has enabled arrows only navigation (`tableNav:true`) all of its subsections will inherit it, even if they redefine the property to use modifiers.
* Subsections can set their `tableNav` property to `false` to prevent inheritance.
* In a section using table-like navigation, focus always moves to the next (or previous) element, including elements outside of the section where `tableNav` might not be enabled.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/keyboardnavigation/tableNavigationInherit/' ></iframe>
