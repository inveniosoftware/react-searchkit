---
id: results-list
title: ResultsList
---

`ResultsList` renders the list of results as a simple list.

## Usage

```jsx
<ResultsList />
```

## Props

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

* **onResultsRendered** `func` *optional*

  An optional function to define set of actions to be performed after the component is rendered. For example: render MathJax to display mathematical equations.

## Usage when overriding

```jsx
const MyResultsListContainer = ({ results, resultsPerRow }) => {
  ...
}

const MyResultsListItem = ({ results, resultsPerRow }) => {
  ...
}

const overriddenComponents = {
  "ResultsList.container": MyResultsListContainer
  "ResultsList.item": MyResultsListItem
};
```

### ResultsListContainer parameters

Component that wraps the list of result's items.

* **results** `Array`

  The list of results to display to the user.

### ResultsListItem parameters

Component that will render a specicif result item.

* **result** `Object`

  The result object to render.

* **index** `Number`

  The index number of the result object.

