Title: Form Submissions


## Pseudo Asynchronous Form Submissions
For the purposes of form submission, for instance when needing to upload files, there is a new transport in the framework that handles this in a pseudo asynchronous manner.  The transport creates an IFrame to handle the submission and response of the request, then a callback is used to pass the response back to the application.

### IFrame Technique

The IFrame technique is based on using the `target` attribute of a `form` HTML element in order to submit it into a hidden IFrame and therefore avoid the reload of the main page. The system can then simply check the `onreadystatechange` of the IFrame to know when the reply has been received and can optionally access the content of the IFrame (if on the same domain only).


* Create an IFrame and insert into the page (shrink the IFrame to make it invisible to the user):''

* Update the target attribute of the form to contain a reference to the IFrame:''

* Submit the form to the IFrame via the target attribute:''

* IFrame will contain the response of the file upload:''

* Copy response content from the hidden IFrame to process the result:''

* Remove the IFrame, and reset the target attribute of the form:''

### API
A method is available to use the new IFrame transport, <code>[aria.core.IO.asyncFormSubmit](http://ariatemplates.com/aria/guide/apps/apidocs/#aria.core.IO:asyncFormSubmit:method)</code>.

The user will need to use these parameters:

* Either a `formId`, id of the HTML form, or `form`, the HTML form object containing the inputs to be used in the form submission.
* `url`: the URL to post the form to.  This parameter is optional and can be specified in the action attribute of the form.  However, if this parameter is used, it will then override any action attribute defined within the form.
* `method`: the method to use for the request.  This parameter is optional and can be specified in the method attribute of the form.  However, if this parameter is used, it will then override any action attribute defined within the form.
* `callback`: the callback to be used when a response has been returned.

## Submitting a Form

Here's an example of form submission:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/appendices/FormSubmitViewScript.js?tag=submitExample1&lang=javascript&outdent=true'></script>

In this example only the `formId` and the `callback` are needed.  The IFrame transport then extracts the form using the ID and completes the request calling the specific callback after the response has been received:

* `callback.fn` for onSuccess
* `callback.onerror` for onFailure


### Opening a File Upload Dialog From a Link

In this example the file input is invisible to the user, instead there is a link which when clicked will trigger the file input click method to open the system dialog.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/appendices/FormSubmitView.tpl?tag=uploadExample&lang=at&outdent=true'></script>

When the click event is triggered on the link the following handler is called:

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/appendices/FormSubmitViewScript.js?tag=uploadExample1&lang=javascript&outdent=true'></script>

The hidden file input has an ID of "simulateAsyncFileUpload", therefore its click event is triggered which opens the system dialog.


### Catching the Change Event of the File Upload
When a user opens a system dialog from the file input, they can browse directories select a file and click on open.  The system dialog then disappears and the file input contains the path and filename of the file to be uploaded.  To trigger a script when the user selects a file in the system dialog, you need to add a listener to the change event of the file input.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/appendices/FormSubmitViewScript.js?tag=uploadExample2&lang=javascript&outdent=true'></script>

After the user has selected a file and clicked open the `fileChosen` method will be executed.

<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/appendices/FormSubmitViewScript.js?tag=submitExample2&lang=javascript&outdent=true'></script>
