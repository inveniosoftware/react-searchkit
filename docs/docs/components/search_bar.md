---
id: search-bar
title: SearchBar
---

`SearchBar` renders an input box for queries and a Search button.

The search can be triggered clicking on the button or pressing the `enter` keystroke.

## Usage

```jsx
<SearchBar />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
| ``placeholder``   |'Type something'| {string} | Placeholder value       |
| ``value``         |  -            | {string}  | component's input value |
| ``onInputChange`` |  -            | {func}    | Function to call when input value is changed |
| ``onUpdateQuery`` |  -            | {func}    | Function to call when you want to update application's state querystring |
