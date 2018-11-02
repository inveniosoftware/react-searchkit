---
id: results_multi_layout
title: Results Multi Layout Component
sidebar_label: Results Multi Layout
---

## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``title``                     | yes       |               | {string}  | Title of the aggregator |
| ``field``                     | yes       |               | {string}  | Title of the aggregator |
| ``userSelectionAggregations`` | yes       |               | {array}   | Aggregations selected by user |
| ``resultsAggregations``       | yes       |               | {func}    | Aggregations of the results |
| ``renderElement``             | no        | {}            | {func}    | Aggregations of the results |


## Usage

Usage description 
```
<TextField
  componentId="NameTextSensor"
  dataField="name"
  title="TextField"
  defaultSelected="volvo"
  placeholder="Type a car name"
  showFilter={true}
  filterLabel="Car"
  URLParams={false}
/>
```