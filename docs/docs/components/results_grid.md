---
id: results-grid
title: ResultsGrid
---
The actual result item displayed as a grid.

## Usage

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------| --------------|-----------|-------------------------|
| ``itemsPerRow``   | no        |  3            | {number}  | Number of items per row |

```jsx
<ResultsGrid />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``items``         | []            | {array}   | Array of items to be presented |
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
