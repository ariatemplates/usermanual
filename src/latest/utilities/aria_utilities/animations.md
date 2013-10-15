Title: Animations

This utility allows to animate an element on a set of CSS properties. 
Users can define one or several queues of animations in order to build complex scenarios, register callbacks to some animation events and use different pre-defined or custom easing functions. Other features are also shown in this document.

The simple way to launch an animation is as follows
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/utils/css/AnimationsScript.js?tag=utlAnimations&lang=at&outdent=true' defer></script>

Animation Sample Usage
<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/sampleUsage/' ></iframe>

## Notable features

### Multiple concurrent animations
Several properties at a time can be animated, as shown below

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/multiple/' ></iframe>

### Units translation
It is possible to use different CSS units

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/units/' ></iframe>

### Queues
Aria Template utility allows to queue animations in two ways.
The `queue` configuration property can be set to true  in order to use the global queue.
In the second case, it is possible to provide a queue id in order to add an animation to a specific queue (and perhaps to execute several simultaneous queue and implement complex scenarios).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/queue1/' ></iframe>

### Callbacks
User callbacks are fired when the four events handled occur:
* **onStartAnimation**: fired before an animation starts
* **onEndAnimation**: fired after an animation ends
* **onStartQueue**: fired before a queue starts
* **onEndQueue**: fired after a queue ends

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/callbacks/' ></iframe>

### HTMLElement properties animation
Not only the HTMLElement style properties can be animated: also `scrollTop`, `scrollLeft` and other custom properties.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/scroll/' ></iframe>

### Easing functions
This utility provides four different easing functions:
* **linear**: mantains the same speed from start to end
* **ease-in-out**: animation with slow start and slow end
* **ease-out**: animation with slow start
* **ease-in**: animation with slow end

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/easing1/' ></iframe>

Furthermore, you can also provide Aria Templates with your custom function that has to be:
`y = f(x)`, where x represent the time and y is the progress of the animation.

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/easing2/' ></iframe>

### Complex scenarios
By exploiting the described features, it is possible to build complex scenarios like the following.

<iframe class='samples' style="height: 600px;" src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/complex/' ></iframe>


## Animable style properties

The animable style properties are the following:

* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/backgroundPositionX/" target="_blank">backgroundPositionX</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/backgroundPositionY/" target="_blank">backgroundPositionY</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderWidth/" target="_blank">borderWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderBottomWidth/" target="_blank">borderBottomWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderLeftWidth/" target="_blank">borderLeftWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderLeftWidth/" target="_blank">borderLeftWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderRightWidth/" target="_blank">borderRightWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderTopWidth/" target="_blank">borderTopWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/borderSpacing/" target="_blank">borderSpacing</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/bottom/" target="_blank">bottom</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/fontSize/" target="_blank">fontSize</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/height/" target="_blank">height</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/left/" target="_blank">left</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/letterSpacing/" target="_blank">letterSpacing</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/lineHeight/" target="_blank">lineHeight</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/margin/" target="_blank">margin</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/marginBottom/" target="_blank">marginBottom</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/marginLeft/" target="_blank">marginLeft</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/marginRight/" target="_blank">marginRight</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/marginTop/" target="_blank">marginTop</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/outlineWidth/" target="_blank">outlineWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/padding/" target="_blank">padding</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/paddingBottom/" target="_blank">paddingBottom</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/paddingLeft/" target="_blank">paddingLeft</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/paddingRight/" target="_blank">paddingRight</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/paddingTop/" target="_blank">paddingTop</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/maxHeight/" target="_blank">maxHeight</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/minHeight/" target="_blank">minHeight</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/minWidth/" target="_blank">minWidth</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/right/" target="_blank">right</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/textIndent/" target="_blank">textIndent</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/scrollLeft/" target="_blank">scrollLeft</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/scrollTop/" target="_blank">scrollTop</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/top/" target="_blank">top</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/width/" target="_blank">width</a>**
* **<a href="http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/css/animations/wordSpacing/" target="_blank">wordSpacing</a>**
