---
id: empty_results
title: Empty Results Component
sidebar_label: Empty Results
---

## Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------|
| ``total``         | no        | null          | {number}  | Title of the aggregator |
| ``loading``       | no        | null          | {bool}  | Title of the aggregator |
| ``error``         | no        | null          | {object}   | Aggregations selected by user |
| ``renderElement`` | no        | null          | {func}    | Aggregations of the results |


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