---
id: search-bar
title: SearchBar
---

`SearchBar` renders an input box for queries and a Search button.

As default behavior, the search can be triggered clicking on the button or pressing the `enter` keystroke.

## Usage

```jsx
<SearchBar placeholder="Enter any keyword" />
```

## Props

* **placeholder** `String` *optional*

  The placeholder value of the search box. Default value: `Type something`.

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MySearchBar = ({ queryString, onBtnSearchClick, onInputChange, onKeyPress, placeholder, actionProps, uiProps }) => {
  ...
}

const overriddenComponents = {
  "SearchBar.element": MySearchBar
};
```

### Parameters

* **placeholder** `String`

  The prop `placeholder` defined when using the component.

* **queryString** `String`

  The current value of the `queryString` `query` state.

* **onInputChange** `Function`

  A function to be called every time the user changes the query string to change the `query` state. `onInputChange(queryString)`

* **onBtnSearchClick** `Function`

  A function to be called when the user clicks on the the search button.

* **onKeyPress** `Function`

  A function to be called on key press to handle the Enter button pressed.

* **actionProps** `Object`

  Semantic-UI props for the action button.

* **uiProps** `Object`

  Semantic-UI props for the search bar.
