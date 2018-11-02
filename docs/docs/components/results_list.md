---
id: results_list
title: Results List Component
sidebar_label: Results List
---

## Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------------------|
| ``items``         | yes       | []            | {array}   | Aggregations selected by user |
| ``renderElement`` | no        |               | {func}    | Aggregations of the results |


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