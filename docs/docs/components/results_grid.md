---
id: results_grid
title: Results Grid Component
sidebar_label: Results Grid
---

## Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------| --------------|-----------|-------------------------|
| ``itemsPerRow``   | no        |  3            | {number}  | Title of the aggregator |
| ``items``         | yes       |               | {array}   | Title of the aggregator |
| ``renderElement`` | no        |               | {func}    | Aggregations selected by user |


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
