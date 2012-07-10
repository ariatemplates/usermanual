Title: JSON Bean Definitions


When developing your application, you might want to describe the structure of the data model you are using. This can be very important for two reasons:

* **data validation:** in some cases it is useful to perform a client side validation of data coming from the user or from the server.
* **Data normalization:** adding default values automatically can spare you a lot of effort for checking whether some data portions have been defined or not.
* **Documentation:** your code could be more readable if you were able to define properly the type of data that you expect in the signature of a method.

Aria Templates allows you to define your own JSON Schemas by means of **Bean definitions**. The framework uses these schemas extensively: just to mention a couple of examples, widget configurations and AJAX request parameters are normalized against bean definitions.

**Remark:** In this article the words _bean definition_, _schema_ and _data type_ are used as sinonyms.

## Bean definitions

A bean definition is a Json object that contains all the information on the data type that you want to define.

Bean definitions are grouped into packages. In order to define a package you have to use the [Aria.beanDefinitions](http://ariatemplates.com/api/##Aria:beanDefinitions:method) method of the [Aria singleton object](the_aria_singleton#beandefinitions). Let us introduce an example of usage that will allow to explain in more detail how to specify bean definitions.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/beans/SimpleBean.js?lang=javascript&outdent=true' defer></script> 

This method allows to define the package **`ariadoc.snippets.core.beans.SimpleBean`** which contains the two bean definitions **`Name`** and **`Age`**.

Each bean definition contains the mandatory **`$type`** property. It represents the parent type of the data type that you want to define. The parent type is described by means of a string like 'namespace:value', where the namespace refers to the package in which the corresponding parent bean definition is set, and the value refers to the bean definition itself. It is advisable to define the namespaces corresponding to the packages that you will be using in the **`$namespaces`** property of the bean definition.

In the above example, the parent type of the schema **`Name`** is the type **`String`** whose schema is defined in the package **`aria.core.JsonTypes`**. On top of that, the bean definition `Name` has its own properties `$description`, `$sample` and `$mandatory`. This means that `Name` **inherits** all the properties of its parent bean `aria.core.JsonTypes.String` and adds or **overrides** the parent `$description`, `$sample` and `$mandatory` properties.

This **bean inheritance** mechanism is the very core of beans definitions in Aria Templates. Every data type that you define (through a bean definition) will have to inherit from another data type (specified in another bean definition).

## Built-in data types

Aria Templates provides a set of built-in data types whose bean definitions are available in the package [aria.core.JsonTypes](http://ariatemplates.com/api/#aria.core.JsonTypes). Every other schema is a descendant of one of these schemas. Technically, these types are characterized by the fact that they inherit from themselves.

There are two categories of built-in types (click on the links to learn more about them):

* **simple types**: [String](http://ariatemplates.com/api/##aria.core.JsonTypes:String), [Boolean](http://ariatemplates.com/api/##aria.core.JsonTypes:Boolean), [Integer](http://ariatemplates.com/api/##aria.core.JsonTypes:Integer), [Float](http://ariatemplates.com/api/##aria.core.JsonTypes:Float), [Date](http://ariatemplates.com/api/##aria.core.JsonTypes:Date), [RegExp](http://ariatemplates.com/api/##aria.core.JsonTypes:RegExp), [ObjectRef](http://ariatemplates.com/api/##aria.core.JsonTypes:ObjectRef), [FunctionRef](http://ariatemplates.com/api/##aria.core.JsonTypes:FunctionRef), [JsonProperty](http://ariatemplates.com/api/##aria.core.JsonTypes:JsonProperty), [Enum](http://ariatemplates.com/api/##aria.core.JsonTypes:Enum)
***complex types**: [Object](http://ariatemplates.com/api/##aria.core.JsonTypes:Object), [Array](http://ariatemplates.com/api/##aria.core.JsonTypes:Array), [Map](http://ariatemplates.com/api/##aria.core.JsonTypes:Map), [MultiTypes](http://ariatemplates.com/api/##aria.core.JsonTypes:MultiTypes)


When creating your bean definition, you can always include the following properties (an explanation is also available [here](http://ariatemplates.com/api/##aria.core.BaseTypes:Element)):

***`$type`:** the mandatory parent type
***`$description`:** a short literal description of your data type. It is mandatory when inheriting directly from a built-in data type. When inheriting from a user-defined schema, it is not necessarily required.
***`$sample`:** an example
***`$mandatory`:** a boolean telling whether the element has to be provided for the Json object containing it to be valid. More detail on validation will be provided [later](#validation).
***`$default`:** the default value. If the data is mandatory, it obviously does not make sense to provide a default value.


Furthermore, depending on the built-in type that you want your schema to inherit from, some additional properties can be specified (and others are automatically added by the framework). Most of them are useful for validation purposes.
For example, when using the Integer type, you might want to specify the allowed range (minimum and maximum value), or when using a String type as parent you might want to specify a regular expression that it has to match in order to be valid. The basic example introduced earlier can be enhanced a little by adding extra properties to the bean definitions:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/beans/AnotherSimpleBean.js?tag=example&lang=javascript&outdent=true' defer></script>

The list of extra properties that can be added to the schema according to the ancestor built-in type can be found [here](http://ariatemplates.com/api/#aria.core.BaseTypes)

## Examples

In this section we will introduce more complex examples involving complex built-in data types like Arrays, Objects and MultiTypes, as well as the inheritance from a user-defined schema. Consider the following example:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/beans/BaseContactBeans.js?lang=javascript&outdent=true' defer></script>

The following explanatory remarks might be useful:

* when using type `"json:Object"`, the **`$properties`** property is a Json object whose values are themselves bean definitions to describe the type of expected data. Thus, another bean definition is automatically available at, for example, **`Address.$properties.city`**.
* When using type `"json:Array"` (see `BaseContact.$properties.address`), a **`$contentType`** can be specified as a schema (available at `BaseContact.$properties.address.$contentType`).
* `BaseContact.$properties.address.$contentType` is a bean definition that inherits from the user-defined bean definition `Address`. In particular, it overrides only its `$description`.


Consider the following example:


<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/beans/ContactBeans.js?lang=javascript&outdent=true' defer></script>

Remarks:

* the package `ariadoc.snippets.core.beans.BaseContactBeans` is included in the **`$namespaces`** property of the bean definition. This allows to use schemas defined in that package.
* The `Person` and `Animal` schemas inherit from the type `BaseContact` defined in the `ariadoc.snippets.core.beans.BaseContactBeans` package. They add a property to the `$properties` of their parent type.
* Bean `Group` inherits from the built-in complex type **`"json:Map"`**. The difference between a Map and an Object is that in a Map there is no constraint to the keys that can be used. The `Group.$contentType` schema describes the type of the valid values.
* Bean `Group.$contentType` inherits from the built-in complex type **`"json:MultiTypes"`**. This special type allows to specify alternative types for a data. In this case the allowed types inherit from `Person` or `Animal`.

This special type allows you to specify the different alternative types that are allowed.

## Validation

The main purpose of defining schemas is to check the validity of data. Aria Templates allows you to perform data model validation by means of the class [aria.core.JsonValidator](http://ariatemplates.com/api/#aria.core.JsonValidator). There are two methods of this class that you can use for this purpose:


* **[check](http://ariatemplates.com/api/##aria.core.JsonValidator:check:method)**: checks that the provided json object complies with a certain bean definition.
* **[normalize](http://ariatemplates.com/api/##aria.core.JsonValidator:normalize:method)**: checks that the provided json object complies with a certain bean definition and adds default values. If you look at the method signature, you will notice that it accepts a second parameter which tells whether to throw errors or not.

For performance reasons, in both cases **the check is performed only when you are working in [debug mode](troubleshooting)**. Otherwise, the `check` method always returns `true` and the `normalize` method only applies default values when specified in the bean definition.


<span style="color: red;">Warning:</span> At the moment Aria Templates does not support validation for schemas that inherit from `aria.core.JsonTypes.MultiTypes` because normalization can be ambiguous in some cases. Hence normalization for those types of data will be automatically skipped. This feature might be added in the future.

In order to provide an example that interacts with the previously defined schemas, a class that performs some data normalization is reported here.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/%VERSION%/snippets/core/beans/GroupManager.js?lang=javascript&outdent=true' defer></script>

You can see that:

* the package `ariadoc.snippets.core.beans.ContactBeans` containing useful bean definitions is included in the dependencies of the class. This allows to load and preprocess the bean definitions, so that they are available to the `JsonValidator` class.
* the `normalize` method is surrounded by a try...catch statement. It is a good practice to do so when the second parameter passed to the method is true.

## Beans for documentation purposes

As you can see in the previous code snippet, bean definitions allow you to associate a more adequate type to methods parameters or class properties.

## Bean definitions inside classes

It is also possible to specify class-specific bean definitions inside the `$beans` key of the [classDefintion configuration Json object](http://ariatemplates.com/api/##aria.core.CfgBeans:ClassDefinitionCfg). However, the schemas thus defined cannot be used in any way at the moment.