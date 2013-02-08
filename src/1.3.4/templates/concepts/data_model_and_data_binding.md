Title: Data Model and Data Binding


## The Data Model in AT

In AT's MVC model, templates are used to build the View, a graphical interface to display data and interact with the user.  The data itself, the Model, is handled by a specific framework Javascript object accessible from your template using the `data` or `this.data` local reference.

This data model may contain all kinds of different information: UI content, business data, flow states, etc.  You are free to organize it as you wish, keeping in mind that it is an abstraction of your application and as such should not be linked to its representation, so don't structure it according to the display.
E.g. use `data.shoppingBasket.items[0].price` instead of `data.rightPanel.divs[0].content`.

You can read or write data model information from anywhere in your application, which ultimately means you can also create new entries in it at any point in your code.  It is recommended to avoid doing this and instead document the structure of your data model using [beans](json_bean_definitions).

There are different ways to initialize the data model.  An empty one can be created with default values using a bean definition but in most cases content will be retrieved from the server (this is covered in the [controllers](controllers) article.)  You may also provide initial values when the template is loaded as illustrated in the next paragraph.

#### Metadata

Metadata have to be used when storing template-related variables in the data model. In fact, most of the times the information that you need to store is not strictly related to the data of your application, but to some view options that you need to keep through template refreshes. Metadata have to be used in order to distinguish view-related data from application data.

It is also important to understand that several pieces of code may store metadata in the same data-model (for instance, there might be several templates attached to the same data-model, but also the Aria Templates framework itself may store metadata).
This is why Aria Templates uses a naming convention similar to XML namespaces - i.e. meta data have to start with a 'namespace prefix' followed by a colon and by a property name.
For instance `"foo:bar"` would correspond to the property "bar" of the prefix "foo".

The convention is to use the following prefixes:


* **`aria:`** for framework-specific meta-data, you should not use this prefix.
* **`view`**: for template-specific meta-data.
* **`xxx`**: where xxx is a customizer unique-id used to reference customization meta-data.

When several templates have access to the same data model, it is preferable to use template-specific prefixes to avoid meta-data collisions. It might also happen that different instances of the same template have access to the same data model.

## Binding Principles

TBD