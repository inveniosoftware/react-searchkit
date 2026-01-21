/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import "./RangeFacet.scss";

import _debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React from "react";
import Overridable from "react-overridable";
import { Card } from "semantic-ui-react";
import { withState } from "../HOC";
import { AppContext } from "../ReactSearchKit";
import RangeDefaultFilters from "./RangeDefaultFilters";
import RangeCustomFilter from "./RangeCustomFilter";
import RangeHistogram from "./RangeHistogram";
import RangeSlider from "./RangeSlider";
import {
  RANGE_MODES,
  extractBuckets,
  findDefaultLabel,
  getHistogramData,
  parseFilterYears,
  getKey,
  normalizeFilterValue,
} from "./utils";

class RangeFacet extends React.Component {
  constructor(props) {
    super(props);

    const { min, max } = this.getMinMax();

    this.state = {
      range: [min, max],
      activeMode: null,
      activeFilter: null,
    };

    this.debouncedUpdateQuery = _debounce((newRange, dateRangeString) => {
      const { agg, rangeSeparator, updateQueryState, currentQueryState } = this.props;
      const [from, to] = [...newRange].sort();
      const filters = (currentQueryState.filters || []).filter(
        (f) => Array.isArray(f) && f[0] !== agg.aggName
      );

      // Use dateRangeString if provided (from custom filter), otherwise use year-only format
      const filterValue = dateRangeString || `${from}${rangeSeparator}${to}`;

      updateQueryState({
        ...currentQueryState,
        filters: [...filters, [agg.aggName, filterValue]],
      });
    }, 500);
  }

  componentDidMount() {
    this.syncStateWithFilters();
  }

  componentDidUpdate(prevProps) {
    const {
      currentQueryState,
      agg,
      defaultRanges,
      enableCustomRange,
      rangeSeparator,
      currentResultsState,
    } = this.props;
    if (
      prevProps.currentQueryState.filters !== currentQueryState.filters ||
      prevProps.agg.aggName !== agg.aggName ||
      prevProps.defaultRanges !== defaultRanges ||
      prevProps.enableCustomRange !== enableCustomRange ||
      prevProps.rangeSeparator !== rangeSeparator ||
      prevProps.currentResultsState !== currentResultsState
    ) {
      this.syncStateWithFilters();
    }
  }

  componentWillUnmount() {
    if (this.debouncedUpdateQuery?.cancel) {
      this.debouncedUpdateQuery.cancel();
    }
  }

  getBuckets = () => {
    const { currentResultsState, agg } = this.props;
    const resultsAggregations = currentResultsState?.data?.aggregations;
    return extractBuckets(resultsAggregations, agg.aggName);
  };

  getMinMax = () => {
    const buckets = this.getBuckets();
    const years = buckets
      .map((b) => Number(getKey(b)))
      .filter((v) => Number.isInteger(v));
    const min = years.length > 0 ? Math.min(...years) : 0;
    const max = years.length > 0 ? Math.max(...years) : 0;
    return { min, max };
  };

  syncStateWithFilters = () => {
    const { agg, currentQueryState, defaultRanges, rangeSeparator } = this.props;
    const { min, max } = this.getMinMax();

    const filter = (currentQueryState.filters || []).find(
      (f) => Array.isArray(f) && f[0] === agg.aggName
    );

    if (!filter) {
      this.setState({
        range: [min, max],
        activeMode: null,
        activeFilter: null,
      });
      return;
    }

    // Parse filter value - can be "YYYY to YYYY" or "YYYY-MM-DD to YYYY-MM-DD"
    const filterValue = filter[1];
    const normalizedFilterValue = normalizeFilterValue(
      filterValue,
      rangeSeparator,
      min,
      max
    );
    const parsedFilter = parseFilterYears(normalizedFilterValue, rangeSeparator);
    if (!parsedFilter) {
      this.setState({
        range: [min, max],
        activeMode: null,
        activeFilter: null,
      });
      return;
    }
    const [fromPart, toPart] = normalizedFilterValue.split(rangeSeparator);
    const hasDateDetail =
      (fromPart && fromPart.trim().length > 4) || (toPart && toPart.trim().length > 4);

    const from = Math.max(parsedFilter.fromYear, min);
    const to = Math.min(parsedFilter.toYear, max);

    const defaultLabel = findDefaultLabel(
      defaultRanges,
      normalizedFilterValue,
      min,
      max,
      rangeSeparator
    );
    // Active default label
    if (defaultLabel) {
      this.setState({
        range: [from, to],
        activeMode: RANGE_MODES.DEFAULT,
        activeFilter: normalizedFilterValue,
      });
      // Active custom filter
    } else if (hasDateDetail) {
      this.setState({
        range: [from, to],
        activeMode: RANGE_MODES.CUSTOM,
        activeFilter: normalizedFilterValue,
      });
    } else {
      this.setState({
        range: [from, to],
        activeMode: RANGE_MODES.CUSTOM,
        activeFilter: null,
      });
    }
  };

  onRangeChange = (newRange, dateRangeString = null) => {
    const sorted = [...newRange].sort((a, b) => a - b);
    this.setState({ range: sorted });
    this.debouncedUpdateQuery(sorted, dateRangeString);
  };

  onBarClick = (year) => {
    this.setState({ activeMode: null });
    this.onRangeChange([year, year]);
  };

  clearRangeFilter = () => {
    const { agg, currentQueryState, updateQueryState } = this.props;
    const { min, max } = this.getMinMax();

    this.setState({ range: [min, max], activeFilter: null });

    const filters = (currentQueryState.filters || []).filter(
      (f) => Array.isArray(f) && f[0] !== agg.aggName
    );

    updateQueryState({
      ...currentQueryState,
      filters,
    });
  };

  onApply = (activeMode, newRange, dateRangeString) => {
    const { rangeSeparator } = this.props;
    const [from, to] = [...newRange].sort((a, b) => a - b);
    const activeFilter = dateRangeString || `${from}${rangeSeparator}${to}`;
    this.setState({ activeMode, activeFilter });
    this.onRangeChange(newRange, dateRangeString);
  };
  onClear = () => {
    this.setState({ activeMode: null, activeFilter: null });
    this.clearRangeFilter();
  };

  render() {
    const {
      title,
      defaultRanges,
      enableCustomRange,
      rangeSeparator,
      currentQueryState,
      agg,
      overridableId,
      histogramHeight,
      customDatesLabel,
      dateRangeToLabel,
      datePlaceholders,
    } = this.props;
    const { range, activeMode, activeFilter } = this.state;
    const { min, max } = this.getMinMax();
    const buckets = this.getBuckets();
    const data = getHistogramData(buckets, min, max);
    const hasActiveFilter = (currentQueryState?.filters || []).some(
      (f) => Array.isArray(f) && f[0] === agg.aggName
    );

    const hasResults = data.some((d) => d.count > 0);
    if (!data.length || !hasResults) return null;
    const containerCmp = (
      <>
        <RangeHistogram
          data={data}
          range={range}
          height={histogramHeight}
          onBarClick={this.onBarClick}
          overridableId={overridableId}
        />
        <RangeSlider
          min={min}
          max={max}
          value={range}
          onChange={(r) => this.onApply(null, r, null)}
          overridableId={overridableId}
        />
        {defaultRanges && (
          <RangeDefaultFilters
            ranges={defaultRanges}
            min={min}
            max={max}
            rangeSeparator={rangeSeparator}
            activeFilter={activeFilter}
            activeMode={activeMode}
            onSelect={(r, s) => this.onApply(RANGE_MODES.DEFAULT, r, s)}
            onClear={this.onClear}
            overridableId={overridableId}
          />
        )}
        {enableCustomRange && (
          <RangeCustomFilter
            min={min}
            max={max}
            value={range}
            rangeSeparator={rangeSeparator}
            activeMode={activeMode}
            activeFilter={activeFilter}
            onApply={(r, s) => this.onApply(RANGE_MODES.CUSTOM, r, s)}
            onClear={this.onClear}
            overridableId={overridableId}
            customDatesLabel={customDatesLabel}
            dateRangeToLabel={dateRangeToLabel}
            datePlaceholders={datePlaceholders}
          />
        )}
      </>
    );
    return (
      <RangeFacetElement
        title={title}
        containerCmp={containerCmp}
        hasActiveFilter={hasActiveFilter}
        onClear={this.onClear}
        overridableId={overridableId}
      />
    );
  }
}

RangeFacet.propTypes = {
  title: PropTypes.string.isRequired,
  agg: PropTypes.shape({
    aggName: PropTypes.string.isRequired,
  }).isRequired,
  defaultRanges: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["years", "months"]).isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  enableCustomRange: PropTypes.bool,
  rangeSeparator: PropTypes.string.isRequired,
  currentQueryState: PropTypes.shape({
    filters: PropTypes.array,
  }).isRequired,
  currentResultsState: PropTypes.shape({
    data: PropTypes.shape({
      aggregations: PropTypes.object,
    }),
  }).isRequired,
  overridableId: PropTypes.string,
  histogramHeight: PropTypes.number,
  updateQueryState: PropTypes.func.isRequired,
  customDatesLabel: PropTypes.string,
  dateRangeToLabel: PropTypes.string,
  datePlaceholders: PropTypes.shape({
    YYYY: PropTypes.string,
    MM: PropTypes.string,
    DD: PropTypes.string,
  }),
};

RangeFacet.defaultProps = {
  defaultRanges: [],
  enableCustomRange: false,
  overridableId: "",
  histogramHeight: 100,
  customDatesLabel: "Custom Dates",
  dateRangeToLabel: "to",
  datePlaceholders: undefined,
};

RangeFacet.contextType = AppContext;

export default Overridable.component("RangeFacet", withState(RangeFacet));

const RangeFacetElement = ({
  title,
  containerCmp,
  hasActiveFilter,
  onClear,
  overridableId,
}) => {
  const { buildUID } = React.useContext(AppContext);

  return (
    containerCmp && (
      <Overridable
        id={buildUID("RangeFacet.element", overridableId)}
        title={title}
        hasActiveFilter={hasActiveFilter}
        onClear={onClear}
        containerCmp={containerCmp}
      >
        <Card>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
          <Card.Content>{containerCmp}</Card.Content>
        </Card>
      </Overridable>
    )
  );
};

RangeFacetElement.propTypes = {
  title: PropTypes.string.isRequired,
  containerCmp: PropTypes.node,
  hasActiveFilter: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

RangeFacetElement.defaultProps = {
  containerCmp: null,
  overridableId: "",
};
