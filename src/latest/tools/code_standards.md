Title: Code Standards

<div id="Top"></div>
These are the rules that we follow when we write the aria templates code. Please take a look at it and keep it in mind if you want to contribute pushing code to the aria templates Github repository.

<h4>Generic rules</h4>

<table class="hor-zebra">
    <tr>
     <th scope="col">#</th>
     <th scope="col">To be checked</th>
     <th scope="col">Comment</th>										
    </tr>


    <tr class="odd">
      <td>1</td>
      <td>JsLint</td>
      <td>
We are using JsLint. New classes should trigger no errors. Please take a look to our [#jslint-rules](#jslint-rules).
      </td>										
    </tr>
									<tr>
										<td>2</td>
										<td>Error reporting</td>
										<td>Any $log call should be made with an error referenced in $statics. When adding a new error message, make use of the %N string replacement.</td>							
									</tr>
									<tr class="odd">
										<td>3</td>
										<td>Use of assert statements</td>
										<td>Verify the validity of variables.</td>										
									</tr>
									<tr>
										<td>4</td>
										<td>There is enough logging</td>
										<td>At least deprecated methods and errors are logged.</td>										
									</tr>
									<tr class="odd">
										<td>5</td>
										<td>JsDoc format</td>
										<td>JsDoc well formated (use only agreed types: String, Number, Object, Boolean, Array, Date, HTMLElement, Function, uic. TextField, flag private classes, methods and properties as such with @private, don't forget the @singleton if needed, don't forget the @protected flag and document usage examples with pre tags)</td>										
									</tr>
									<tr>
										<td>6</td>
										<td>JsDoc well written and english</td>
										<td>Read through all your doc to make sure no copy/paste are remaining from other methods.</td>										
									</tr>
									<tr class="odd">
										<td>7</td>
										<td>Js unit test added</td>
										<td>Using the aria.jsunit framework.</td>										
									</tr>
									<tr>
										<td>8</td>
										<td>Js unit test passing</td>
										<td>Complete unit test suite must pass on all supported browser.</td>										
									</tr>
									<tr class="odd">
										<td>9</td>
										<td>Js unit test are valid</td>
										<td>asserTrue(true) is not enough.</td>										
									</tr>
									<tr>
										<td>10</td>
										<td>Reuse existing code</td>
										<td>Reuse as much as possible of other classes, methods, utilities. Have a look at our utils, dom, etc.</td>										
									</tr>
									<tr class="odd">
										<td>11</td>
										<td>Responsibilities are well separated into several classes</td>
										<td>If the class does multiple different things, it will be harder to maintain, harder to unit test and may grow indefinitely after that. Make sure different responsibilities are handled in different classes that agree on a unit testable API.</td>										
									</tr>
									<tr>
										<td>12</td>
										<td>Destroy DOM references</td>
										<td>Any class that does dom manipulation, or adds event listeners to dom object may have to keep reference in one way or another to a DOM object. In this case, implement the $destructor of your class to break these DOM references. And finally, call your superclass destructor too: this.$MySuperClass.$destructor.call(this).</td>										
									</tr>
									<tr class="odd">
										<td>13</td>
										<td>Do not extend native objects prototypes</td>
										<td>Please don't extend native objects prototypes.</td>										
									</tr>
									<tr>
										<td>14</td>
										<td>Do not introduce new globals</td>
										<td>Do not introduce new global objects.</td>										
									</tr>
									<tr class="odd">
										<td>15</td>
										<td>Config beans</td>
										<td>Any public interface (widgets) should be defined through config beans, also internally, passing very complex objects between classes should be made with config beans. Beans must be defined either in an external beanDefinition class, or via $beans inside the class itself. Make use of .check() and .normalize() to validate your inputs.</td>										
									</tr>
									<tr>
										<td>16</td>
										<td>Config beans documentation</td>
										<td>Properties of a bean must be documented in plain and understandable english.</td>										
									</tr>
									<tr class="odd">
										<td>17</td>
										<td>Memory leaks</td>
										<td>Make sure you implement the destructor correctly and nullify the DOM element references you might have set. If you created a new widget, create a simple template to be used in the memory leak test application.</td>										
									</tr>
									<tr>
										<td>18</td>
										<td>public/private/protected variables</td>
										<td>Choose carefully the visibility of your variables.</td>										
									</tr>
									<tr class="odd">
										<td>19</td>
										<td>Closures</td>
										<td>Try not to create functions in closure scope. All functions should be declared at prototype level. Use Aria.empty, Aria.returnTrue or Aria.returnFalse for simple functions otherwise remember to set to null all variables in closure scope that are not needed by the newly defined function.</td>										
									</tr>
																
							</table>
<br />
<br />
<div id="JsLint rules"></div>
<h4>JsLint rules</h4>
For JsLint we are using these rules:


<table class="hor-zebra">
	<tr>
		<th scope="col">#</th>
		<th scope="col">Rule</th>
		<th scope="col">#</th>
		<th scope="col">Rule</th>                                    
    </tr>
    <tr class="odd">
		<td>1</td>
		<td>Do not assume console, alert</td>
		<td>19</td>
		<td>Tolerate continue</td>           
    </tr>
	<tr>
		<td>2</td>
		<td>Assume Browser</td>
		<td>20</td>
		<td>Tolerate ++ and -</td>                         
	</tr>
	 <tr class="odd">
		<td>3</td>
		<td>Do not assume Node.js</td>
		<td>21</td>
		<td>Tolerate . and [^…] in regexp</td> 
	</tr>
	<tr>
		<td>4</td>
		<td>Do not assume Rhino</td>
		<td>22</td>
		<td>Tolerate misordered definitions</td>             
	</tr>
	<tr class="odd">
		<td>5</td>
		<td>Do not assume Yahoo widget</td>
		<td>23</td>
		<td>Do not tolerate unused names</td>
	</tr>
	<tr>
		<td>6</td>
		<td>Do not assume Windows</td>
		<td>24</td>
		<td>Tolerate missing use strict pragma</td>              
	</tr>
	<tr class="odd">
		<td>7</td>
		<td>Do not stop on first error</td>
		<td>25</td>
		<td>Tolerate inefficient subscripting</td>
	</tr>
	<tr>
		<td>8</td>
		<td>Do not use safe subset</td>
		<td>26</td>
		<td>Do not tolerate many var statements per function</td>              
	</tr>
	<tr class="odd">
		<td>9</td>
		<td>Do not verify ADsafe</td>
		<td>27</td>
		<td>Do not tolerate messy white space</td>
	</tr>
	<tr>
		<td>10</td>
		<td>Do not tolerate bitwise operators</td>
		<td>28</td>
		<td>Do not tolerate undefined variables (Predef: Aria, aria, test)</td>              
	</tr>
	<tr class="odd">
		<td>11</td>
		<td>Tolerate continue</td>
		<td>29</td>
		<td>Do not tolerate sloppy line breaking</td>
	</tr>
	<tr>
		<td>12</td>
		<td>Do not tolerate debugger statements</td>
		<td>30</td>
		<td>Do not tolerate wrapper forms</td>             
	</tr>
	<tr class="odd">
		<td>13</td>
		<td>Do not tolerate == and !=</td>
		<td>31</td>
		<td>Do not tolerate missing semicolon</td>
	</tr>
	<tr>
		<td>14</td>
		<td>Tolerate EcmaScript 5 syntax</td>
		<td>32</td>
		<td>Do not tolerate missing parens around immediate invocations</td>             
	</tr>
	<tr class="odd">
		<td>15</td>
		<td>Do not tolerate eval</td>
		<td>33</td>
		<td>Do not tolerate unsafe character</td>
	</tr>
	<tr>
		<td>16</td>
		<td>Do not tolerate unfiltered for in</td>
		<td>34</td>
		<td>Do not tolerate new Array instead of the array literal notation []</td>              
	</tr>
	<tr class="odd">
		<td>17</td>
		<td>Do not tolerate uncapitalized constructors</td>
		<td>35</td>
		<td>Do not tolerate new Object instead of the object literal notation {}</td>              
	</tr>
	<tr>
		<td>18</td>
		<td>Tolerate dangling _ in identifiers</td>
                <td></td>
                <td></td>
	</tr>
</table>

[#top](#top)

You can copy/paste our JsLint rules directely from here:


`jslint devel: false, bitwise: false, undef: true, browser: true, continue: true, unparam: false, node: false, debug: false, sloppy: true, rhino: false, eqeq: true, widget: false, es5: false, sub: true, windows: false, evil: false, vars: false, forin: false, white: false, passfail: false, newcap: false, nomen: true, plusplus: true, regexp: true, maxerr: 50, maxlen: 120, indent: 4 `