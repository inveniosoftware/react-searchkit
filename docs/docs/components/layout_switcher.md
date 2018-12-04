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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<LayoutSwitcher renderElement={renderLayoutSwitcher} />
```

The function `renderElement` is called every time the number of results changes.

```jsx
renderLayoutSwitcher = (currentLayout, onLayoutChange) => {
  return <a onClick={() => onLayoutChange('list')}>LIST</a>/<a onClick={() => onLayoutChange('grid')}>GRID</a>;
}
```

### Parameters

* **currentLayout** `String`

  The current value of the `layout` `query` state.

* **onLayoutChange** `function`

  The function to call when the user wants to change the current layout to change the `query` state. `onLayoutChange(newValue)`
