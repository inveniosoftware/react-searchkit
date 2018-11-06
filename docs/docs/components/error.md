---
id: error
title: Error Component
sidebar_label: Error
---
## Usage

### Props

| Name              | Required  | Default       | Type      | Description           |
| ------------------|-----------|---------------| ----------|-----------------------|
| ``renderElement`` | no        |  null         | {func}    | Function to override the the component's template |




## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``error``         | {}            | {object}  | Response error object   |

Usage description 
```jsx
<Error
//TODO
/>
```