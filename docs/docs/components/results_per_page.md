---
id: results-per-page
title: ResultsPerPage
---

`ResultsPerPage` renders a list of the possible number of results per page.

The component is **not** displayed while executing the search query or if there are no results.

## Usage

```jsx
<ResultsPerPage
  values={[{text: "Ten", value: 10}, {text: "Twenty", value: 20}]}
/>
```

## Props

* **values** `Array`

  A list of possible values, where each value has the format `{ text: "Fifty", value: 50 }`.

- **label** `function` _optional_

  An optional function to wrap the component with a prefix and suffix string. <br />
  E.g. `label={(cmp) => <> Show {cmp} results per page</>}`

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyResultsPerPage = ({ currentSize, options, onValueChange, ariaLabel, selectOnNavigation }) => {
  ...
}

const overriddenComponents = {
  "ResultsPerPage.element": MyResultsPerPage
};
```

### Parameters

* **currentSize** `String`

  The current value of the `size` `query` state.

* **options** `Array`

  The options passed as prop to the component.

* **onValueChange** `Gunction`

  The function to call when the user changes the number of results per page to change the `query` state. `onValueChange(newValue)`

* **ariaLabel** `String`

  The ARIA (Accessibility) label to add to the component.

* **selectOnNavigation** `Boolean`

  When using a dropdown, set if the `onValueChange` should be called when the new dropdown item is selected with arrow keys, or only on click or on enter.
