<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

---
id: react-searchkit
title: ReactSearchKit
---

`ReactSearchKit` is the base component container of the entire search application.

It wraps any other component, provide state and configuration to the application.

## Usage

### Props

| Name                   | Required | Default       | Type      | Description             |
| -----------------------|----------|---------------| ----------|-------------------------|
| ``searchConfig``       | no       |      -        | {object}  | Configuration object for SearchApi class |
| ``searchApi``          | no       |       -       | {class}   | Class to override completely the default SearchApi class. |
| ``urlParamsConfig``    | no       |       -       | {object}  | Configuration object for UrlParamsApi class |
| ``urlParamsApi``       | no       |    -          | {class}   | Class to override completely the default UrlParamsApi class. |
| ``searchOnLoad``       | no       | true          | {bool}    | Option to trigger search when application is mounted |
| ``defaultSortByOnEmptyQuery``| no | null          | {string}  | One of the values of the `SortBy` component that is set when a search is triggered with empty querystring|


Usage description
```jsx
<ReactSearchKit>
// my search UI components
</ReactSearchKit>
```
