---
id: empty-results
title: EmptyResults
---

`EmptyResults` is a component that renders in case of 0 results.

The component is **not** displayed while executing the search query, when there is no error or when the number of
results is greater than 0.

## Usage

```jsx
<EmptyResults />
```

## Props

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyEmptyResults = ({ queryString, resetQuery, extraContent }) => {
  ...
}

const overriddenComponents = {
  "EmptyResults.element": MyEmptyResults
};
```

### Parameters

* **queryString** `String`

  The current value of the `queryString` `query` state.

* **resetQuery** `Function`

  A function to call to reset the current search query.

* **extraContent** `React component`

  Any extra React component to be rendered.

* **userSelectionFilters** `Array`

  List of the currently selected filters.
