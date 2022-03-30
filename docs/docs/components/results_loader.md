---
id: results-loader
title: ResultsLoader
---

`ResultsLoader` renders a loading indicator while performing a REST API request and refreshing the results.

## Usage

```jsx
<Loading />
```

## Props

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyResultsLoader = () => {
  ...
}

const overriddenComponents = {
  "ResultsLoader.element": MyResultsLoader
};
```
