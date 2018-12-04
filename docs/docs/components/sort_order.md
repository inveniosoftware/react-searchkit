---
id: sort-order
title: SortOrder
---

`SortOrder` renders a list of the possible sort order values, i.e. ascending/descending.

The component is **not** displayed while executing the search query or if there are no results.

## Usage

```jsx
<SortOrder
  values={[{text: "Asc", value: "asc"}, {text: "Desc", value: "desc"}]}
  defaultValue="desc"
/>
```

## Props

* **values** `Array`

  A list of possible values, where each value has the format `{ text: "Asc", value: "asc" }`.

* **defaultValue** `String`

  The default value to pre-select when rendering the component. For example, `"desc"`.

## Usage when overriding template

```jsx
<SortOrder renderElement={renderSortOrder} />
```

The function `renderElement` is called every time results or currentSortOrder change.

```jsx
renderSortOrder = (currentSortOrder, options, onValueChange) => {
  const _options = options.map(option => <li onClick={() => {onValueChange(option.value)}}>{option.text}</li>);
  return <ul>{this._options}</ul>;
}
```

### Parameters

* **currentSortOrder** `String`

  The current value of the `sortOrder` `query` state.

* **options** `Array`

  The options passed as prop to the component.

* **onValueChange** `function`

  The function to call when the user changes the sort order field value to change the `query` state. `onValueChange(newValue)`
