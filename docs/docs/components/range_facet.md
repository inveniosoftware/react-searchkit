---
id: range-facet
title: RangeFacet
---

`RangeFacet` renders a histogram, slider, and optional default/custom ranges for a numeric year range.

It reads buckets from the `results` aggregations and stores the selected range in the query `filters`.

## Usage

```jsx
<RangeFacet
  title="Publication Year"
  agg={{ aggName: "years" }}
  rangeSeparator=".."
  // optional
  defaultRanges={[
    { label: "Last 1 year", type: "years", value: 1 },
    { label: "Last 5 years", type: "years", value: 5 },
    { label: "Last 6 months", type: "months", value: 6 },
  ]}
  enableCustomRange
  // customize custom-range labels and placeholders
  customDatesLabel="Pick dates"
  dateRangeToLabel="–"
  datePlaceholders={{ YYYY: "Year", MM: "Mo", DD: "Day" }}
/>
```

## Aggregation format

The component expects the aggregation result under `results.aggregations[aggName].buckets`
with a numeric `key` (or `key_as_string`) and `doc_count`:

```json
{
  "years": {
    "buckets": [
      { "key": 2021, "doc_count": 12 },
      { "key": 2022, "doc_count": 7 }
    ]
  }
}
```

## Filters format

The selected filter is stored as `[ "<aggName>", "<from><rangeSeparator><to>" ]`.
`<from>` and `<to>` can be `YYYY` or full ISO dates (`YYYY-MM-DD`) when custom ranges
include months/days.

## Props

* **title** `String`

  The title rendered in the card header.

* **agg** `Object`

  An object that describes the aggregation to read from `results`:

  * **aggName** `String`: the aggregation name to look for in `results`

* **rangeSeparator** `String`

  The separator used when building the filter value (for example `..` or `--`).

* **defaultRanges** `Array` *optional*

  Default ranges rendered as checkboxes. Each entry should have:

  * **label** `String`
  * **type** `String`: `"years"` or `"months"`
  * **value** `Number`: number of years/months back

* **enableCustomRange** `Boolean` *optional*

  When `true`, enables the custom date range checkbox with optional month/day inputs.

* **customDatesLabel** `String` *optional*

  Label for the button that expands the custom date inputs (year/month/day). Default: `"Custom Dates"`.

* **dateRangeToLabel** `String` *optional*

  Text shown between the "from" and "to" date inputs. Default: `"to"`.

* **datePlaceholders** `Object` *optional*

  Placeholder text for the date input fields. Only keys you provide are used; others keep their defaults. Keys: `YYYY`, `MM`, `DD`. Example: `{ YYYY: "Year", MM: "Mo", DD: "Day" }`. Default placeholders when not set: `"YYYY"`, `"MM"`, `"DD"`.

* **histogramHeight** `Number` *optional*

  Height in pixels for the histogram area.

* **overridableId** `String` *optional*

  Optional string to define a specific overridable id.

## Usage when overriding

### Overriding full component

Use this when you want to replace the whole `RangeFacet` logic and UI.

Brief flow (matches the default behavior):

1. Read buckets from `currentResultsState.data.aggregations[agg.aggName].buckets`.
2. Compute `min/max` years from bucket keys.
3. Compute the histogram data with aggregation keys and doc counts.
4. Store the selected range in `currentQueryState.filters` as:
   `[agg.aggName, `${from}${rangeSeparator}${to}`]`.
5. Render your own UI (histogram/slider/etc).

Example with only histogram and custom filter facet:

```jsx
class MyRangeFacet extends React.Component {
  constructor(props) {
    super(props);
    const { min, max } = this.getMinMax();
    this.state = { range: [min, max], activeFilter: null };
  }

  applyRange = (from, to) => {
    // Apply the filter
  };

  onBarClick = (year) => {
    this.applyRange(year, year);
  };

  onClear = () => {
    // Clear the filter
  };

  getBuckets = () => {
    const { currentResultsState, agg } = this.props;
    const resultsAggregations = currentResultsState?.data?.aggregations;
    return resultsAggregations?.[agg.aggName]?.buckets ?? [];
  };

  render() {
    const { title, agg, rangeSeparator, currentQueryState, histogramHeight } =
      this.props;
    const { min, max } = this.getMinMax();
    const hasActiveFilter;
    // Extract the buckets in aggregations
    const buckets = getBuckets();
    // Active filter range: [from(year), to(year)]
    const { range } = this.state

    const containerCmp = (
      <>
        <RangeHistogram
          data={
            // Extract key and doc_count from agg into a map, then fill every year with the count.
            getHistogramData(buckets, min, max)
          }
          range={range}
          height={histogramHeight}
          onBarClick={this.onBarClick}
        />
        <RangeCustomFilter
          min={min}
          max={max}
          value={range}
          rangeSeparator={rangeSeparator}
          activeMode={RANGE_MODES.CUSTOM}
          activeFilter={this.state.activeFilter}
          onApply={(r, s) => this.applyRange(r[0], r[1])}
          onClear={this.onClear}
        />
      </>
    );

    return (
      <RangeFacetElement
        title={title}
        containerCmp={containerCmp}
        hasActiveFilter={hasActiveFilter}
        onClear={this.onClear}
      />
    );
  }
}

const overriddenComponents = {
  RangeFacet: MyRangeFacet,
};
```

### Overriding the element

Wraps the default content and lets you customize the header or layout while keeping
the built-in histogram/slider/custom filters.

```jsx
const MyRangeFacetElement = ({ title, containerCmp, hasActiveFilter, onClear }) => {
  return (
    <section>
      <header>
        <strong>{title}</strong>
        {hasActiveFilter && (
          <button type="button" onClick={onClear}>
            Clear
          </button>
        )}
      </header>
      {containerCmp}
    </section>
  );
};

const overriddenComponents = {
  "RangeFacet.element": MyRangeFacetElement,
};
```

### Overriding the histogram

Replace the histogram visualization. Use `data` and `range` to show counts and
highlight the selected years. Call `onBarClick(year)` to update the range.

```jsx
const MyRangeHistogram = ({ data, range, onBarClick }) => {
  return (
    <ul>
      {data.map((item) => {
        ...
      })}
    </ul>
  );
};

const overriddenComponents = {
  "RangeFacet.Histogram.element": MyRangeHistogram,
};
```

#### Tooltip override (histogram)

The histogram tooltip is its own overridable element. The `tooltip` value has the
shape `{ year, count, x, y }` where `x/y` are viewport coordinates used to position
the tooltip.

```jsx
const MyHistogramTooltip = ({ tooltip }) => {
  if (!tooltip) return null;
  return (
    <div>
      {tooltip.year}: {tooltip.count}
    </div>
  );
};

const overriddenComponents = {
  "RangeFacet.Histogram.Tooltip.element": MyHistogramTooltip,
};
```

### Overriding the slider

Replace the range slider. Call `onChange([min, max])` when the selected range changes.

```jsx
const MyRangeSlider = ({ min, max, value, onChange }) => {
  ...
};

const overriddenComponents = {
  "RangeFacet.Slider.element": MyRangeSlider,
};
```

### Overriding the default filters

Replace the default ranges list. Call `onToggle(range, checked)` to select or clear
a range option.

```jsx
const MyDefaultFilters = ({ ranges, activeLabel, onToggle }) => {
  ...
};

const overriddenComponents = {
  "RangeFacet.DefaultFilters.element": MyDefaultFilters,
};
```

### Overriding the custom filter

Replace the custom range checkbox and inputs wrapper. Use `checked/expanded` to
control layout and render `dateError` when validation fails.

```jsx
const MyCustomFilter = ({ checked, expanded, dateError, activeFilter, children }) => {
  ...
};

const overriddenComponents = {
  "RangeFacet.CustomFilter.element": MyCustomFilter,
};
```

### Overriding the date range inputs (for custom filter)

Replace the date input layout for the custom filter. Use `format` to decide which
parts to render and `values` to populate them.

```jsx
const MyDateRangeInputs = ({ format, values, disabled, children }) => {
  ...
};

const overriddenComponents = {
  "RangeFacet.DateInputs.Layout": MyDateRangeInputs,
};
```

`format` controls the input structure:

- `YYYY` renders a single row with year-only inputs.
- `YYYY-MM` and `YYYY-MM-DD` render stacked rows for from/to values.

### RangeFacet parameters

Component that wraps the histogram, slider, and optional filters.

* **title** `String`

  The title to render.

* **containerCmp** `React component`

  The rendered content (histogram, slider, and filters).

* **hasActiveFilter** `Boolean`

  `true` if a range filter is active, `false` otherwise.

* **onClear** `Function`

  Function to call to clear the active range filter.

## Callback methods used by overrides

* **onClear** `Function`

  Clears the active range filter and resets to the full available range.

* **onBarClick** `Function`

  Accepts a `year` and updates the range to that single year.

* **onChange** `Function`

  Accepts `[from, to]` to update the selected range (used by slider overrides).

* **onToggle** `Function`

  Accepts `(range, checked)` to select a default range or clear it.

## Utilities

Helpers from `src/lib/components/RangeFacet/utils.js` used by `RangeFacet` and its sub-components.

* **extractBuckets(resultsAggregations, aggName)**: read aggregation buckets safely.
* **getKey(bucket)**: returns `key_as_string` when present, otherwise `key`.
* **getHistogramData(buckets, min, max)**: build continuous year data with counts.
* **resolveDefaultRange(range, min, max, rangeSeparator)**: compute the year range
  and optional ISO date range for a default option.
* **normalizeFilterValue(filterValue, rangeSeparator, minYear, maxYear)**: sanitize
  and normalize a filter string like `YYYY..YYYY` or ISO dates.
* **parseFilterYears(filterValue, rangeSeparator)**: parse years from a filter
  string (supports ISO dates).
* **findDefaultLabel(defaultRanges, filterValue, min, max, rangeSeparator)**:
  match an active filter to a default range label.
* **buildDateRange({ fromYear, fromMonth, fromDay, toYear, toMonth, toDay, rangeSeparator })**:
  build a `YYYY..YYYY` or ISO `YYYY-MM-DD..YYYY-MM-DD` string.
* **RANGE_MODES**: enum with `DEFAULT` and `CUSTOM` used for optional default and custom filters.
