Title: Introduction

> There's a big difference between designing for everything that will happen and designing for everything that might happen
>
> -- Kent Beck

Just as it's practically impossible to create non trivial software without errors,
it's not wise to believe that testing can identify any defect within software.
Instead testing should be considered as an attempt to assess that a software is acceptable to its end users,
the target audience.

Nonetheless testing can be very useful for the developer to prevent some defects to happen and anticipate their detection,
thus reducing software development risks, time and costs.
This is the case of **Test Driven Development** (TDD), an approach to development that relies on test-first concepts.

TDD has a short development cycle:

* Add a test
* Verify that it fails
* Write just enough code to make the test pass
* Verify that the test passes
* Refactor code to meet acceptable standards of code quality

One of the benefits of TDD is that it can drive the design toward a more modular, flexible and extensible code.
These qualities are a consequence of a methodology that forces the developer to think of the software in terms of small,
testable units to be integrated later. This leads to smaller classes with cleaner interfaces.

When it comes to **testing JavaScript for the web**, and in particular the user interface, things get complex for several reasons.
One of them is the large variety of target browsers and environments. It is clearly impractical for any developer to adopt TDD while manually
launching tests in all target browsers.

These pages try to explain with guidelines and examples how to apply TDD in web development.
