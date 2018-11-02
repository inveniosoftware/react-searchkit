---
id: layout_switcher
title: Layout Switcher Component
sidebar_label: Layout Switcher
---

## Props

| Name                  | Required  | Default       | Type                      | Description             |
| ----------------------|-----------|---------------| --------------------------|-------------|
| ``defaultLayout``     | no        | 'list'        | {oneOf(['list', 'grid'])} | Title of the aggregator |
| ``updateLayout``      | yes       |               | {func}                    | Title of the aggregator |
| ``setInitialState``   | yes       |               | {func}                    | Aggregations selected by user |
| ``currentLayout``     | no        |               | {string}                  | Aggregations of the results |
| ``loading``           | yes       |               | {bool}                    | Aggregations of the results |
| ``totalResults``      | yes       |               | {number}                  | Aggregations of the results |


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