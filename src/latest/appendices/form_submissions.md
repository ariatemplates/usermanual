Title: Form Submissions


## Pseudo Asynchronous Form Submissions
For the purposes of form submission, for instance when needing to upload files, there is a new transport in the framework that handles this in a pseudo asynchronous manner.  The transport creates an IFrame to handle the submission and response of the request, then a callback is used to pass the response back to the application.

### IFrame Technique

The IFrame technique is based on using the <code>target</code> attribute of a <code>form</code> HTML element in order to submit it into a hidden IFrame and therefore avoid the reload of the main page. The system can then simply check the <code>onreadystatechange</code> of the IFrame to know when the reply has been received and can optionally access the content of the IFrame (if on the same domain only).


*Create an IFrame and insert into the page (shrink the IFrame to make it invisible to the user):''

*Update the target attribute of the form to contain a reference to the IFrame:''

*Submit the form to the IFrame via the target attribute:''

*IFrame will contain the response of the file upload:''

*Copy response content from the hidden IFrame to process the result:''

*Remove the IFrame, and reset the target attribute of the form:''

### API
A method is available to use the new IFrame transport, <code>aria.core.IO.asyncFormSubmit</code>.

The user will need to define one or more of the following:
* FormId is the ID used in the HTML form object (if passing a form object then FormId is not necessary).
* HTML form object containing the inputs to be used in the form submission (if passing a formId then no form object is necessary).
* URL to post the form to (optional - can be specified in the action attribute of the form or separately as a URL paramter of the <code>asyncFormSubmit</code> call.  Note if the URL parameter is used then this will override any action attribute defined within the form).
* Method to use for the request (optional - can be specified in the HTML form object but if it is passed in using the method parameter then this value will override the forms method attribute).
* Callback to be used when returning a response for the request.

<syntaxhighlight lang="javascript">
 asyncFormSubmit({     
     "formId" : "myFormId", 
     "form" : myForm, 
     "url" : myURL,
     "method" : "POST",
     "callback" : {
         fn:obj.method,      
         scope:obj,       
         onerror:obj2.method2,  
         onerrorScope:obj2,
         args:{x:123}     
     }
 })
</syntaxhighlight>


## Submitting a Form

The following code is used to submit the form in the sample:
<syntaxhighlight lang="AT">
  aria.core.IO.asyncFormSubmit({
    formId : "simulateAsyncFormSubmit",
    callback : {
      fn : this.onSuccess,
      onerror : this.onError,
      scope : this
    }
  });
</syntaxhighlight>

In this example only the <code>formId</code> and the <code>callback</code> are needed.  The IFrame transport then extracts the form using the ID and completes the request calling the specific callback after the response has been received:
:<code>callback.fn</code> _- for onSuccess_
:<code>callback.onerror</code> _- for onFailure_


### Opening a File Upload Dialog From a Link

In this example the file input is invisible to the user, instead there is a link which when clicked will trigger the file input click method to open the system dialog.

<syntaxhighlight lang="AT">
 {@aria:Link {
     label: "Import from file",
     onclick: {
         fn: "uploadFile"
     }
  }/}
</syntaxhighlight>

When the click event is triggered on the link the following handler is called:
<syntaxhighlight lang="AT">
  uploadFile : function () {
   ...   
    aria.utils.Dom.getElementById("simulateAsyncFileUpload").click();
  }
</syntaxhighlight>

The hidden file input has an ID of "simulateAsyncFileUpload", therefore its click event is triggered which opens the system dialog.


### Catching the Change Event of the File Upload
When a user opens a system dialog from the file input, they can browse directories select a file and click on open.  The system dialog then disappears and the file input contains the path and filename of the file to be uploaded.  To trigger a script when the user selects a file in the system dialog, you need to add a listener to the change event of the file input.


<syntaxhighlight lang="AT">
  uploadFile : function () {  
    ... 
    // add a listener on the change event of the file input.
    aria.utils.Event.addListener("simulateAsyncFileUpload", "change", this.fileChosen, this);
    ...			
  }
</syntaxhighlight>

After the user has selected a file and clicked open the <code>fileChosen</code> method will be executed.

<syntaxhighlight lang="AT">
  fileChosen : function () {
    // simulate async request to submit form
    aria.core.IO.asyncFormSubmit({
      formId : "simulateAsyncFormSubmit",
      callback : {
        fn : this.onSuccess,
        onerror : this.onError,
        scope : this
      }
    });
  }
</syntaxhighlight>