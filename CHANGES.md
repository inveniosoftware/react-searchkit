# Changes

Version 0.13.0 (released 2019-10-01)
* Removed Semantic-UI import from the library and moved to the demo app
* Upgraded create-react-app to 3.1.2

Version 0.12.0 (released 2019-09-10)
* Fixed bug to prevent state mutation when getting URL args
* Renamed component withQueryState to withState

Version 0.11.0 (released 2019-08-30)
* Moved all dev dependencies to peer dependencies
* Removed for the time being the `redux-devtools-extension` because it is wrongly transformed from CommonJS to ES modules

Version 0.10.0 (released 2019-08-30)
* Changed lib build system to use Rollup instead of Babel to be able to build the CommonJS version too

Version 0.9.0 (released 2019-08-26)
* Fixed babel absolute runtimes when publishing the library on npmjs

Version 0.8.0 (released 2019-08-26) -- deprecated on npmjs
* Dependencies upgrade
* Fixed build with babel
* Changed configuration for Invenio backend APIs

Version 0.7.0 (released 2019-08-13)
* Replaced nwb with create-react-app since nwb is not anymore maintained and it comes with many security vulnerabilities
* create-react-app is now used for development, babel to build the library

Version 0.6.0 (released 2019-08-07)
* Added withQueryState component exposing redux query state to external components

Version 0.5.0 (released 2019-06-27)
* Added SearchBar component with autocompletion

Version 0.4.0 (released 2019-04-24)
* Updated nested aggregation code
* Change in how selected aggregations are displayed
* Updated response/request serializers
* Added option to display aggregations as expandable accordions

Version 0.3.0 (released 2018-12-05)

* Upgraded dependencies to remove event-stream npm package
* Fixed an issue with sorting component
* Completed documentation changes for components

Version 0.2.0 (released 2018-11-15)

* Added npm build:watch to task to easily integrate while making changes to the app
* Harmonization of renderElement prop for components
* Added reset query action
* Changed documentation layout for some components

Version 0.1.0 (released 2018-11-07)

* Initial public release.
