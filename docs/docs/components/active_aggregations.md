---
id: active-aggregations
title: ActiveAggregations
---

`ActiveAggregations` renders the current selected aggregations by the user as a list of labels.

Each label has a `close` icon which can be clicked to remove the selected aggregation.

## Usage

### Props

| Name                          | Required | Default       | Type      | Description             |
| ------------------------------|----------|---------------| ----------|-------------------------|
| ``aggregations``              | no       |               | {array}   |  |
| ``updateQueryAggregation``    | no       |               | {func}    |  |


```jsx
<ActiveAggregations />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name                          | Default       | Type      | Description                   |
| ------------------------------|---------------| ----------|-------------------------------|
| ``renderElement``             | null          | {func}    | Function to override the the component's template |
| ``userSelectionAggregations`` |               | {array}   | Aggregations selected by user |
| ``resultsAggregations``       |               | {func}    | Aggregations of the results   |
