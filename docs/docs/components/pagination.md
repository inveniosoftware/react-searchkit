---
id: pagination
title: Pagination Component
sidebar_label: Pagination
---
## Usage

### Props

| Name                      | Required  | Default       | Type      | Description             |
| --------------------------|-----------|---------------| ----------|-------------------------|
| ``options``               | no        | ``{ boundaryRangeCount: 1, siblingRangeCount: 1,  showEllipsis: true, showFirstIcon: true,  showLastIcon: true,  showPrevIcon: true,  showNextIcon: true,} ``        | ``{boundaryRangeCount: PropTypes.number, siblingRangeCount: PropTypes.number, showEllipsis: PropTypes.bool, showFirstIcon: PropTypes.bool, showLastIcon: PropTypes.bool, showPrevIcon: PropTypes.bool, showNextIcon: PropTypes.bool, } ``   | //TODO |
| ``renderElement``         | no        | null          | {func}    | Function to override the the component's template |



## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------|
| ``currentPage``   |  -            | {number}  | Current page number |
| ``currentSize``   |  -            | {number}  | Current page size |
| ``totalResults``  |  -            | {number}  | Total numbers of results to be presented |
| ``onPageChange``  |  -            | {function}| //TODO |
| ``options``       |  -            | {obj}     | //TODO |


Usage description 
```jsx
<Pagination
//TODO
/>
```