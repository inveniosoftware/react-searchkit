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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

* **resultsListCmp** `function` *optional*

  An optional function to override the default rendered `<ResultsList>`.

* **resultsGridCmp** `function` *optional*

  An optional function to override the default rendered `<ResultsGrid>`

## Usage when overriding template

```jsx
<ResultsMultiLayout
    renderElement={renderMultiLayout}
    resultsListCmp={renderResultsList}
    resultsGridCmp={renderResultsGrid}
    />
```

The function `renderElement` is called every time the `currentLayout` changes.
