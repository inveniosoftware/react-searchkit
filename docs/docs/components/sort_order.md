---
id: sort_order
title: Sort Order Component
sidebar_label: Sort Order
---
## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------|
| ``values``                    | yes       |               | {string}  | //TODO |
| ``defaultValue``              | yes       |               | {string}  | Default value for the sort order |
| ``currentSortOrder``          | no        | undefined     | {array}   | Current sort order |
| ``updateQuerySortOrder``      | yes       |               | {func}    | //TODO |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |

?????
TODO:   showOnEmptyResults: false, not included in proptype


## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|

Usage description 
```jsx
<SortOrder
//TODO
/>
```