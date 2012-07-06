Title: Validators


This article provides information on how to use validators. 

## Main Principle

Aria Templates is based on a pattern that clearly separates the model and the view, and as such, guaranteeing the validity and completeness of something that the user has entered is done at model level directly, not at view level.

In Aria Templates, this means that the module controller (in charge of the model) has this responsibility.

## Data Model Validators

### Validator Classes

The framework provides the following set of validator helper classes that can be "attached" to your data model in order to validate it:
{|
! Classpath
! Type to validate
! Usage
|----
| aria.utils.validators.Alpha
| `String`
| Validates that the value is a string composed only of letters
|-
| aria.utils.validators.AlphaInternational
| `String`
| Validates that the value is a string composed only of letters or accentuated letters
|-
| aria.utils.validators.AlphaNum
| `String`
| Validates that the value is a string composed only of letters and numbers
|-
| aria.utils.validators.Email
| `String`
| Validates that the value is a string matching an email pattern
|-
| aria.utils.validators.Mandatory
| `Any`
| Validates that the value is not null, not false, not an empty string
|-
| aria.utils.validators.MinMaxLength
| `String`
| Validates that the value is a string and that its size is between the min and max size given.
|-
| aria.utils.validators.Number
| `String`
| Validates that the value is a string matching a number pattern
|-
| aria.utils.validators.Object
| `Object`
| Validates that the object is a valid object type
|-
| aria.utils.validators.Phone
| `String`
| Validates that the value is a string matching a phone pattern
|-
| aria.utils.validators.RegExp
| `String`
| Validates that the value is a string and match given regular expression.
|-
| aria.utils.validators.String
| `String`
| Validates that the value is a string without special characters
|}

These validators should be loaded as dependencies into your module controller class:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>
 
These classes implement the interface `aria.utils.validators.IValidator` that defines one `validate` method only. This means that any number of extra validator classes can be created if needed.

The validate function returns a specific object, depending on the success or not of the validation. `_validationFailed` and `_validationSucceeded` from `aria.utils.validators.Validator` base class.

#### MultipleValidator

The MultipleValidator is a special validator that allows you to queue several validators on the same piece of datamodel. By default, it will execute all validators added to it, but have two special behaviours :

* If `breakOnMessage` property is set to true, it will stop on the first message raised by a contained validator.
* If the validator is created with a custom message OR `groupMessages` is set to true, messages from contained validators will be added as sub messages.

### Data Model Validation Utility

On top of these validators, the aria-templates data utility `aria.utils.Data` can be used to manage the association of validators to the data model, here are the methods available for this:  
 
<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

### Module Controller Code Example

Here is a module controller example using validators 

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/utils/validators/basic/' />

First, let's assume that the constructor of the module controller prepares some data (in most modules, this will probably be done by sending a request to the server):

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

Then, the `init` method sets the required validators within the data model using the data model utility:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script> 

Finally, let's assume one of the templates associated to this module controller calls its `submit` method when a button is clicked. The `submit` method will validate the model and then make a request to process the messages:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

### Validators and Events

As previously mentioned, Validators are set on the data model and are executed when the validateModel/validateValue method is called.  It is also possible to configure when a validator can be executed by declaring it in the validators `eventToValidate` property.  By default the value of the property is set to "onsubmit" and the property is only currently supported for "onsubmit" and "onblur".

#### Using Single Validators

In the module controller a validators eventToValidate property can be set using the setValidator method: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

In the example groups are undefined, in fact it doesn't matter if you grouped the validators or not, as groupings are not applied for onblur validation.

For more details on validator groupings click [validators#validators-and-groupings-here](validators#validators-and-groupings-here).

#### Using Multiple Validators

When using multiple validators without passing an event parameter then the original syntax will suffice: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

When passing an event parameter the following new API is used:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

Both techniques can be mixed:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

#### Example of Validators and Events

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/utils/validators/event/' />

### Validators and Groups

As well as configuring validators to be executed on an event it is also possible to group validators within the data model.  Each validator that extends the super class Validator will have a native property called validationGroups.  This array is used to store the groups that a validator is a member of.  A validator can be a member of multiple groups irrespective of the values containing the validators that are being validated.

#### Using Single Validators

To set a validator as a member of a group a new groups parameter needs to be passed to the utility method setValidator within the Data utility:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

The new groups parameters for setting a validators groups and for validating a value or the entire model are optional.  Here is an example of validating a value which has validators that are a part of the "mandatory" group:

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

#### Using Multiple Validators

It is possible to set groups on multiple validators using the two following approaches: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

or

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

when using the add method the original syntax is still supported: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

now groups are supported through the following API: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

both techniques can be mixed: 

<script src='http://snippets.ariatemplates.com/snippets/%VERSION%/utils/validators/Snippet.tpl' defer></script>

#### Example of Validators and Groups

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/%VERSION%/utils/validators/group/' />