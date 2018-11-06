---
id: aggregator
title: Aggregator
---

## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``title``                     | yes       |               | {string}  | Title of the aggregator |
| ``field``                     | yes       |               | {string}  | Field by which we want to aggregate |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |


```jsx
<Aggregator
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
