---
id: layout-switcher
title: LayoutSwitcher
---

`LayoutSwitcher` renders a pair of buttons that allows the user to change results layout between `list` and `grid`.

It is normally used in combination with `ResultMultiLayout`, which wraps `ResultsList` and `ResultsGrid`.

The component is **not** displayed while executing the search query, if the current layout is not set or if
there are no results.

## Usage

```jsx
<LayoutSwitcher defaultLayout="list" />
```

## Props

* **defaultLayout** `String` *optional*

  The default layout, one of `list` or `grid`. Default value: `list`.

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyLayoutSwitcher = ({ currentLayout, onLayoutChange }) => {
  ...
}

const overriddenComponents = {
  "LayoutSwitcher.element": MyLayoutSwitcher
};
```

### Parameters

* **currentLayout** `String`

  The current value of the `layout` `query` state.

* **onLayoutChange** `function`

  The function to call when the user wants to change the current layout to change the `query` state. `onLayoutChange(newValue)`
