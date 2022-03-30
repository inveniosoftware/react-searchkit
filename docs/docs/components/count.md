---
id: count
title: Count
---

`Count` renders the number of search results.

Useful to display the total number of results after a search.

The component is **not** displayed while executing the search query or if there are no results.

## Usage

```jsx
<Count />
```

## Props

- **label** `Function` _optional_

  An optional function to wrap the component with a prefix and suffix string. <br />
  E.g. `label={(cmp) => <> Found {cmp} results</>} />`

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyCount = ({ totalResults }) => {
  return <div>Found {totalResults} results.</div>;
}

const overriddenComponents = {
  "Count.element": MyCount
};
```

### Parameters

* **totalResults** `Number`

  The current value of the `total` `results` state representing the number of results.
