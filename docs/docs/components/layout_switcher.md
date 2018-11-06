---
id: layout-switcher
title: LayoutSwitcher
---


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

Usage description
```jsx
<LayoutSwitcher
//TODO
/>
```
