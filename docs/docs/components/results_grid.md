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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<ResultsGrid resultsPerRow={5} renderElement={renderResultsGrid} />
```

The function `renderElement` is called every time the results have changed.

```jsx
renderResultsGrid = (results, resultsPerRow) => {
  return results.map((result, index) => {
      const divider = index % resultsPerRow === 0 ? <br/> : null;
      return <div>{divider}{result}</div>
  });
}
```

### Parameters

* **results** `array`

  The list of results to display to the user.

* **resultsPerRow** `int`

  The prop `resultsPerRow` defined when using the component.
