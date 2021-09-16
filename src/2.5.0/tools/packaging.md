Title: Packaging

Once you have developed your Aria Templates application, you certainly need to minify and merge your source files into packages in order to reduce the loading time, optimize bandwith usage, and hence improve the user experience.

This article explains how to
- package your application
- create an ad-hoc packaging for the Aria Templates framework itself.

You can achieve these goals by using [atpackager](http://atpackager.ariatemplates.com/), which is a generic packaging tool that also provides Aria Templates-specific utilities.

Nevertheless, especially when it comes to re-packaging the framework itself, the configuration for atpackager can become very complex.

That's why Aria Templates comes with some [grunt](http://gruntjs.com/) tasks that are based on atpackager and that already set the correct configuration for you, exposing a much simpler set of configuration options that appear more intuitive.

__Remark: these tasks are available from version 1.6.4 of the framework.__

## Create packages

This section explains how to create packages out of the source files of a Aria Templates-based project.
The presentation of the different steps and the available options will be done by means of an example.

Suppose we have a project with the following source folder structure:

<img src="../images/packaging/source-folder.jpg"/>


We want to create two bundles: one containing all files in the `atplugins` folder, and another one with all files in `app` folder.

In order to achieve this goal, let's write
- a `package.json` file to retrieve the `ariatemplates` dependency (at the root of our project):

 <script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/package.json?lang=javascript&outdent=true'></script>

 Alternatively, we can npm-install `ariatemplates` inside our project (you can find more information about npm [here](https://www.npmjs.org/)).

- a `Gruntfile.js` at the root of our project:

 <script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/Gruntfile.js?lang=javascript&tag=easypackage&outdent=true'></script>

After defining the default task for the grunt build execution, we load the grunt tasks provided by the `ariatemplates` npm dependency

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/Gruntfile.js?lang=javascript&tag=loadNpmTasks&outdent=true'></script>

One of these tasks is called __`easypackage`__. It is a [multitask](http://gruntjs.com/creating-tasks#multi-tasks) that can be executed several times with different configurations, defined using arbitrarily named targets. In our example, we set the configuration for target `one`.

The options object provided here contains the simplest possible configuration:
- `sourceDirectories`: a list of paths of folders which contain the files we want to package.
- `packages`: the list of bundles that we want to create. For each of them, we can specify the name of the package and the files it should contain. We don't need to specify the builder: a default one is automatically set. Look at the [atpackager documentation](http://atpackager.ariatemplates.com/configuration.html#packages-definition) for more explanations.

After executing the `grunt` command, we will find the following directory at the root of our project:

<img src="../images/packaging/build-folder.jpg"/>

We can notice that:
- two files have been created, `app-174poy8.js`, and `plugins-zd4too.js`. They are the two bundles that we asked for.
- A file called `map.js` has been created: it contains the code that declares the file mappings to the Aria Templates framework.
- Other resources (an `index.html` file and an `app` folder containing all .png files) that were not included in any bundle have been copied.

Once we load the framework and you include the `map.js` file, our application will correctly run.


### Configuration options

There are more options available. You can find the full list here, along with the default values:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/easypackageOptions.json?lang=javascript&outdent=true'></script>

We have already discussed the meaning of `sourceDirectories` and `packages` above. We will now provide more details on the other properties.

- `sourceFiles`, _Array_: the list of files (within the source directories) that we wish to process
- `outputDirectory`, _String_: the directory we want the output files to be copied to
- `map`, _String_: the name of the file that contains the url map that enables the framework to locate files in bundles
- `minify`, _Boolean_: whether to minify javascript source files
- `hash`, _Boolean_: whether to add a hash to the source files. The hash method is [`murmur3`](http://atpackager.ariatemplates.com/visitors.html#the-hash-methods). The map file is not decorated with a hash
- `compileTemplates`, _Boolean_: whether we want template pre-compilation. If set to true, these files will also be minified if the `minify` parameter is set to true
- `ATAppEnvironment`, _Object_: the Aria Templates application environment that has to be used for template pre-compilation (see [here](http://atpackager.ariatemplates.com/configuration.html#aria-templates-specific) for more details)
- `convertToNoderjs`, _Boolean_ or _Array_: if set to true, all .js files containing Aria Templates code will be migrated to the new syntax introduced by noderJS (available since version 1.6.1). Alternatively, we can also provide an array with the list of files to convert. Learn about [the new syntax](http://ariatemplates.com/blog/2014/05/noder-js-integration-in-aria-templates/) and [how to migrate to it](http://ariatemplates.com/blog/2014/07/migration-to-at-noderjs/)
- `includeDependencies`, _Boolean_: whether the dependencies of all the resources explicitly added to a package should automatically be added to it
- `checkPackaged`, _Boolean_: if set to true, an error will be raised if any of the resources to process has not been included in any bundle
- `starCompress`, _Array_: the list of resources for which we allow star compression when writing the map. More information [here](http://ariatemplates.github.io/atpackager/visitors.html#build-an-aria-templates-url-map-aturlmap-)
- `starStarCompress`, _Array_: the list of resources for which we allow star star compression when writing the map. More information [here](http://ariatemplates.github.io/atpackager/visitors.html#build-an-aria-templates-url-map-aturlmap-)
- `license`, _String_: the license to be added in every .js file, including the ones that are not packaged. It should be a javascript comment
- `stripBanner`, _Boolean_: whether to remove the initial comment of a file. Notice that if set `minify` to true, all comments will be removed anyway
- `clean`, _Boolean_: whether the output folder has to be emptied at the beginning of the build
- `gzipStats`, _Boolean_: whether to display the size of each package and unpackaged file, along with its expected size after zipping it, with the reduction percentage.

In most cases, the default value is already the best one to optimise our packaging. Nevertheless, we might want to tune some operations that are performed on the  source code. As we already mentioned above, we can achieve exactly the same result by configuring atpackager, which would give us more degrees of freedom. But the `easypackage` task simplifies the job.



## Custom build of Aria Templates framework

In some cases, the standard production build of the framework might not suit our application. For example, we realize that there are some classes included in the default bundles that we don't really need.
When we face this problem, we can decide to re-package Aria Templates source code the way we want. We can use the __`atbuild`__ grunt task that comes with the framework.

The `atbuild` [multitask](http://gruntjs.com/creating-tasks#multi-tasks) can be easily configured. Let's look at a grunt file that contains a very simple usage:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/Gruntfile.js?lang=javascript&tag=atbuild&outdent=true'></script>

As we can see, the only mandatory option to set (otherwise the whole operation wouldn't make sense) is the list of `packages`. In the example, we are reading it from file `build/config/my-at-config.json`. This file looks like the default one that we use to make the official build of the framework, you can find it [here](https://github.com/ariatemplates/ariatemplates/blob/master/build/config/files-prod.json).

It contains a list of packages configurations. The only bundle that uses a different builder is `aria/pack-noder-error.js`: make sure you include it in the same way in your list. Other than that, we can re-organise source files the way we want.

__Remark:__ In order to inspect which classes are loaded but not used in our application we can rely on the [`BundleAnalyzer` class](http://www.ariatemplates.com/aria/guide/apps/apidocs/#aria.ext.BundleAnalyzer): it can provide a good idea on how to restructure the build of the framework.


### Configuration options

You can find the full list of options for the `atbuild` grunt task (with their default values) here:

<script src='%SNIPPETS_SERVER_URL%/snippets/github.com/ariatemplates/documentation-code/snippets/packaging/atbuildOptions.json?lang=javascript&outdent=true'></script>

Here is a detailed explanation:
- `bootstrapFiles`, _Array_: the list of files to include in the bootstrap of Aria Templates. The default value can be found [here](https://github.com/ariatemplates/ariatemplates/blob/master/build/config/files-bootstrap.json). The suggestion is to keep the default, unless we simply want to add other resources. We cannot remove or change the order of the default entries in this array
- `packages`, _Array_: as explained above, it contains the list of packages. That is where we can intervene
- `outputDirectory`, _String_: the directory we want the output files to be copied to
- `outputBootstrapFile`, _String_: the name of the bootstrap file to create
- `checkPackaged`, _Boolean_: whether to check that all files are included in a bundle. This option can be interesting for us if we don't want to bother including each and every file of the framework into bundles. Set it to false at your own risk.
- `clean`, _Boolean_: whether the output folder has to be emptied at the beginning of the build
- `gzipStats`, _Boolean_: whether to display the size of each package and unpackaged file, along with its expected size after zipping it, with the reduction percentage.

You can now have your customized version of the framework with a very simple task configuration!