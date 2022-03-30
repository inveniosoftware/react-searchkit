---
id: toggle
title: Toggle
---

`Toggle` renders a Toggle Checkbox in a Card element providing a filter for the performed search.

## Usage

```jsx
<Toggle
    title="Versions"
    label="View all versions"
    filterValue={['all_versions', 'true']}
/>
```

## Props

* **title** `String` *optional*

  The optional title for the Card element.

* **label** `label` *optional*

  An optional label to for the Checkbox element.

* **filterValue** `Array`

  An array containing the filter to be applied to the search query when active.

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyCount = ({ totalResults }) => {
  return <div>Found {totalResults} results.</div>;
}

const overriddenComponents = {
  "SearchFilters.ToggleComponent.element": MyCount
};
```

### Parameters

* **title** `String` *optional*

  The optional title for the Card element.

* **label** `label` *optional*

  An optional label to for the Checkbox element.

* **filterValue** `Array`

  An array containing the filter to be applied to the search query when active.

* **userSelectionFilters** `Array`

  The list of currently selected filters by the user.

* **updateQueryFilters** `Function`

  The function to call to add or remove a filter from the list of selected ones `updateQueryFilters(filter)`.
