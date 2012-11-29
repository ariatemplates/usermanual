Title: Atgen


Atgen is a command line indipendent tool that is able to speed up the creation process of an aria templates project and to speed up the creation of new files for an existing aria templates project.

It allows you to create a project from scratch with the skeleton files of templates, template scripts, bootstraps, interfaces, etc. so with atgen you will never do again copy/paste from an old template to create a new one, you will just type a single command.

#### **What atgen is**
atgen is a tool:

* **easy to use**, with long and short commands; 
* **documented**, with an help command; 
* **cross platform**, works properly  on Windows and Unix systems;
* with a **special wizard**, in order to create a project (or to add files to an existing one) in interactive mode; 
* doesn't **need to install other software** to work;

#### **What atgen needs**
To generate the files, atgen needs the project classpath and the name of the files.

So atgen asks:

* **the module name**, that is actually the project classpath, in order to create into the classpath the folders that the project will have. The _module name_ is a mandatory parameter;
* **the template name**, (if required) to be able to automatically generate the template skeleton file and the relative template script skeleton file (if required) into the view folder;
* **the controller name**, (if required) to be able to automatically generate the module controller skeleton into the module root folder and to suggest a name for the corresponding interface;
* **the macro lib name**, (if required) to be able to automatically generate the macro library skeleton into the lib folder;
* **the css template name**, (if required) to be able to automatically generate the css template skeleton into the style folder and if a template is provided the css template will be related to the template;
* **the bootstrap**, (if required) to be able to automatically generate the html skeleton into the module root folder;


### How atgen works

At the first run the tool will configure the aria templates framework path, using a config.json, after that it will be run in different modes:


* **Interactive Mode**: 
<div data-sample="hardcoded"><code><pre>
$atgen
</code></pre></div>

In this modality the tool will help you to create a project from scratch or to add some files to an existing project creating files' skeletons and folders' structure, adding a readme text file (_README-AT.txt_) that explains what has been created by the tool and what standard folders should contain;


This is how your project will look like:


[file:folders.png](file:folders.png)

If the AT project already has a folders' structure, the tool will create only the folders that are missing and that the user wants to create.


* **Command line Mode**: that will help you to create the files you need using only one command;
<div data-sample="hardcoded"><code><pre>
$atgen myapp.mymodule -t MyTemplate -s -c MyController -i IMyController -x MyTemplateStyle -m MyMacroLib -b
</code></pre></div>

In this modality atgen will create only the files defined with the command line arguments, without creates any additional files or folders.


* **Configuration Mode**: atgen will run the procedure to modify the aria templates framework version/path;
<div data-sample="hardcoded"><code><pre>
$atgen --config
</code></pre></div>


### How atgen looks like

Here you can see some screenshot of the atgen running in different modes.

[file:atgen_screenshot.png](file:atgen_screenshot.png)
### How to install atgen

atgen is developed in nodejs, so you need to have it installed on your machine (v0.6.x or higher). If you don't have it, please [download](http://nodejs.org) it and choose the version which will install npm too.

If you already have node and npm you just need to type from command line:


<div data-sample="hardcoded"><code><pre>npm install -g atgen</code></pre></div>

and that's it!


### The atgen help

For any problem you can use the command line help typing:


<div data-sample="hardcoded"><code><pre>
$atgen -h

Usage: atgen [options]

Options:

  -t, --template      Create an html template skeleton file                                           [string]
  -s, --script        Add a template script skeleton file related to the html template                [boolean]
  -w, --wizard        Run the tool in interactive mode (wizard) with initial params                   [boolean]
  -c, --controller    Create a controller skeleton file                                               [string]
  -i, --interface     Create an interface skeleton file for the controller created                    [string]
  -m, --macro         Create a macro library skeleton file                                            [string]
  -x, --css           Create a css template skeleton file                                             [string]
  -b, --hasBootstrap  Create the bootstrap skeleton file (index.html)                                 [boolean]
  -h, --help          Show the help guide                                                             [boolean]
  -v, --version       Show the version of the tool and the version of the framework in use            [boolean]
  -g, --config        Run the tool in configuration mode to modify the aria templates framework path  [boolean]
</code></pre></div>


### How to remove atgen

As you saw atgen is very easy to install and it is a very light tool, so basically you will never want to remove it, but in the sad case you decide that you don't need it anymore you can remove it typing:


<div data-sample="hardcoded"><code><pre>
$npm rm -g atgen
</code></pre></div>

and that's it!


### Future Work

atgen is alive and under development and with the future releases we will provide:

* the possibility to accept **more than one parameter** in order to create more than one file with a single command:


<div data-sample="hardcoded"><code><pre>
$atgen myapp.mymodule -t MyFirstTemplate MySecondTemplate MyThirdTemplate
</code></pre></div>

* the possibility to define **the data model**;

* the possibility to run the tool in **wizard mode with initial params**;

* addition of **unit tests**;

* the possibility **to search the aria templates framework path**, guessing and searching inside the "usual folders" where normally the aria templates framework is stored;

* the possibility **to redefine the index.html**;

* **to make the bootstrap more clear**, in order to display something to the user;

* **to improve the configuration mode**;


### Contribute

If you have any idea and you want to contribute to the development of atgen please take a look to the atgen github repository and send us your ideas.

[Yes I have an idea](http://www.ariatemplates.com/about/contact)

[Let me take a look to the source code](http://github.com)