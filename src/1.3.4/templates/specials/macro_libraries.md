Title: Macro Libraries
Category: Special Templates
Author: Benoit Charbonnier

A macro library is a collection of macros which can be used by templates.

## Definition

A macro library can be defined as in the example below:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/macros/MyLib.tml?lang=at&outdent=true'></script>

Notes:

* All libraries have the extension `.tml` (template macro library), therefore the file above is called `Library.tml`.
* Access to the data and the module controller is not allowed as the `data` and `moduleCtrl` object are not put in the Library's scope. The only way in which a Library can access this and other data supplied by the template is by taking them as macro parameters.
* Libraries cannot use CSS templates. The option to do so will be offered in a future release.


## Use in Templates

A macro library can be declared in the `macrolibs` section of the Template statement. The declaration includes a configuration, which is a number of `handles` and a `classpaths`. The handles can then be used throughout the template to access the library's macros as shown in the example below.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/macros/MyTemplate.tpl?lang=at&outdent=true'></script>

The declaration takes as parameter a Javascript Object, in which every property is an identifier (the handle which will be used in the template) and each corresponding value is a string (the classpath of the library which will be bound to the handle). Furthermore the declaration:

* Can include several handle-classpath couples in the argument.
* Can also be used in Libraries exactly like it's used in Templates, making it possible to arbitrarily organize library inclusion hierarchies.
* Cannot be used in CSS templates.


## Scripting

Libraries can use scripts just like templates by providing them in the Library declaration. From a design standpoint, access to the script functions should be restricted to libraries, even though script methods are still accessible as properties of the handle in the template. An example of this is shown below.


### Script

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/macros/MyLibScript.js?lang=javascript&outdent=true'></script>


### Library

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/macros/MyLib.tml?lang=at&outdent=true'></script>


### Template

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/templates/macros/MyOtherTemplate.tpl?lang=at&outdent=true'></script>

Libraries inherit from [`aria.templates.Template`](http://ariatemplates.com/api/#aria.templates.Template), therefore any library script should do the same, following the concepts explained in the article about [Template Scripts](scripts).


## Sample Usage

* Simple macro definition inside a library
* Simple macro definition inside a library with an associated script

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/macros/simpleMacro/'></iframe>
