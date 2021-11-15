# General
 Cypress (win64) Repo containing Tshirt webstore exercise.
 General description of solution and comments in this file. 
 Code comments found in all /spec files containing actionable tests.

## Description
Tests various functionalities of https://react-shopping-cart-67954.firebaseapp.com/
includes multiple tests for specific functionalities and one e2e use case

Tests are configured to run locally or remotely via Cypress.io Dashboard https://dashboard.cypress.io/projects/1uwoc2
Tests are also runnable via the CI tool AWS CodeBuild on demand via clicking in the dashboard. 

The tests themselves are written to be fairly general and easy to maintain and expand, require no additional cypress or other scripting packages (only cypress and nodejs themselves are required). Some selectors are intentionally non uniform or slightly less than optimal in order to showcase various expression patterns.

For simplicity, portability and readability, no custom commands are introduced (although I was tempted to make a field to number convertor for prices) and all custom functions are defined and immediately used inline. Tests handle items in a generalized manner and can easily be expanded to test all possible combinations or similar interfaces (for example iterating all elements of a collection instead of grabbing a random one to perform tests on)

Tests are currently configured to ALWAYS PASS. Tested website has some bugs though, so the easiest way to capture a bug via failing test is to do one small edit to line 17 of filter-by-size.spec.js replacing the (have.text) argument "S |" with the existing $shirtSize variable. All recording and screenshot functionality is enabled and the AWS CodeBuild deploy has been set up (see buildspec.yml) explicitly always initialize video recording (of passing tests as well) in order to test cloud storage capability. Any kind of run takes screenshots on fail. Tests themselves take about 10s to run, so resource-intensive options such as parallelization are disabled by default, but can be enabled if needed for all or specific runs.

Full reports in human readable form are available in console output when running tests locally, or in /runs/test-results/ directory of Cypress.io Dashboard alongside recordings and environment + performance details.


## Running the tests
Tests support various run modes, either locally through Cypress UI, local shell or remotely via cli interface
All run commands are standard out-of-the-box cypress syntax
npx cypress run (--browser BrowserOption) (--record) (--key RecordKey) (Key can be obtained in Cypress Dashboard of the project)

## Browser Support
Tests run in native Electron with full functionality.
Chrome, Edge, Firefox also fully supported. (Firefox video recording functionality requires some additional packages)
Preferred browser can be specified via --browser option.

I am NOT using the browserstack extension because of simplicity and implicit trust that CI providers and local users are running the browsers and versions they are most comfortable with but this extension is supported and can easily be added in.

## CI integration
Tests are already fully integrated to run and deposit artifacts in AWS CodeBuild (as default tool of Cypres.io Dashboard) so all recordings, results and artifacts can be reached via the dashboard.

CircleCI orb and GitLab-CI integration also provided via their respective config files (AWS Codebuild: buildspec.yml / CircleCI: ./circleci/config.yml / GitLab: gitlab-ci.yml)