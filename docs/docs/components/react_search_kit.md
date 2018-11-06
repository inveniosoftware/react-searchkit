---
id: results-multi-layout
title: Results Multi Layout Component
sidebar_label: Results Multi Layout
---

## Usage

### Props

| Name                          | Required  | Default       | Type      | Description             |
| ------------------------------|-----------|---------------| ----------|-------------------------|
| ``searchConfig``              | no        |      -         | {object}  | Configuration object for SearchApi class |
| ``searchApi``                 | no        |       -        | {class}  | Class to override completely the default SearchApi class. |
| ``urlParamsConfig`` | no       |       -        | {object}   | Configuration object for UrlParamsApi class |
| ``urlParamsApi``       | no       |    -           | {class}    | Class to override completely the default UrlParamsApi class. |
| ``searchOnLoad``             | no        | true          | {bool}    | Option to trigger search when application is mounted |
| ``defaultSortByOnEmptyQuery``             | no        | null          | {string}    | One of the values of the `SortBy` component that is set when a search is triggered with empty querystring|


Usage description
```jsx
<ReactSearchKit
//TODO
/>
```