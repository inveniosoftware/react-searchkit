---
id: empty-results
title: EmptyResults
---
This component is rendered when there are no results.

## Usage

```jsx
<EmptyResults />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
| ``total``         | 0             | {number}  | Total number of results |
