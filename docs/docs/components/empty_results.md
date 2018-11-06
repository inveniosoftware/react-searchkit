---
id: empty_results
title: Empty Results Component
sidebar_label: Empty Results
---

This component is very nice!

## Usage

### Props

| Name              | Required  | Default       | Type      | Description |
| ------------------|-----------|---------------| ----------|-------------|
| ``renderElement`` | no        | null          | {func}    | Function to override the the component's template |


```jsx
<EmptyResults />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``total``         | 0             | {number}  | Total number of results |


```jsx
const CustomEmptyResults = props => props.total === 0 ? <div>Sorry, no results!</div> : null;

<EmptyResults
  renderElement= props => (
  !props.error && !props.loading ? <CustomEmptyResults total={props.total}/> : null
  )
/>
```