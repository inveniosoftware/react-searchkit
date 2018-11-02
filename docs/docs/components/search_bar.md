---
id: search_bar
title: Search Bar Component
sidebar_label: Search Bar
---

## Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``queryString``               | no        | ''            | {string}  | Title of the aggregator |
| ``updateQueryString``         | yes       |               | {func}    | Title of the aggregator |
| ``renderElement``             | no        |               | {func}    | Aggregations selected by user |
| ``setSortByOnEmpty``          | no        | null          | {string}  | Aggregations of the results |


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
