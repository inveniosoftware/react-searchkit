---
id: react-searchkit
title: ReactSearchKit
---

`ReactSearchKit` is the base component that wraps your search application.

It provides state and configuration to the application.

## Usage

```jsx
<ReactSearchKit
  searchConfig={apiConfig}
  urlParamsConfig={urlConfig}
>
  ... React-SearchKit components ...
</ReactSearchKit>
```

See the [complete guide](main_concepts.md) for detailed information.

## Props

* **searchApi** `object` *optional*

  An instance of the search class to connect to the REST API endpoint.

* **urlParamsConfig** `object` *optional*

  An object containing configuration for the default URL parameters handler.

* **urlParamsApi** `object` *optional*

  An instance of a class to override the default implementation of the URL parameters handler.

* **searchOnInit** `boolean` *optional*

  A boolean to perform a search when the application is initialized. Default `true`.

