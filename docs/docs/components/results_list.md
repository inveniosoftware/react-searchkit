---
id: results-list
title: ResultsList
---
The actual result item displayed as a list.

## Usage

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------------------|
| ``items``         | yes       | []            | {array}   | Array of items to be presented |


## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------|
| ``renderElement`` |               | {func}    | Function to override the the component's template |
| ``item``          |  -            | {object}   | One item of the `items` array |
| ``index``         |  -            | {number}   | Index of the item in the `items` array |


Usage description
```jsx
<ResultsList
//TODO
/>
```
