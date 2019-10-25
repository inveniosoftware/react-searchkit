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
  defaultValue="title"
/>
```

## Props

* **values** `Array`

  A list of possible values, where each value has the format `{ text: "Creation Date", value: "created" }`.

* **defaultValue** `String`

  The default value to pre-select when rendering the component. For example, `"created"`.

* **defaultSortByOnEmptyQuery** `String` *optional*

  Value to use when executing a search with an empty query string. When searching with an empty query, users normally expect most recent results, while searching with a defined query string, best match or any other sorting field. Default value: the value of `defaultValue` prop.

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
