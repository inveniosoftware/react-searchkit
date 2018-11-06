---
id: results-per-page
title: ResultsPerPage
---


## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``values``                    | yes       |               | {array}  | Array of options to show(Each option should be an object with keys `text`, `value`|
| ``defaultValue``              | yes       |               | {string}  | Default dropdown value |

```jsx
<ResultsPerPage
  values={this.resultsPerPageValues}
  defaultValue={10}
/>
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
| ``currentSize``   | -             | {number}  | Selected dropdown size value |
| ``values``        | -             | {string}  | Array of options to show(Each option should be an object with keys `text`, `value` |
| ``onValueChange`` | -             | {func}  | Function to call when dropdown value is changed |
