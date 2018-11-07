---
id: layout-switcher
title: LayoutSwitcher
---

`LayoutSwitcher` renders a pair of buttons that allows the user to change results layout between `list` and `grid`.

It is normally in combinatin with `ResultMultiLayout` to wrap `ResultsList` and `ResultsGrid`.

## Usage

### Props

| Name                  | Required  | Default       | Type                      | Description               |
| ----------------------|-----------|---------------| --------------------------|---------------------------|
| ``defaultLayout``     | no        | 'list'        | {oneOf(['list', 'grid'])} | The default layout value  |

```jsx
<LayoutSwitcher />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default   | Type                     | Description             |
| ------------------|-----------|--------------------------|-------------------------|
| ``renderElement`` | null      | {func}                   | Function to override the the component's template |
| ``currentLayout`` | -         | {oneOf(['list', 'grid'])}| Currently selected layout |
| ``onLayoutChange``| -         | {func}                   | The function to update the selected layout in the application state |
