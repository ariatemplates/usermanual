Title: Validators


This article provides information on how to use validators.

## Main Principle

Aria Templates is based on a pattern that clearly separates the model and the view, and as such, guaranteeing the validity and completeness of something that the user has entered is done at model level directly, not at view level.

In Aria Templates, this means that the module controller (in charge of the model) has this responsibility.

## Data Model Validators

### Validator Classes

The framework provides the following set of validator helper classes that can be _attached_ to your data model in order to validate it (by classpath):

* **aria.utils.validators.Alpha**
  `String`

  Validates that the value is a string composed only of letters.

* **aria.utils.validators.AlphaInternational  **
  `String`

  Validates that the value is a string composed only of letters or accentuated letters.

* **aria.utils.validators.AlphaNum**
  `String`

  Validates that the value is a string composed only of letters and numbers.

* **aria.utils.validators.Email **
  `String`

  Validates that the value is a string matching an email pattern.

* **aria.utils.validators.Mandatory**
  `Any`

  Validates that the value is not null, not false, not an empty string.

* **aria.utils.validators.MinMaxLength **
  `String`

  Validates that the value is a string and that its size is between the min and max size given.

* **aria.utils.validators.Number**
  `String`

  Validates that the value is a string matching a number pattern.

* **aria.utils.validators.Object **
  `Object`

  Validates that the object is a valid object type.

* **aria.utils.validators.Phone**
  `String`

  Validates that the value is a string matching a phone pattern.

* **aria.utils.validators.RegExp**
  `String`

  Validates that the value is a string and match given regular expression.

* **aria.utils.validators.String **
  `String`

  Validates that the value is a string without special characters.

These validators should be loaded as dependencies into your module controller class:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=dependencies&lang=at&outdent=true'></script>

These classes implement the interface `aria.utils.validators.IValidator` that defines one `validate` method only. This means that any number of extra validator classes can be created if needed.

The validate function returns a specific object, depending on the success or not of the validation. `_validationFailed` and `_validationSucceeded` from `aria.utils.validators.Validator` base class.

When instantiating a validator, it is possible to provide a string that will be used as error message:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=instantiate&lang=at&outdent=true'></script>

In this way, at validation time, the validator will use this error message that has priority on globally set messages;
if no message is set, neither locally (on validator instance), nor globally (on app environment, configured as follows), the hardcoded fallback message will be chosen.

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=setEnvironment&lang=at&outdent=true'></script>

As you can see, it is possible to easily configure a message for each validator that Aria Templates provides, by binding the desired strings to their class names.

#### MultipleValidator

The MultipleValidator is a special validator that allows you to queue several validators on the same piece of datamodel. By default, it will execute all validators added to it, but have two special behaviours :

* If `breakOnMessage` property is set to true, it will stop on the first message raised by a contained validator.
* If the validator is created with a custom message OR `groupMessages` is set to true, messages from contained validators will be added as sub messages.

#### Data Model Validation Utility

On top of these validators, the Aria Templates `aria.utils.Data` singleton can be used to manage the association of validators to the data model.  These methods are described [here](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.utils.Data).

### Module Controller Code Example

Here is a module controller example using validators

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/validators/basic/' ></iframe>

If we were to use a data model such as the following:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=datamodel&lang=at&outdent=true'></script>

In the module controller, we could set the appropriate validators like this:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=setvalidators&lang=at&outdent=true'></script>

Now, let's assume one of the templates associated to this module controller calls its `submit` method when a button is clicked. The `submit` method will validate the model and then make a request to process the messages:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=submit&lang=at&outdent=true'></script>

### Validators and Events

As previously mentioned, Validators are set on the data model and are executed when the validateModel/validateValue method is called.  It is also possible to configure when a validator can be executed by declaring it in the validators `eventToValidate` property.  By default the value of the property is set to "onsubmit" and the property is only currently supported for "onsubmit" and "onblur".

#### Using Single Validators

In the module controller a validators eventToValidate property can be set using the setValidator method:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=eventsSingle&lang=at&outdent=true'></script>

In this example we don't pass groups, in fact it doesn't matter if you grouped the validators or not, as groupings are not applied for onblur validation.

For more details on validator groupings see below.


#### Using Multiple Validators

When using multiple validators without passing an event parameter then the original syntax will suffice:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=eventsMultiple1&lang=at&outdent=true'></script>

When passing an event parameter the following new API is used:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=eventsMultiple2&lang=at&outdent=true'></script>

Both techniques can be mixed:


<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=eventsMultiple3&lang=at&outdent=true'></script>

#### Example of Validators and Events

<iframe class='samples' style="height:450px" src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/validators/event/' ></iframe>

### Validators and Groups

As well as configuring validators to be executed on an event it is also possible to group validators within the data model.
Each validator that extends the super class Validator will have a native property called validationGroups.
This array is used to store the groups that a validator is a member of.
A validator can be a member of multiple groups irrespective of the values containing the validators that are being validated.

#### Using Single Validators

To set a validator as a member of a group a new groups parameter needs to be passed to the utility method setValidator within the Data utility:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsSingle1&lang=at&outdent=true'></script>

The new groups parameters for setting a validators groups and for validating a value or the entire model are optional.
Here is an example of validating a value which has validators that are a part of the "mandatory" group:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsSingle2&lang=at&outdent=true'></script>


#### Using Multiple Validators

It is possible to set groups on multiple validators using the two following approaches:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsMultiple1&lang=at&outdent=true'></script>

or

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsMultiple2&lang=at&outdent=true'></script>

when using the add method the original syntax is still supported:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsMultiple3&lang=at&outdent=true'></script>

now groups are supported through the following API:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsMultiple4&lang=at&outdent=true'></script>

both techniques can be mixed:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/validators/Validators.js?tag=groupsMultiple5&lang=at&outdent=true'></script>

#### Example of Validators and Groups

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/validators/group/' ></iframe>