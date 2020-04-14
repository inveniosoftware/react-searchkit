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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

- **label** `function` _optional_

  An optional function to wrap the component with a prefix and suffix string. <br />
  E.g. `label={(val) => <> Found {val} results</>} />`

## Usage when overriding template

```jsx
<Count renderElement={renderCount} />
```

The function `renderElement` is called every time the number of results changes.

```jsx
renderCount = totalResults => {
  return <div>Found {totalResults} results.</div>;
}
```

### Parameters

* **totalResults** `Number`

  The current value of the `total` `results` state representing the number of results.
