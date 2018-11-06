---
id: active_aggregations
title: Active Aggregations Component
sidebar_label: Active Aggregations
---

## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``aggregations``              | yes       |               | {array}   | //TODO |
| ``updateQueryAggregation``    | yes       |               | {func}    | //TODO  |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |


```jsx
<Agg
 title="File types"
 field="file_type"
/>
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name                          | Default       | Type      | Description                   |
| ------------------------------|---------------| ----------|-------------------------------|
| ``userSelectionAggregations`` |               | {array}   | Aggregations selected by user |
| ``resultsAggregations``       |               | {func}    | Aggregations of the results   |

Usage description
```jsx
<Aggregator
  //TODO
/>
```