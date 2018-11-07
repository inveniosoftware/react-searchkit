---
id: count
title: Count
---

`Count` renders the number of search results.

Useful to display the total number of results after a search.

## Usage

```jsx
<Count />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props
| Name                 | Default       | Type      | Description             |
| ---------------------|---------------| ----------|-------------------------|
| ``renderElement``    | null          | {func}    | Function to override the the component's template |
| ``total``            | 0             | {number}  | Total number of results |
