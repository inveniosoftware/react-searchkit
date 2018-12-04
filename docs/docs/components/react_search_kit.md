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

* **searchConfig** `object` *optional*

  An object containing configuration for the default REST API endpoint connector.

* **searchApi** `object` *optional*

  An instance of a class to override the default implementation of the REST API endpoint connector.

* **urlParamsConfig** `object` *optional*

  An object containing configuration for the default URL parameters handler.

* **urlParamsApi** `object` *optional*

  An instance of a class to override the default implementation of the URL parameters handler.

* **searchOnLoad** `boolean` *optional*

  A boolean to perform a search when the application is mounted. Default `true`.

