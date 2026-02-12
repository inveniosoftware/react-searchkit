# Changes

Version 3.1.0 (released 2026-02-12)

- feat: add Range Facet component (date range, histogram, slider, default/custom filters)
- fix(ci): upgrade Node to v20 and update publish CI workflow

Version 3.0.3 (released 2025-09-10)

- chore: major bump of `react-overridable` to `1.0.0`, adding backwards-compatible support for devtools.
  The major bump will help with proper semantic versioning across invenio dependencies.
- chore: upgrade GH runner os for npm-publish action

Version 3.0.1 (released 2025-09-10)

- deps: minor bump of `react-overridable` to `0.0.4`, adding backwards-compatible support for devtools

Version 3.0.0 (released 2024-10-10)

- deps: major bump of axios to `v1.7.x`. It is released as major so we can controllably
  rollout the change to the `inveniosoftware` organization.

Version 2.3.0 (released 2024-10-02)

- Results components: a new prop allows the implementation of a callback on results
  rendered.

Version 2.2.6 (released 2024-05-06)

- Pagination/ResultsPerPage: a new prop controls if these components should be
  displayed when the number of results pages is one.

Version 2.2.5 (released 2024-01-17)

- selector: allow the same value in multiple children aggregations
- results grid: pass correct value to results prop
- selector: check the corner case when one value starts with the same string as another value

Version 2.2.4 (released 2023-11-07)

- InvenioRequestSerializer: nested filters are now sent to the backend
  concatenated with the parent filter

Version 2.2.3 (released 2023-10-08)

- revert render aggregation only if several buckets

Version 2.2.2 (released 2023-09-05)

- bucket aggregation: add id to checkbox

- Version 2.2.1 (released 2023-08-25)

- bucket aggregations: render aggregation only if several buckets

Version 2.2.0 (released 2023-04-06)

- control max number of results via config

Version 2.1.0 (released 2023-03-28)

- add maximum results to the pagination

Version 2.0.2 (released 2022-10-19)

- pagination: navigate to previous page if current page is empty

Version 2.0.1 (released 2022-04-28)

- Fix Searchbar missing `queryString` prop

Version 2.0.0 (released 2022-03-31) 🚀

- Adds ARIA tags to dropdowns.
- Fixes Toggle component by changing the overridable id to `SearchFilters.Toggle`.
- Integrates `eslint-config-invenio` and fixes code.
- Improves documentation.

Version 1.0.0-alpha.22 (released 2022-02-11)

- EmptyResults: pass userSelectionFilters filters.
- Change patch versions of NPM dependencies to x.x.0 to relax requirements.

Version 1.0.0-alpha.21 (released 2022-02-07)

- Add namespace to overridable id to the Toggle component.
- Adds docs to how to customize RSK using react-overridable.

Version 1.0.0-alpha.20 (released 2022-02-02)

- Adds "@semantic-ui-react/css-patch" as peer dependency.

Version 1.0.0-alpha.19 (released 2022-02-01)

- Fixes wrong NPM peer dependencies.

Version 1.0.0-alpha.18 (released 2022-02-01)

- Adds namespacing allowing users to initiate multiple search applications
  and be able to override components per instance.
- Upgrades react-semantic-ui.

Version 1.0.0-alpha.17 (released 2021-07-27)

- Fix deselection of nested facet.
  Fixes https://github.com/inveniosoftware/invenio-app-rdm/issues/1014

Version 1.0.0-alpha.16 (released 2021-07-21)

- Update axios dep

Version 1.0.0-alpha.15 (released 2021-04-20)

- Adds new request serializer to interact with REST APIs made with
  Invenio-Records-Resources instead of Invenio-Records-REST.

Version 1.0.0-alpha.14 (released 2021-02-18)

- Fixed URL params parsing when the query string starts with numbers
  or contains quotes. The type auto-guessing of each URL param has been
  replaced by only specifically casting `size` and `page` to `int`.

Version 1.0.0-alpha.13 (released 2021-02-10)

- Use `config.initialQueryState` to override state when resetting query

Version 1.0.0-alpha.12 (released 2021-02-04)

- Added `size` option to Pagination component
- Refactor `options` parameter passed to Pagination component so you can override
  the default options partially without having to pass the whole object.

Version 1.0.0-alpha.11 (released 2021-01-12)

- Fix bucket aggregation filter widget to handle array or object buckets from ES response

Version 1.0.0-alpha.10 (released 2020-11-13)

- Implemented state synchronization with the browser history
- Implemented configurable URL validation

Version 1.0.0-alpha.9 (released 2020-11-10)

- Fixed bug that prevent boolean checkboxes to be selected.
- Implemented sorting on empty query string and updated the documentation.
- Removes `connectExtend` function.
- Removes travis and adds GH actions.

Version 1.0.0-alpha.8 (released 2020-10-29)

- Adds a ToggleFilter component
- Removes compact css class from the sort drop down.

Version 1.0.0-alpha.7 (released 2020-10-20)

- Override query state from search response.
- `InvenioSearchApi` extracts overriden state from response.
- Configure `Sort` component to disable the order option.
- Remove `valuesLabels` prop from `BucketAggregation` component.

Version 1.0.0-alpha.6 (released 2020-10-15)

- Override query state from search response.
- `InvenioSearchApi` extracts overriden state from response.
- Configure `Sort` component to disable the order option.

Version 1.0.0-alpha.5 (released 2020-10-12)

- Enhanced SearchBar component to enable more customizability via props.

Version 1.0.0-alpha.4 (released 2020-10-09)

- BREAKING CHANGE: removes props to set the initial default value from each UI component. The only
  way to set the initial state of the search app is by using the prop `initialQueryState` in the
  `ReactSearchKit` component.
- Upgrades dependencies and React SemanticUI version.

Version 1.0.0-alpha.3 (released 2020-08-25)

- Adds `hiddenParams` to the query state, to allow passing "hidden" query string
  parameters to the search API.
- Adds `initialQueryState` prop to `<ReactSearchkit>`, to allow overriding the
  initial query state.

Version 1.0.0-alpha.2 (released 2020-08-05)

- Add additional props to BucketAggregation component - flexible overrides

Version 1.0.0-alpha.1 (released 2020-05-15)

- Remove 'use strict' directive from the built CommonJS module dist,
  which was wrong and breaking Babel runtime helper. Sites using
  Content-Security-Policies headers were reporting 'unsafe-eval' error.
- Remove `react-scripts` from `peerDependencies`.

Version 1.0.0-alpha.0 (released 2020-05-13)

- Breaking: integrate `react-overridable` library. The `renderElement` props have been removed in favour
  of `<Overridable />` components.
- Fix rendering components even if they should not render when loading.

Version 0.19.0 (released 2020-04-14)

- Add `label` prop to wrap components with a `prefix` and/or `suffix` text.
- Fix a bug with wrong Redux initial state.

Version 0.18.0 (released 2020-04-02)

- Fixed axios url config override.
- Updated axios dependency to 0.19.2.
- Fixed documentation typos.
- Replaced arrow functions with class methods.
- Set initialLoading to true
- Exposed function`updateQueryState` with `withState` HOC.
- Support for multiple filters in `updateQueryState`.

Version 0.17.0 (released 2020-02-19)

- Added event listener to trigger search from external app
- Removed `history` prop and related code/doc
- Updated react deps

Version 0.16.0 (released 2019-12-04)

- added configuration for passing axios interceptors in `InvenioSearchApi`

Version 0.14.0 (released 2019-10-15)

- added multi-layout support fo search results
- changed params passing to pagination and display of search result card

Version 0.13.0 (released 2019-10-01)

- Removed Semantic-UI import from the library and moved to the demo app
- Upgraded create-react-app to 3.1.2

Version 0.12.0 (released 2019-09-10)

- Fixed bug to prevent state mutation when getting URL args
- Renamed component withQueryState to withState

Version 0.11.0 (released 2019-08-30)

- Moved all dev dependencies to peer dependencies
- Removed for the time being the `redux-devtools-extension` because it is wrongly transformed from CommonJS to ES modules

Version 0.10.0 (released 2019-08-30)

- Changed lib build system to use Rollup instead of Babel to be able to build the CommonJS version too

Version 0.9.0 (released 2019-08-26)

- Fixed babel absolute runtimes when publishing the library on npmjs

Version 0.8.0 (released 2019-08-26) -- deprecated on npmjs

- Dependencies upgrade
- Fixed build with babel
- Changed configuration for Invenio backend APIs

Version 0.7.0 (released 2019-08-13)

- Replaced nwb with create-react-app since nwb is not anymore maintained and it comes with many security vulnerabilities
- create-react-app is now used for development, babel to build the library

Version 0.6.0 (released 2019-08-07)

- Added withQueryState component exposing redux query state to external components

Version 0.5.0 (released 2019-06-27)

- Added SearchBar component with autocompletion

Version 0.4.0 (released 2019-04-24)

- Updated nested aggregation code
- Change in how selected aggregations are displayed
- Updated response/request serializers
- Added option to display aggregations as expandable accordions

Version 0.3.0 (released 2018-12-05)

- Upgraded dependencies to remove event-stream npm package
- Fixed an issue with sorting component
- Completed documentation changes for components

Version 0.2.0 (released 2018-11-15)

- Added npm build:watch to task to easily integrate while making changes to the app
- Harmonization of renderElement prop for components
- Added reset query action
- Changed documentation layout for some components

Version 0.1.0 (released 2018-11-07)

- Initial public release.
