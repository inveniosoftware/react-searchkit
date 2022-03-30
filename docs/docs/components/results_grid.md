---
id: results-grid
title: ResultsGrid
---

`ResultsGrid` renders the list of results as a grid.

## Usage

```jsx
<ResultsGrid resultsPerRow={5} />
```

## Props

* **resultsPerRow** `int` *optional*

  The number of results to display in each row. Default value: `3`.

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyResultsGridContainer = ({ results, resultsPerRow }) => {
  ...
}

const MyResultsGridItem = ({ results, resultsPerRow }) => {
  ...
}

const overriddenComponents = {
  "ResultsGrid.container": MyResultsGridContainer
  "ResultsGrid.item": MyResultsGridItem
};
```

### ResultsGridContainer parameters

Component that wraps the grid of result's items.

* **results** `Array`

  The list of results to display to the user.

* **resultsPerRow** `Number`

  The prop `resultsPerRow` defined when using the component.


### ResultsGridItem parameters

Component that will render a specicif result item.

* **result** `Object`

  The result object to render.

* **index** `Number`

  The index number of the result object.
