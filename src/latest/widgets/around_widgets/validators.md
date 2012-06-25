Title: Validators


This article provides information on how to use validators. 

# Main Principle

Aria Templates is based on a pattern that clearly separates the model and the view, and as such, guaranteeing the validity and completeness of something that the user has entered is done at model level directly, not at view level.

In Aria Templates, this means that the module controller (in charge of the model) has this responsibility.

# Data Model Validators

## Validator Classes

The framework provides the following set of validator helper classes that can be "attached" to your data model in order to validate it:
{|
! Classpath
! Type to validate
! Usage
|----
| aria.utils.validators.Alpha
| <code>String</code>
| Validates that the value is a string composed only of letters
|-
| aria.utils.validators.AlphaInternational
| <code>String</code>
| Validates that the value is a string composed only of letters or accentuated letters
|-
| aria.utils.validators.AlphaNum
| <code>String</code>
| Validates that the value is a string composed only of letters and numbers
|-
| aria.utils.validators.Email
| <code>String</code>
| Validates that the value is a string matching an email pattern
|-
| aria.utils.validators.Mandatory
| <code>Any</code>
| Validates that the value is not null, not false, not an empty string
|-
| aria.utils.validators.MinMaxLength
| <code>String</code>
| Validates that the value is a string and that its size is between the min and max size given.
|-
| aria.utils.validators.Number
| <code>String</code>
| Validates that the value is a string matching a number pattern
|-
| aria.utils.validators.Object
| <code>Object</code>
| Validates that the object is a valid object type
|-
| aria.utils.validators.Phone
| <code>String</code>
| Validates that the value is a string matching a phone pattern
|-
| aria.utils.validators.RegExp
| <code>String</code>
| Validates that the value is a string and match given regular expression.
|-
| aria.utils.validators.String
| <code>String</code>
| Validates that the value is a string without special characters
|}

These validators should be loaded as dependencies into your module controller class:

<srcinclude tag="dependencies" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>
 
These classes implement the interface <code>aria.utils.validators.IValidator</code> that defines one <code>validate</code> method only. This means that any number of extra validator classes can be created if needed.

The validate function returns a specific object, depending on the success or not of the validation. <code>_validationFailed</code> and <code>_validationSucceeded</code> from <code>aria.utils.validators.Validator</code> base class.

### MultipleValidator

The MultipleValidator is a special validator that allows you to queue several validators on the same piece of datamodel. By default, it will execute all validators added to it, but have two special behaviours :

* If <code>breakOnMessage</code> property is set to true, it will stop on the first message raised by a contained validator.
* If the validator is created with a custom message OR <code>groupMessages</code> is set to true, messages from contained validators will be added as sub messages.

## Data Model Validation Utility

On top of these validators, the aria-templates data utility <code>aria.utils.Data</code> can be used to manage the association of validators to the data model, here are the methods available for this:  
 
<srcinclude tag="getvalidator" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="setvalidator" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="validatevalue" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="validatemodel" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="processmessages" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="createmessage" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="addmessage" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="getframeworkmessage" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="unsetvalidator" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

<srcinclude tag="checkgroup" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

## Module Controller Code Example

Here is a module controller example using validators 

<sample sample="utils/validators/basic" />

First, let's assume that the constructor of the module controller prepares some data (in most modules, this will probably be done by sending a request to the server):

<srcinclude tag="constructor" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

Then, the <code>init</code> method sets the required validators within the data model using the data model utility:

<srcinclude tag="init" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude> 

Finally, let's assume one of the templates associated to this module controller calls its <code>submit</code> method when a button is clicked. The <code>submit</code> method will validate the model and then make a request to process the messages:

<srcinclude tag="submit" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

## Validators and Events

As previously mentioned, Validators are set on the data model and are executed when the validateModel/validateValue method is called.  It is also possible to configure when a validator can be executed by declaring it in the validators <code>eventToValidate</code> property.  By default the value of the property is set to "onsubmit" and the property is only currently supported for "onsubmit" and "onblur".

### Using Single Validators

In the module controller a validators eventToValidate property can be set using the setValidator method: 

<srcinclude tag="eventsSingle" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

In the example groups are undefined, in fact it doesn't matter if you grouped the validators or not, as groupings are not applied for onblur validation.

For more details on validator groupings click [ValidatorsValidators_and_groupings here](Validators#Validators_and_groupings_here).

### Using Multiple Validators

When using multiple validators without passing an event parameter then the original syntax will suffice: 

<srcinclude tag="eventsMultiple1" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

When passing an event parameter the following new API is used:

<srcinclude tag="eventsMultiple2" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

Both techniques can be mixed:

<srcinclude tag="eventsMultiple3" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

### Example of Validators and Events

<sample sample="utils/validators/event" />

## Validators and Groups

As well as configuring validators to be executed on an event it is also possible to group validators within the data model.  Each validator that extends the super class Validator will have a native property called validationGroups.  This array is used to store the groups that a validator is a member of.  A validator can be a member of multiple groups irrespective of the values containing the validators that are being validated.

### Using Single Validators

To set a validator as a member of a group a new groups parameter needs to be passed to the utility method setValidator within the Data utility:

<srcinclude tag="groupsSingle1" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

The new groups parameters for setting a validators groups and for validating a value or the entire model are optional.  Here is an example of validating a value which has validators that are a part of the "mandatory" group:

<srcinclude tag="groupsSingle2" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

### Using Multiple Validators

It is possible to set groups on multiple validators using the two following approaches: 

<srcinclude tag="groupsMultiple1" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

or

<srcinclude tag="groupsMultiple2" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

when using the add method the original syntax is still supported: 

<srcinclude tag="groupsMultiple3" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

now groups are supported through the following API: 

<srcinclude tag="groupsMultiple4" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

both techniques can be mixed: 

<srcinclude tag="groupsMultiple5" lang="AT" outdent="true">utils/validators/Snippet.tpl</srcinclude>

### Example of Validators and Groups

<sample sample="utils/validators/group" />