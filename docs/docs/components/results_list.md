---
id: results-list
title: ResultsList
---


## Usage

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------------------|
| ``items``         | yes       | []            | {array}   | Array of items to be presented |
| ``renderElement`` | no        |               | {func}    | Function to override the the component's template |



## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------|
| ``item``          |  -            | {object}   | One item of the `items` array |
| ``index``          |  -            | {number}   | Index of the item in the `items` array |


Usage description
```jsx
<ResultsList
//TODO
/>
```
