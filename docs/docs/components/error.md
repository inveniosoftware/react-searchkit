---
id: error
title: Error
---

`Error` renders the errors returned by the REST API, e.g. 4xx or 5xx.

The component is **not** displayed while executing the search query or if there is no error.

## Usage

```jsx
<Error />
```

## Props

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<Error renderElement={renderError} />
```

The function `renderElement` is called every time the results error object is not empty.

```jsx
renderError = error => {
  return <div>Error while performing the search. Message: {error.message}</div>;
}
```

### Parameters

* **error** `object`

  The current value of the `error` `results` state, containing the error returned by the search API connector.
