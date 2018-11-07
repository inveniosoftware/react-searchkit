<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

---
id: results-loader
title: ResultsLoader
---

`ResultsLoader` renders the loading indicator displayed while performing a REST API request and refreshing the results.

## Usage

```jsx
<Loading />
```

## Usage when overriding template

Your render element function should return a jsx template.

### Props

| Name              | Required  | Default       | Type      | Description             |
| ------------------|-----------|---------------| ----------|-------------------------|
| ``renderElement`` | no        | null          | {func}    |Function to override the the component's template  |
