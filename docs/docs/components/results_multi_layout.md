<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

---
id: results-multi-layout
title: ResultsMultiLayout
---

`ResultsMultiLayout` is an uncontrolled component that listens to the application's `layout` state and
renders results in a `list` ([ResultsList](components/results_list.md)) or `grid` ([ResultsGrid](components/results_grid.md))
respectively. Can be used in combination with the `LayoutSwitcher` component to change the results layout in controllable way.
By default it renders results as a list.

## Usage

```
<ResultsMultiLayout />
```
