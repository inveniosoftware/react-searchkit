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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<SearchBar renderElement={renderSearchBar} />
```

The function `renderElement` is called every time the query string changes.

```jsx
renderSearchBar = (placeholder, currentQueryString, onInputChange, executeSearch) => {
  return <input type="text">;
}
```

### Parameters

* **placeholder** `String`

  The prop `placeholder` defined when using the component.

* **currentQueryString** `String`

  The current value of the `queryString` `query` state.

* **onInputChange** `function`

  A function to be called every time the user changes the query string to change the `query` state. `onInputChange(queryString)`

* **executeSearch** `function`

  A function to be called to perform a search. It does not accept any parameter, as it will use the current query string to perform the search.
