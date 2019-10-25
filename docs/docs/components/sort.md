---
id: sort
title: Sort
---

`Sort` renders a list of possible sort by and sort order options in one single component.

The component is **not** displayed while executing the search query or if there are no results.

## Usage

```jsx
<Sort
  values={[
    {
      text: 'Newest',
      sortBy: 'creation_date',
      sortOrder: 'asc',
      default: true,
      defaultOnEmptyString: true,
    },
    {
      text: 'Oldest',
      sortBy: 'creation_date',
      sortOrder: 'desc',
    },
  ]}
/>
```

## Props

* **values** `Array`

  A list of possible values, where each value has the format `{ text: "Newest", sortBy: "<field name>", sortOrder: "<value>" }`.
  A `default` and `defaultOnEmptyString` fields can be provided to choose the default value. Otherwise, the first value is set as default.

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<SortBy renderElement={renderSort} />
```

The function `renderElement` is called every time results change.

```jsx
renderSort = (currentSortBy, currentSortOrder, options, onValueChange) => {
  const _options = options.map(option => <li onClick={(e, { value }) => onValueChange(value)}>{option.text}</li>);
  return <ul>{this._options}</ul>;
}
```

### Parameters

* **currentSortBy** `String`

  The current value of the `sortBy` `query` state.

* **currentSortOrder** `String`

  The current value of the `sortOrder` `query` state.

* **options** `Array`

  The options passed as prop to the component.

* **onValueChange** `function`

  The function to call when the user changes the sort by field value to change the `query` state. `onValueChange(newValue)`
