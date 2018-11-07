<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

---
id: results-grid
title: ResultsGrid
---

`ResultsGrid` renders the list of results as a grid.

## Usage

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------| --------------|-----------|-------------------------|
| ``itemsPerRow``   | no        |  3            | {number}  | Number of items per row |

```jsx
<ResultsGrid />
```

## Usage when overriding template

Props below are available in your renderElement function when you override the template.

### Props

| Name              | Default       | Type      | Description             |
| ------------------|---------------| ----------|-------------------------|
| ``items``         | []            | {array}   | Array of items to be presented |
| ``renderElement`` | null          | {func}    | Function to override the the component's template |
