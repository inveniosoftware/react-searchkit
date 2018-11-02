---
id: react_search_kit
title: React Search Kit Component
sidebar_label: React Search Kit
---

## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``items``                     | yes       |               | {array}   | Title of the aggregator |
| ``currentLayout``             | no        | undefined     | {string}  | Title of the aggregator |
| ``loading``                   | yes       |               | {bool}    | Aggregations selected by user |
| ``totalResults``              | yes       |               | {number}  | Aggregations of the results |


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