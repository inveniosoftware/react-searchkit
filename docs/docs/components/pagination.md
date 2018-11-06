---
id: pagination
title: Pagination
---
## Usage

### Props

| Name                      | Required  | Default       | Type      | Description             |
| --------------------------|-----------|---------------| ----------|-------------------------|
| ``options``               | no        | ``{ boundaryRangeCount: 1, siblingRangeCount: 1,  showEllipsis: true, showFirstIcon: true,  showLastIcon: true,  showPrevIcon: true,  showNextIcon: true,} ``        | ``{boundaryRangeCount: PropTypes.number, siblingRangeCount: PropTypes.number, showEllipsis: PropTypes.bool, showFirstIcon: PropTypes.bool, showLastIcon: PropTypes.bool, showPrevIcon: PropTypes.bool, showNextIcon: PropTypes.bool, } ``   | Options to customize the styling of the component |
| ``renderElement``         | no        | null          | {func}    | Function to override the the component's template |



## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------|
| ``currentPage``   |  -            | {number}  | Current page number |
| ``currentSize``   |  -            | {number}  | Current page size |
| ``totalResults``  |  -            | {number}  | Total numbers of results to be presented |
| ``onPageChange``  |  -            | {function}| Function to update page value in application state |
| ``options``       |  -            | {obj}     | Options prop passed to the component |


Usage description
```jsx
<Pagination
//TODO
/>
```
