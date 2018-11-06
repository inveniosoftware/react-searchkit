---
id: sort-by
title: Sort By Component
sidebar_label: Sort By
---
## Usage
### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``values``                    | yes       |               | {array}   | Array of options to show(Each option should be an object with keys `text`, `value |
| ``defaultValue``              | yes       |               | {string}  | Default dropdown value |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |


## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``currentSortBy``   | -             | {number}  | Selected dropdown sortBy value |
| ``values``  | -             | {string}  | Array of options to show(Each option should be an object with keys `text`, `value` |
| ``onValueChange``  | -             | {func}  | Function to call when dropdown value is changed |


Usage description
```jsx
<SortBy
 //TODO
/>
```