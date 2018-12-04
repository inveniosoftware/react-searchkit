---
id: aggregator
title: Aggregator
---

`Aggregator` renders the list of search results aggregations as checkboxes.

By default it supports nested aggregations. The user can select aggregations to filter results.

## Usage

```jsx
<Aggregator
  title="Categories"
  field="category"
/>
```

## Props

* **title** `String`

  The title to display for the aggregator.

* **field** `String`

## Usage when overriding template

```jsx
<Aggregator renderElement={renderAggregator}/>
```

The function `renderElement` is called every time results or currentSortOrder change.

```jsx
renderAggregator = (title, field, resultsAggregations, userSelectionAggregations, userSelectionChangeHandler) => {
  const results = resultsAggregations.map(result => <div>{result.key} ({result.total})</div>)
  return <div>
    <div>{title}</div>
    {results}
  </div>;
}
```

### Parameters

* **title** `String`

  The title passed as prop to the component.

* **field** `String`

  The field passed as prop to the component.

* **resultsAggregations** `object`

  The `aggregations` `results` state`. It contains aggregations returned by the API layer in the format described in the Aggregation section of this guide.

* **userSelectionAggregations** `Array`

  The `aggregations` `query` state. It contains the user selected aggregations.

* **userSelectionChangeHandler** `function`

  The function to call when the user selects or unselects an aggregation. The parameter should be a nested object to identify the selected value: `{ "field name" : { value: "value", "nested field name": { value: "value" }}}`. `userSelectionChangeHandler(clickedValue)`
