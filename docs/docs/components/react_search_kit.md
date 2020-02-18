---
id: react-searchkit
title: ReactSearchKit
---

`ReactSearchKit` is the base component that wraps your search application.

It provides state and configuration to the application.

## Usage

```jsx
<ReactSearchKit
  searchApi={searchApi}
>
  ... React-SearchKit components ...
</ReactSearchKit>
```

See the [complete guide](main_concepts.md) for detailed information.

## Props

* **searchApi** `object` *required*

  An instance of the adapter class for your search backend.

* **urlHandlerApi** `object` *optional*

  An object containing configuration for handling URL parameters:

  * **enabled** `boolean`: `true` if URL parameters should be updated `false` otherwise. Default `true`.
  * **overrideConfig** `object`:

      * **keepHistory** `boolean`: `true` if each change of the URL parameters should push a new state to the browser history, `false` if it should replace it instead. Default `true`.
      * **urlFilterSeparator** `object`: a character(s) to override the default character defined in `UrlHandlerApi`, used when separating child filters.
      * **urlParamsMapping** `object`: an object to override the default mapping defined in `UrlHandlerApi`, used when serializing each query state field to an URL parameter.
      * **urlParamValidator** `object`: an object to override the default implementation of `UrlParamValidator` in `UrlHandlerApi`.
      * **urlParser** `object`: an object to override the default implementation of `UrlParser` in `UrlHandlerApi`.

  * **customHandler** `object`: override entirely the default class `UrlHandlerApi`.

* **searchOnInit** `object` *optional*

  A boolean to perform a search when the application is mounted. Default `true`.

* **defaultSortByOnEmptyQuery** `boolean` *optional*

  A boolean to define a default `sort by` value when the query string is empty. This is useful when the results sorting should be different when the user inserts a query string or not (e.g. `most recent` or `most relevant` first).

* **appName** `string` *optional*

  A name identifier to distinguish uniquely the application. Default `RSK`.

* **eventListenerEnabled** `boolean` *optional*

  If `true` the application listens to the `queryChanged` event else if `false` no listener is registered. When this event is emitted the application triggers a search based on the payload that is passed to the event at the emission time. Default `false`.