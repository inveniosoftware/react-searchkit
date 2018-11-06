---
id: aggregator
title: Aggregator
---

`Aggregator` renders the list of search results aggregations as checkboxes supporting nesting.

It allows the user to click on an aggregation value to select it.

## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``title``                     | yes       |               | {string}  | Title of the aggregator |
| ``field``                     | yes       |               | {string}  | Field by which we want to aggregate |


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
| ``renderElement``             | null          | {func}    | Function to override the the component's template |
| ``userSelectionAggregations`` |               | {array}   | Aggregations selected by user |
| ``resultsAggregations``       |               | {func}    | Aggregations of the results   |
