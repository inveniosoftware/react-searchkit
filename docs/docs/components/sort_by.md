---
id: sort_by
title: Sort By Component
sidebar_label: Sort By
---
## Usage
### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``values``                    | yes       |               | {array}   | Array of values to be sorted |
| ``defaultValue``              | yes       |               | {string}  | Default value to sort by |
| ``updateQuerySortBy``         | yes       |               | {func}    | // TODO |
| ``renderElement``             | no        | null          | {func}    | Function to override the the component's template |

???????
TODO: Shouldnt a property "showOnEmptyResults" be here?


## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|

Usage description 
```jsx
<SortBy
 //TODO
/>
```