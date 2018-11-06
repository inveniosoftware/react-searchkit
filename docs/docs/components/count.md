---
id: count
title: Count Component
sidebar_label: Count
---

## Props

| Name                 | Required  | Default       | Type      | Description             |
| ---------------------|-----------|---------------| ----------|-------------|
| ``total``            | no        | 0             | {number}  | Title of the aggregator |
| ``loading``          | no        | null          | {bool}    | Title of the aggregator |
| ``renderTemplate``   | no        | null          | {func}    | Aggregations selected by user |


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

