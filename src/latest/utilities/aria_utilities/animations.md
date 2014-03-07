Title: Animations

This utility allows to animate an element on a set of CSS properties.
Users can define one or several queues of animations in order to build complex scenarios, register callbacks to some animation events and use different pre-defined or custom easing functions. Other features are also shown in this document.

The simple way to launch an animation is as follows
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/css/AnimationsScript.js?tag=utlAnimations&lang=at&outdent=true' defer></script>

Animation Sample Usage
<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/' ></iframe>

## Notable features

### Multiple concurrent animations
Several properties at a time can be animated, as shown below

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/multiple/' ></iframe>

### Units translation
It is possible to use different CSS units

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/units/' ></iframe>

### Queues
Aria Template utility allows to queue animations in two ways.
The `queue` configuration property can be set to true  in order to use the global queue.
In the second case, it is possible to provide a queue id in order to add an animation to a specific queue (and perhaps to execute several simultaneous queue and implement complex scenarios).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/queue1/' ></iframe>

### Callbacks
User callbacks are fired when the four events handled occur:
* **onStartAnimation**: fired before an animation starts
* **onEndAnimation**: fired after an animation ends
* **onStartQueue**: fired before a queue starts
* **onEndQueue**: fired after a queue ends

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/callbacks/' ></iframe>

### HTMLElement properties animation
Not only the HTMLElement style properties can be animated: also `scrollTop`, `scrollLeft` and other custom properties.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/scroll/' ></iframe>

### Easing functions
This utility provides four different easing functions:
* **linear**: mantains the same speed from start to end
* **ease-in-out**: animation with slow start and slow end
* **ease-out**: animation with slow start
* **ease-in**: animation with slow end

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/easing1/' ></iframe>

Furthermore, you can also provide Aria Templates with your custom function that has to be:
`y = f(x)`, where x represent the time and y is the progress of the animation.

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/easing2/' ></iframe>

### Complex scenarios
By exploiting the described features, it is possible to build complex scenarios like the following.

<iframe class='samples' style="height: 600px;" src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/complex/' ></iframe>


## Animable style properties

The animable style properties are the following:

* borderSpacing
* bottom
* fontSize
* height
* left
* letterSpacing
* lineHeight
* margin
* marginBottom
* marginLeft
* marginRight
* marginTop
* outlineWidth
* padding
* paddingBottom
* paddingLeft
* paddingRight
* paddingTop
* maxHeight
* minHeight
* minWidth
* right
* textIndent
* scrollLeft
* scrollTop
* top
* width
* wordSpacing

see them live in <a href="%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/" target="_blank">this dedicated sample</a>