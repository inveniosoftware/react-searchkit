---
id: results_grid
title: Results Grid Component
sidebar_label: Results Grid
---


## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``currentSize``               | yes       |               | {number}  | Title of the aggregator |
| ``totalResults``              | yes       |               | {number}  | Title of the aggregator |
| ``values``                    | yes       |               | {array}   | Aggregations selected by user |
| ``defaultValue``              | yes       |               | {number}    | Aggregations of the results |
| ``renderElement``             | no        |               | {func}    | Aggregations of the results |


## Usage

Usage description 
```jsx
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