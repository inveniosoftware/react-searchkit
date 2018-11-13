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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<ResultsList renderElement={renderResultsList} />
```

The function `renderElement` is called every time the results have changed.

```jsx
renderResultsList = results => {
  return results.map(result => <div>{result}</div>);
}
```

### Parameters

* **results** `array`

  The list of results to display to the user.
