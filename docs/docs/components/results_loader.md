---
id: results-loader
title: ResultsLoader
---

`ResultsLoader` renders a loading indicator while performing a REST API request and refreshing the results.

## Usage

```jsx
<Loading />
```

## Props

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<ResultsGrid renderElement={renderLoader} />
```

The function `renderElement` is called every time the loading state changes to `true`. When the state is `false`, then the component is not displayed.

```jsx
renderLoader = () => {
  return <div>Loading...</div>;
}
```
