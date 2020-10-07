---
id: sort-by
title: SortBy
---

`SortBy` renders a list of possible sort options.

The component is **not** displayed while executing the search query or if there are no results.

## Usage

```jsx
<SortBy
  values={[{text: "Most recent", value: "created"}, {text: "Title", value: "title"}]}
/>
```

## Props

* **values** `Array`

  A list of possible values, where each value has the format `{ text: "Creation Date", value: "created" }`.

- **label** `function` _optional_

  An optional function to wrap the component with a prefix and suffix string. <br />
  E.g. `label={(cmp) => <> sorted by {cmp}</>}`

## Usage when overriding template

```jsx
<SortBy renderElement={renderSortBy} />
```

The function `renderElement` is called every time `results` or `sortBy` change.

```jsx
renderSortBy = (currentSortBy, options, onValueChange) => {
  const _options = options.map(option => <li onClick={() => {onValueChange(option.value)}}>{option.text}</li>);
  return <ul>{this._options}</ul>;
}
```

### Parameters

* **currentSortBy** `String`

  The current value of the `sortBy` `query` state.

* **options** `Array`

  The options passed as prop to the component.

* **onValueChange** `function`

  The function to call when the user changes the sort by field value to change the `query` state. `onValueChange(newValue)`
