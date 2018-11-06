---
id: active-aggregations
title: ActiveAggregations
---

## Usage

### Props

| Name                          | Required | Default       | Type      | Description             |
| ------------------------------|----------|---------------| ----------|-------------------------|
| ``aggregations``              | no       |               | {array}   |  |
| ``updateQueryAggregation``    | no       |               | {func}    |  |


```jsx
<Agg />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name                          | Default       | Type      | Description                   |
| ------------------------------|---------------| ----------|-------------------------------|
| ``renderElement``             | null          | {func}    | Function to override the the component's template |
| ``userSelectionAggregations`` |               | {array}   | Aggregations selected by user |
| ``resultsAggregations``       |               | {func}    | Aggregations of the results   |

Usage description
```jsx
<Aggregator
  //TODO
/>
```
