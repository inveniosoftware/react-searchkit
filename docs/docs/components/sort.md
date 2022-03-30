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

- **label** `function` _optional_

  An optional function to wrap the component with a prefix and suffix string. <br />
  E.g. `label={(cmp) => <> sorted by {cmp}</>}`

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MySort = ({ currentSortBy, options, onValueChange, ariaLabel, selectOnNavigation }) => {
  ...
}

const overriddenComponents = {
  "Sort.element": MySort
};
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

* **ariaLabel** `String`

  The ARIA (Accessibility) label to add to the component.

* **selectOnNavigation** `Boolean`

  When using a dropdown, set if the `onValueChange` should be called when the new dropdown item is selected with arrow keys, or only on click or on enter.
