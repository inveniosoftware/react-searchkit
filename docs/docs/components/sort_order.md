---
id: sort_order
title: Sort Order Component
sidebar_label: Sort Order
---

## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``values``                    | yes       |               | {string}  | Title of the aggregator |
| ``defaultValue``              | yes       |               | {string}  | Title of the aggregator |
| ``currentSortOrder``          | no        | undefined     | {array}   | Aggregations selected by user |
| ``updateQuerySortOrder``      | yes       |               | {func}    | Aggregations of the results |
| ``renderElement``             | no        | {}            | {func}    | Aggregations of the results |

?????
TODO:   showOnEmptyResults: false, not included in proptype

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