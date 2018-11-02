---
id: should_render
title: Should Render Component
sidebar_label: Should Render
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