---
id: error
title: Error
---

`Error` renders the errors returned by the REST API, e.g. 4xx or 5xx.

## Usage

```jsx
<Error />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
| ``error``         | {}            | {object}  | Response error object   |
