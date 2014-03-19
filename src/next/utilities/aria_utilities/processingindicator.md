Title: Processing Indicator


This utility allows to display a processing indicator on a DOM element or on a Section or on a whole page. Users can either use setProcessingIndicator(true, "text on overlay") on a DOM element or aria.utils.DomOverlay.create(DOMElement, "Text on the overlay") to set the processing indicator. To hide a processing indicator users can use  setProcessingIndicator(false) or aria.utils.DomOverlay.detachFrom(DOMElement). If a section is bound to a datamodel then processing indicator gets hidden whenever the datamodel changes. The processing indicator can be customized through the skinning and customizable properties are loading indicator image, opacity and background color.

The simple way to show processing indicator is as follows
<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/loadingoverlay/LoadingOverlayTemplate.tpl?tag=utlOverlay&lang=at&outdent=true' defer></script>

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/utils/loadingoverlay/LoadingOverlayTemplateScript.js?tag=utlOverlayScript&lang=javascript&outdent=true' defer></script>

Please refer the API documentation on methods/properties defined on [Domoverlay](http://ariatemplates.com/api/#aria.utils.DomOverlay).

<iframe class='samples' src='%SNIPPETS_SERVER_URL%/samples/github.com/ariatemplates/documentation-code/samples/utils/loadingoverlay/' ></iframe>
