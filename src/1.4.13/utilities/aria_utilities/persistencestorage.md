Title: Persistence Storage

This utility allows to store data in localStorage using Aria Templates storage API. Being stored in localStorage, the data persists even after closing the browser. Users can use localStorage by creating an instance of aria.storage.LocalStorage(), data can be saved by setItem(nameOfItem, dataToStore), data can be retreived by getItem(nameOfItem) and data can be cleared from localStorage by using clear() method.


The simple way to use Local Storage  is as follows
<script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/utils/storage/PersistScript.js?tag=utlStorage&lang=at&outdent=true' defer></script>

Please refer the API documentation on methods/properties defined on [Storage](http://ariatemplates.com/api/#aria.storage.AbstractStorage).

<iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/utils/storage/' ></iframe>

