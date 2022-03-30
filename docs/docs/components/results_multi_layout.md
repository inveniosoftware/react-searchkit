---
id: results-multi-layout
title: ResultsMultiLayout
---

`ResultsMultiLayout` is an uncontrolled component that listens to the application's `layout` state and
renders results in a `list` ([ResultsList](components/results_list.md)) or `grid` ([ResultsGrid](components/results_grid.md))
respectively. Can be used in combination with the `LayoutSwitcher` component to change the results layout in controllable way.
By default it renders results as a list.

## Usage

```jsx
<ResultsMultiLayout />
```

## Props

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyResultsMultiLayout = ({ layout }) => {
  ...
}

const overriddenComponents = {
  "ResultsMultiLayout.element": MyResultsMultiLayout
};
```

### Parameters

* **layout** `String`

  The current selected layout. Possible values: `list` or `grid`.
