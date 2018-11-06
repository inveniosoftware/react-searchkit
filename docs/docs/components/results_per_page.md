---
id: results_grid
title: Results Grid Component
sidebar_label: Results Grid
---


## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``currentSize``               | yes       |               | {number}  | Title of the aggregator |
| ``totalResults``              | yes       |               | {number}  | Title of the aggregator |
| ``values``                    | yes       |               | {array}   | Aggregations selected by user |
| ``defaultValue``              | yes       |               | {number}  | Aggregations of the results |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |



## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|


Usage description 
```jsx
<ResultsPerPage
  //TODO
/>
```