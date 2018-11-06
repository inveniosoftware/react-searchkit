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
| ``renderElement`` | no        | null          | {func}    | Override default template |


```jsx
<EmptyResults />
```

## Usage when overriding template

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------|
| ``total``         | no        | null          | {number}  | Total number of results |
| ``loading``       | no        | null          | {bool}  | True if the app is fetching results |
| ``error``         | no        | null          | {object}   | Object containing the error payload when fetching results |


```jsx
const CustomEmptyResults = props => props.total === 0 ? <div>Sorry, no results!</div> : null;

<EmptyResults
  renderElement= props => (
  !props.error && !props.loading ? <CustomEmptyResults total={props.total}/> : null
  )
/>
```