---
id: active-filters
title: ActiveFilters
---

`ActiveFilters` renders the current selected filters by the user as a list of labels.

Each label has a `close` icon which can be clicked to remove the selected filter.

## Usage

```jsx
<ActiveFilters />
```

## Props

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyActiveFilters = ({ filters, removeActiveFilter, getLabel }) => {
  ...
}

const overriddenComponents = {
  "ActiveFilters.element": MyActiveFilters
};
```

### Parameters

* **filters** `Array`

  The `filters` `query` state. It contains the list of active filters selected by the user. Each element is a list `[ "<agg name>", "<value>" ]`.

* **removeActiveFilter** `Function`

  Function to be called with the active filter list as parameter if you want to remove one of the active filters `removeActiveFilter(<active filter>)`.

* **getLabel** `Function`

  Function to be called to get a display label for the given active filter `getLabel(filter)`.
