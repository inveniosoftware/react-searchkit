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
  * **showEllipsis** `Boolean`: Show '...' for hidden pages. Default value: `true`.
  * **showFirst** `Boolean`: Show the icon to go to the first page. Default value: `true`.
  * **showLast** `Boolean`: Show the icon to go to the last page. Default value: `true`.
  * **showPrev** `Boolean`: Show the icon to go to the previous page. Default value: `true`.
  * **showNext** `Boolean`: Show the icon to go to the next page. Default value: `true`.
  * **size** `String`: Component size, one of `["mini", "tiny", "small", "large", "huge", "massive"]`.

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyPagination = ({ currentPage, currentSize, totalResults, onPageChange, options }) => {
  ...
}

const overriddenComponents = {
  "Pagination.element": MyPagination
};
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

* **showWhenOnlyOnePage** `Boolean`

  Allows to configure whether or not the component will render when there is only one page of results available. Default value: `true`.

  
