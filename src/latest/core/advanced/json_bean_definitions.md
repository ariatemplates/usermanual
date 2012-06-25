Title: JSON_Bean_Definitions


When developing your application, you might want to describe the structure of the data model you are using. This can be very important for two reasons:
* *data validation:* in some cases it is useful to perform a client side validation of data coming from the user or from the server.
* *Data normalization:* adding default values automatically can spare you a lot of effort for checking whether some data portions have been defined or not.
* *Documentation:* your code could be more readable if you were able to define properly the type of data that you expect in the signature of a method.

Aria Templates allows you to define your own JSON Schemas by means of *Bean definitions*. The framework uses these schemas extensively: just to mention a couple of examples, widget configurations and AJAX request parameters are normalized against bean definitions.

*Remark:* In this article the words _bean definition_, _schema_ and _data type_ are used as sinonyms.

# Bean definitions

A bean definition is a Json object that contains all the information on the data type that you want to define.

Bean definitions are grouped into packages. In order to define a package you have to use the [Aria.beanDefinitions](http://ariatemplates.com/aria/guide/apps/apidocs/##Aria:beanDefinitions:method) method of the [Aria singleton object](The_Aria_Singleton#beanDefinitions). Let us introduce an example of usage that will allow to explain in more detail how to specify bean definitions.

<srcinclude lang="javascript" outdent="true">core\beans\SimpleBean.js</srcinclude> 

This method allows to define the package *<code>ariadoc.snippets.core.beans.SimpleBean</code>* which contains the two bean definitions *<code>Name</code>* and *<code>Age</code>*.

Each bean definition contains the mandatory *<code>$type</code>* property. It represents the parent type of the data type that you want to define. The parent type is described by means of a string like 'namespace:value', where the namespace refers to the package in which the corresponding parent bean definition is set, and the value refers to the bean definition itself. It is advisable to define the namespaces corresponding to the packages that you will be using in the *<code>$namespaces</code>* property of the bean definition.

In the above example, the parent type of the schema *<code>Name</code>* is the type *<code>String</code>* whose schema is defined in the package *<code>aria.core.JsonTypes</code>*. On top of that, the bean definition <code>Name</code> has its own properties <code>$description</code>, <code>$sample</code> and <code>$mandatory</code>. This means that <code>Name</code> *inherits* all the properties of its parent bean <code>aria.core.JsonTypes.String</code> and adds or *overrides* the parent <code>$description</code>, <code>$sample</code> and <code>$mandatory</code> properties.

This *bean inheritance* mechanism is the very core of beans definitions in Aria Templates. Every data type that you define (through a bean definition) will have to inherit from another data type (specified in another bean definition).

# Built-in data types

Aria Templates provides a set of built-in data types whose bean definitions are available in the package [aria.core.JsonTypes](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.JsonTypes). Every other schema is a descendant of one of these schemas. Technically, these types are characterized by the fact that they inherit from themselves.

There are two categories of built-in types (click on the links to learn more about them):
* *simple types*: [String](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:String), [Boolean](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Boolean), [Integer](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Integer), [Float](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Float), [Date](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Date), [RegExp](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:RegExp), [ObjectRef](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:ObjectRef), [FunctionRef](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:FunctionRef), [JsonProperty](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:JsonProperty), [Enum](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Enum)
	*complex types*: [Object](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Object), [Array](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Array), [Map](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:Map), [MultiTypes](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonTypes:MultiTypes)


When creating your bean definition, you can always include the following properties (an explanation is also available [here](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.BaseTypes:Element)):
	*<code>$type</code>:* the mandatory parent type
	*<code>$description</code>:* a short literal description of your data type. It is mandatory when inheriting directly from a built-in data type. When inheriting from a user-defined schema, it is not necessarily required.
	*<code>$sample</code>:* an example
	*<code>$mandatory</code>:* a boolean telling whether the element has to be provided for the Json object containing it to be valid. More detail on validation will be provided [later](#Validation).
	*<code>$default</code>:* the default value. If the data is mandatory, it obviously does not make sense to provide a default value.


Furthermore, depending on the built-in type that you want your schema to inherit from, some additional properties can be specified (and others are automatically added by the framework). Most of them are useful for validation purposes.
For example, when using the Integer type, you might want to specify the allowed range (minimum and maximum value), or when using a String type as parent you might want to specify a regular expression that it has to match in order to be valid. The basic example introduced earlier can be enhanced a little by adding extra properties to the bean definitions:

<srcinclude tag="example" lang="javascript" outdent="true">core\beans\AnotherSimpleBean.js</srcinclude>

The list of extra properties that can be added to the schema according to the ancestor built-in type can be found [here](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.BaseTypes)

# Examples

In this section we will introduce more complex examples involving complex built-in data types like Arrays, Objects and MultiTypes, as well as the inheritance from a user-defined schema. Consider the following example:

<srcinclude lang="javascript" outdent="true">core\beans\BaseContactBeans.js</srcinclude>

The following explanatory remarks might be useful:
* when using type <code>"json:Object"</code>, the *<code>$properties</code>* property is a Json object whose values are themselves bean definitions to describe the type of expected data. Thus, another bean definition is automatically available at, for example, *<code>Address.$properties.city</code>*.
* When using type <code>"json:Array"</code> (see <code>BaseContact.$properties.address</code>), a *<code>$contentType</code>* can be specified as a schema (available at <code>BaseContact.$properties.address.$contentType</code>).
* <code>BaseContact.$properties.address.$contentType</code> is a bean definition that inherits from the user-defined bean definition <code>Address</code>. In particular, it overrides only its <code>$description</code>.


Consider the following example:

<srcinclude lang="javascript" outdent="true">core\beans\ContactBeans.js</srcinclude>

Remarks:
* the package <code>ariadoc.snippets.core.beans.BaseContactBeans</code> is included in the *<code>$namespaces</code>* property of the bean definition. This allows to use schemas defined in that package.
* The <code>Person</code> and <code>Animal</code> schemas inherit from the type <code>BaseContact</code> defined in the <code>ariadoc.snippets.core.beans.BaseContactBeans</code> package. They add a property to the <code>$properties</code> of their parent type.
* Bean <code>Group</code> inherits from the built-in complex type *<code>"json:Map"</code>*. The difference between a Map and an Object is that in a Map there is no constraint to the keys that can be used. The <code>Group.$contentType</code> schema describes the type of the valid values.
* Bean <code>Group.$contentType</code> inherits from the built-in complex type *<code>"json:MultiTypes"</code>*. This special type allows to specify alternative types for a data. In this case the allowed types inherit from <code>Person</code> or <code>Animal</code>.

This special type allows you to specify the different alternative types that are allowed.

# Validation

The main purpose of defining schemas is to check the validity of data. Aria Templates allows you to perform data model validation by means of the class [aria.core.JsonValidator](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.JsonValidator). There are two methods of this class that you can use for this purpose:

* *[check](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonValidator:check:method)*: checks that the provided json object complies with a certain bean definition.
* *[normalize](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.JsonValidator:normalize:method)*: checks that the provided json object complies with a certain bean definition and adds default values. If you look at the method signature, you will notice that it accepts a second parameter which tells whether to throw errors or not.

For performance reasons, in both cases *the check is performed only when you are working in [debug mode](Troubleshooting)*. Otherwise, the <code>check</code> method always returns <code>true</code> and the <code>normalize</code> method only applies default values when specified in the bean definition.


<span style="color: red;">Warning:</span> At the moment Aria Templates does not support validation for schemas that inherit from <code>aria.core.JsonTypes.MultiTypes</code> because normalization can be ambiguous in some cases. Hence normalization for those types of data will be automatically skipped. This feature might be added in the future.

In order to provide an example that interacts with the previously defined schemas, a class that performs some data normalization is reported here.

<srcinclude lang="javascript" outdent="true">core\beans\GroupManager.js</srcinclude>

You can see that:
* the package <code>ariadoc.snippets.core.beans.ContactBeans</code> containing useful bean definitions is included in the dependencies of the class. This allows to load and preprocess the bean definitions, so that they are available to the <code>JsonValidator</code> class.
* the <code>normalize</code> method is surrounded by a try...catch statement. It is a good practice to do so when the second parameter passed to the method is true.

# Beans for documentation purposes

As you can see in the previous code snippet, bean definitions allow you to associate a more adequate type to methods parameters or class properties.

# Bean definitions inside classes

It is also possible to specify class-specific bean definitions inside the <code>$beans</code> key of the [classDefintion configuration Json object](http://ariatemplates.com/aria/guide/apps/apidocs/##aria.core.CfgBeans:ClassDefinitionCfg). However, the schemas thus defined cannot be used in any way at the moment.