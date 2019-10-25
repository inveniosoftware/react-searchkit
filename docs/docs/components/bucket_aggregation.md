---
id: bucket-aggregation
title: BucketAggregation
---

`BucketAggregation` renders the list of search results aggregations as checkboxes.

By default it supports child aggregations. The user can select aggregations to filter results.

## Usage

```jsx
<BucketAggregation
  title="Employee Types"
  agg={{
    field: 'employee_type.type',
    aggName: 'type_agg',
    childAgg: {
      field: 'employee_type.subtype',
      aggName: 'subtype_agg',
    },
  }}
/>
```

## Props

* **title** `String`

  The title to display for the aggregation.

* **agg** `object`

  An object that describes the aggregation to look for in the `results`:

  * **field** `String`: the field name

  * **aggName** `String`: the aggregation name to look for in `results`

  * **childAgg** `object`: a child aggregation with the same format as the `agg` prop

* **renderElement** `function` *optional*

  An optional function to override the default rendered component.

* **renderValuesContainerElement** `function` *optional*

  An optional function to override the default rendered container component that wraps each value.

* **renderValueElement** `function` *optional*

  An optional function to override the default rendered component for each of the value.

## Usage when overriding template

```jsx
<BucketAggregation
  renderElement={customAggComp}
  renderValuesContainerElement={customAggValuesContainerCmp}
  renderValueElement={customAggValueCmp}
  />
```

Each `render*` function is called every time `results` `aggregations` value changes.

```jsx
const customAggComp = (title, containerCmp) => {
  return containerCmp ? (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>{title}</Menu.Header>
        {containerCmp}
      </Menu.Item>
    </Menu>
  ) : null;
};
```

### renderElement parameters

* **title** `String`

  The title passed as prop to the component.

* **containerCmp** `React component`

  Container component to render for the aggregation values.

```jsx
const customAggValuesContainerCmp = valuesCmp => (
  <Menu.Menu>{valuesCmp}</Menu.Menu>
);
```
### renderValuesContainerElement parameters

* **valuesCmp** `React component`

  Component to render each of the aggregation values.

```jsx
const customAggValueCmp = (
  bucket,
  isSelected,
  onFilterClicked,
  getChildAggCmps
) => {
  const childAggCmps = getChildAggCmps(bucket);
  return (
    <Menu.Item
      key={bucket.key}
      name={bucket.key}
      active={isSelected}
      onClick={() => onFilterClicked(bucket.key)}
    >
      <Label>{bucket.doc_count}</Label>
      {bucket.key}
      {childAggCmps}
    </Menu.Item>
  );
};
```

### renderValueElement parameters

* **bucket** `array`

  The bucket to display, which by default contains the `key` field with the value and the `doc_count` number.

* **isSelected** `boolean`

  `true` if this value is active/selected, `false` otherwise.

* **onFilterClicked** `function`

  The function to be called when the user click on this value to activate the filter. It should be called with the `bucket.key` parameter.

* **getChildAggCmps** `function`

  A function to be called to render child component. It accepts the current `bucket` as parameter and it will render recursively this component. It returns a list of child components.
