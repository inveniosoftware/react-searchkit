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
    field: "employee_type.type",
    aggName: "type_agg",
    childAgg: {
      field: "employee_type.subtype",
      aggName: "subtype_agg",
    },
  }}
/>
```

## Props

* **title** `String`

  The title to display for the aggregation.

* **agg** `Object`

  An object that describes the aggregation to look for in the `results`:

  * **field** `String`: the field name

  * **aggName** `String`: the aggregation name to look for in `results`

  * **childAgg** `Object`: a child aggregation with the same format as the `agg` prop

* **overridableId** `String` *optional*

  An optional string to define a specific overridable id.

## Usage when overriding

```jsx
const MyBucketAggregation = ({title, containerCmp}) => {
  return (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>{title}</Menu.Header>
        {containerCmp}
      </Menu.Item>
    </Menu>
  );
}

const BucketAggregationContainer = ({ valuesCmp }) => {
  ...
}

const MyBucketAggregationValues = ({ bucket, label, onFilterClicked, isSelected, childAggCmps }) => {
  ...
}

const overriddenComponents = {
  "BucketAggregation.element": MyBucketAggregation,
  "BucketAggregationContainer.element": MyBucketAggregationContainer,
  "BucketAggregationValues.element": MyBucketAggregationValues,
};
```

### BucketAggregation parameters

Component that wraps the bucket aggregations and renders a title and the container of aggregations.

* **title** `String`

  The title to render.

* **containerCmp** `React component`

  The `BucketAggregationContainer` to render.

* **agg** `Object`

  Same object as in the props.

* **updateQueryFilters** `Function`

  A function to call to update the current selected filters.

### BucketAggregationContainer parameters

Component that wraps the list of aggregations.

* **valuesCmp** `React component`

  List of components of each aggregation value.

### BucketAggregationValues parameters

Component that renders each of the aggregation.

* **bucket** `Array`

  The bucket to display, which by default contains the `key` field with the value and the `doc_count` number.

* **label** `String`

  The label to display.

* **isSelected** `Boolean`

  `true` if this value is active/selected, `false` otherwise.

* **onFilterClicked** `Function`

  The function to be called when the user click on this value to activate the filter. It should be called with the `bucket.key` parameter.

* **getChildAggCmps** `Function`

  A function to be called to render child component. It accepts the current `bucket` as parameter and it will render recursively this component. It returns a list of child components.
