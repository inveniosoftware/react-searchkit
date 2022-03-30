---
id: react-searchkit
title: ReactSearchKit
---

`ReactSearchKit` is the base component that wraps your search application.

It provides state and configuration to the application.

## Usage

```jsx
<ReactSearchKit searchApi={searchApi}>
  ... React-SearchKit components ...
</ReactSearchKit>
```

See the [complete guide](main_concepts.md) for detailed information.

## Props

- **searchApi** `object` _required_

  An instance of the adapter class for your search backend.

- **urlHandlerApi** `object` _optional_

  An object containing configuration for handling URL parameters:

  - **enabled** `boolean`: `true` if URL parameters should be updated `false` otherwise. Default `true`.
  - **overrideConfig** `object`:

    - **keepHistory** `boolean`: `true` if each change of the URL parameters should push a new state to the browser history, `false` if it should replace it instead. Default `true`.
    - **urlFilterSeparator** `object`: a character(s) to override the default character defined in `UrlHandlerApi`, used when separating child filters.
    - **urlParamsMapping** `object`: an object to override the default mapping defined in `UrlHandlerApi`, used when serializing each query state field to an URL parameter.
    - **urlParamValidator** `object`: an object to override the default implementation of `UrlParamValidator` in `UrlHandlerApi`.
    - **urlParser** `object`: an object to override the default implementation of `UrlParser` in `UrlHandlerApi`.

  - **customHandler** `object`: override entirely the default class `UrlHandlerApi`.

- **searchOnInit** `boolean` _optional_

  A boolean to perform a search when the application is mounted. Default `true`.

- **appName** `string` _optional_

  A name to uniquely identify the application. Useful when enabling the `event listener` (read below) and when multiple ReactSearchKit apps are loaded in the same page.

  The `overridable-id` of each component will be prefixed by this `appName` ([see here](https://inveniosoftware.github.io/react-searchkit/docs/ui-customisation)). Default is empty string `'' ` (no namespacing).

- **eventListenerEnabled** `boolean` _optional_

  If `true` the application listens to the `queryChanged` event else if `false` no listener is registered. When this event is emitted the application triggers a search based on the payload that is passed to the event at the emission time. Default `false`.

- **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

- **initialQueryState** `object` _optional_

  Set the initial state of your ReactSearchKit application. It will be used to render each component with these default selected values and to perform the first search query, if `searchOnInit` is set to `true`.
  The object keys must match the query state fields and the values must be valid values that correspond to the values passed to each parameters.

- **defaultSortingOnEmptyQueryString** `object` _optional_

  It is sometimes useful to automatically change the default sorting in case the query string is set or left empty.
  A typical case is when your app should return by default the most recent items when the user did not search for anything in particular, but it should instead return the best matching items when searching with a particular query string.
  When enabled, the behavior will be the following:

    * if the user did **not** change sorting, the default sorting with an **empty** query string will be the one defined with this prop `defaultSortingOnEmptyQueryString`.
    * if the user did **not** change sorting, the default sorting with a query string will be the one defined with the prop `initialQueryState`.
    * if the user **did** change sorting and selected a value, then the user preference will be kept, independently of the presence or absence of the query string.

  - **sortBy** `string`: the query state `sortBy` value to use on empty query string.

  - **sortOrder** `string`: the query state `sortOrder` value to use on empty query string.

