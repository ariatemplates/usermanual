Title: Terminology

## Objectives

Testing is often misunderstood as a way of debugging. In a traditional waterfall development it's common practice to test after the functionality is developed, usually by an independent group of tester. A failing tests is thus used as a platform to debug.

It's very important to define the objective of testing, depending on what you want to achieve you'll need different tools and techniques.

* Development testing, a process where tests aid a developer into writing a software unit,
* Regression testing, a process that focuses on finding defects after a code change has occurred,
* Acceptance testing, a process that validates that a given software works as expected on target environments

Development testing focuses on single software unit that are still in development phases.
This means the testing environment should provide a way to test a code block in isolation.
Being part of development, writing a test and executing it should as simple and fast as possible.

Regression testing instead verifies that any code change doesn't introduce new defect anywhere in the software.
This usually means running the whole set of tests that might be impacted by the code change.
Even if regression testing might be used during development, due to the possible large number of tests cases and target environments,
it's more suited for continuous integration.

Tests can also be classified by their specificity:

* Unit testing or component testing, refers to specific section of code, usually in isolation,
* Integration testing refers to verifying the interfaces between components,
* System or End to End testing refers to testing completely integrated systems

The distinction on specificity is important when it comes to selecting the most appropriate testing environment.

## Testing artifacts

Common artifacts used or produced while testing are

* **Test case**: A program or a set of conditions that determine whether a software system is working correctly or not.
* **Test suite**: A collection of test cases. This is usually needed to group test cases that require the same system configuration or prerequisite states
* **Fixture**: Set of values or data used to test a given functionality ensuring that the test is executed in a fixed and controlled environment. In general fixtures are created handling setUp and tearDown events to separate initialization from testing. In the scope of web testing, a clean DOM node where HTML can be created is a fixture.
* **Test report**: Result of a test case. It contains generated metrics like number of tests failed, code coverage, execution time, profiling information like used resources and hot spots.
* **Assertion library**: Set of methods to be used in test case to specify whether the program produces the expected result and to reason about program correctness.
* **Test tools**: Programs or libraries used in testing a system, it includes spies, stubs and mocks.
* **Test runner / launcher**: Software or set of instructions able to execute a test case and generate a test report.
* **Test engine**: Software used to execute several test cases, through a test runner, and gather test reports. The engine might be able to coordinate multiple test runners
* **Test server**: Tool used by the engine or runner to retrieve test cases and software to be tested. In certain cases the server is responsible of pre-processing the software or the tests to let the test runner collect particular metrics (coverage, performances, ...).

Useful link: [nettuts - TDD Terminology](http://net.tutsplus.com/articles/tdd-terminology-simplified/)
