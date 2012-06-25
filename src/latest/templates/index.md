Title: Templating_Layer _A_Template_Engine

As you've seen in the first part of this documentation, the Aria Templates Core layer is a powerful library that provides comprehensive tools to help design complex Javascript applications very efficiently.

Now, when creating web applications, developers must not only deal with pure Javascript and need to consider the UI aspect of the code.  For a long time this has been the server's responsibility: creating and delivering the proper markup to the browser was a job done using JSP, ASP, PHP or any other server-side templating technology.

Aria Templates moves this logic to the client-side: templates are simply delivered by the server as static resources that are processed on the browser by the templating engine.  This offers several advantages over server-side processing: 
* bandwidth efficiency: static resources benefit from caching and, since markup is managed on the browser, only data (JSON) needs to be exchanged with the server.
* clear separation between data, logic and representation thanks to AT's MVC approach.  This is a must as far as readability and maintenance are concerned.
* performance: templates are compiled by the framework into optimized Javascript files.  Also, complex processing may not scale very well server-side while browsers engines become more and more efficient over the years.

This section explains what templates are in details and help you learn how to write and use them.