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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<EmptyResults renderElement={renderEmptyResults} />
```

The function `renderElement` is called every time the number of results changes.

```jsx
renderEmptyResults = (queryString, resetQuery) => {
  return (<div>
    <em>No results found with query "{queryString}"</em>
    <div><button onClick={() => resetQuery()}>Clear query</button></div>
  </div>);
}
```

### Parameters

* **queryString** `String`

  The current value of the `queryString` `query` state.

* **resetQuery** `function`

  A function to call to reset the current search query.
