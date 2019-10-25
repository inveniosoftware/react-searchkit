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

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

## Usage when overriding template

```jsx
<ActiveFilters renderElement={renderActiveFilters}/>
```

The function `renderElement` is called every time `results` or `filters` in query state change.

```jsx
renderActiveFilters = (filters, removeActiveFilter) => {
  return filters.map(filter => {
    const aggName = filter[0];
    const value = filter[1];
    const label = `${aggName}:${value}`;
    return <div onClick={removeActiveFilter([aggName, value])}>{label}</div>
  };
}
```

### Parameters

* **filters** `array`

  The `filters` `query` state. It contains the list of active filters selected by the user. Each element is a list `[ "<agg name>", "<value>" ]`.

* **removeActiveFilter** `function`

  A function to be called with the active filter list as parameter if you want to remove one of the active filters.
