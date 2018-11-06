---
id: sort_by
title: Sort By Component
sidebar_label: Sort By
---

## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``values``                    | yes       |               | {array}  | Title of the aggregator |
| ``defaultValue``              | yes       |               | {string}  | Title of the aggregator |
| ``updateQuerySortBy``         | yes       |               | {func}   | Aggregations selected by user |
| ``renderElement``             | no        |               | {func}    | Aggregations of the results |

???????
TODO: Shouldnt a property "showOnEmptyResults" be here?

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