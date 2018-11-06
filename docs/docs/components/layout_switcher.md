---
id: layout_switcher
title: Layout Switcher Component
sidebar_label: Layout Switcher
---


## Usage

### Props

| Name                  | Required  | Default       | Type                      | Description               |
| ----------------------|-----------|---------------| --------------------------|---------------------------|
| ``defaultLayout``     | no        | 'list'        | {oneOf(['list', 'grid'])} | The default layout value  |


## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type                        | Description             |
| ------------------|---------------| ----------------------------|-------------------------|
| ``currentLayout`` | -             | {oneOf(['list', 'grid'])}   | Currently selected layout |
| ``onLayoutChange``| -             | {func}                      | The function to update the selected layout in the application state |

Usage description
```jsx
<LayoutSwitcher
//TODO
/>
```