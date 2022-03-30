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

## Usage when overriding

```jsx
const MyError = ({ error }) => {
  ...
}

const overriddenComponents = {
  "Error.element": MyError
};
```

### Parameters

* **error** `Object`

  The current value of the `error` `results` state, containing the error returned by the search API connector.
