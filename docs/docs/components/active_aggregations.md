---
id: active-aggregations
title: ActiveAggregations
---

`ActiveAggregations` renders the current selected aggregations by the user as a list of labels.

Each label has a `close` icon which can be clicked to remove the selected aggregation.

## Usage

```jsx
<ActiveAggregations />
```

## Usage when overriding template

```jsx
<ActiveAggregations renderElement={renderActiveAggregations}/>
```

The function `renderElement` is called every time results or currentSortOrder change.

```jsx
renderActiveAggregations = aggregations => {
  return aggregations.keys().map(aggregation => <div>{aggregation})</div>);
}
```

### Parameters

* **aggregations** `object`

  The `aggregations` `results` state. It contains aggregations returned by the API layer in the format described in the Aggregation section of this guide.
