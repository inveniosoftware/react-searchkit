---
id: pagination
title: Pagination
---

`Pagination` renders the controls for navigating the search result pages.

The component is **not** displayed while executing the search query, if the current page or results per page are not set
or if there are no results.

## Usage

```jsx
const options = { showEllipsis: false, showLastIcon: false }
<Pagination options={options} />
```

## Props

* **options** `object` *optional*

  An object that can contain:

  * **boundaryRangeCount** `Number`: Number of always visible pages at the beginning and end. Default value: `1`.
  * **siblingRangeCount** `Number`: Number of always visible pages before and after the current one. Default value: `1`.
  * **showEllipsis** `boolean`: Show '...' for hidden pages. Default value: `true`.
  * **showFirst** `boolean`: Show the icon to go to the first page. Default value: `true`.
  * **showLast** `boolean`: Show the icon to go to the last page. Default value: `true`.
  * **showPrev** `boolean`: Show the icon to go to the previous page. Default value: `true`.
  * **showNext** `boolean`: Show the icon to go to the next page. Default value: `true`.

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<Pagination renderElement={renderPagination} />
```

The function `renderElement` is called every time the list of results changes.

```jsx
renderPagination = (currentPage, currentSize, totalResults, onPageChange, options) => {
  const pages = Math.ceil(totalResults / currentSize);
  return <div>Page {currentPage} of {pages}.</div>;
}
```

### Parameters

* **currentPage** `Number`

  The current value of the `page` `query` state.

* **currentSize** `Number`

  The current value of the `size` `query` state, to be able to calculate the total number of pages.

* **totalResults** `Number`

  The current value of the `total` `results` state representing the number of results, to be able to calculate the total number of pages.

* **onPageChange** `Number`

  Function to call when the user wants to change the page to change the `query` state. `onPageChange(newValue)`

* **options** `object`

  The options prop passed to the component.
