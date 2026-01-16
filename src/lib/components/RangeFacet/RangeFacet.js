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
import { Card, Icon, Button } from "semantic-ui-react";
import { withState } from "../HOC";
import RangeQuickFilters, { resolveQuickRange } from "./RangeQuickFilters";
import RangeCustomFilter from "./RangeCustomFilter";
import RangeSlider from "./RangeSlider";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { ParentSize } from "@visx/responsive";

function extractBuckets(resultsAggregations, key) {
  return resultsAggregations?.[key]?.buckets ?? [];
}

function getHistogramData(buckets, min, max) {
  const map = new Map(buckets.map((b) => [Number(b.key_as_string), b.doc_count]));

  const data = [];
  for (let y = min; y <= max; y++) {
    data.push({
      year: y,
      count: map.get(y) ?? 0,
    });
  }
  return data;
}

const CustomTooltip = ({ year, count }) => {
  if (year === null || year === undefined) return null;

  return (
    <div className="range-tooltip">
      {year}: {count}
    </div>
  );
};

CustomTooltip.propTypes = {
  year: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

const MAX_BAR_WIDTH = 30;

class RangeFacet extends React.Component {
  constructor(props) {
    super(props);

    const { min, max } = this.getMinMax(props);

    this.state = {
      range: [min, max],
      hoveredYear: null,
      tooltip: null,
      activeMode: null,
      activeQuickLabel: null,
    };

    this.debouncedUpdateQuery = _debounce((newRange, dateRangeString, queryState) => {
      const { agg, rangeSeparator, updateQueryState } = this.props;
      const [from, to] = [...newRange].sort();
      const filters = (queryState.filters || []).filter(
        (f) => Array.isArray(f) && f[0] !== agg.aggName
      );

      // Use dateRangeString if provided (from custom filter), otherwise use year-only format
      const filterValue = dateRangeString || `${from}${rangeSeparator}${to}`;

      updateQueryState({
        ...queryState,
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
      quickRanges,
      enableCustomRange,
      rangeSeparator,
      currentResultsState,
    } = this.props;
    if (
      prevProps.currentQueryState.filters !== currentQueryState.filters ||
      prevProps.agg.aggName !== agg.aggName ||
      prevProps.quickRanges !== quickRanges ||
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

  getBuckets = (props = this.props) => {
    const { currentResultsState, agg } = props;
    const resultsAggregations = currentResultsState?.data?.aggregations;
    return extractBuckets(resultsAggregations, agg.aggName);
  };

  getMinMax = (props = this.props) => {
    const buckets = this.getBuckets(props);
    const years = buckets.map((b) => Number(b.key_as_string));
    const min = years.length ? Math.min(...years) : 0;
    const max = years.length ? Math.max(...years) : 0;
    return { min, max };
  };

  syncStateWithFilters = () => {
    const { agg, currentQueryState, quickRanges, enableCustomRange, rangeSeparator } =
      this.props;
    const { min, max } = this.getMinMax();
    const { range, activeMode: stateActiveMode, activeQuickLabel } = this.state;

    const filter = (currentQueryState.filters || []).find(
      (f) => Array.isArray(f) && f[0] === agg.aggName
    );

    if (!filter) {
      if (
        range[0] !== min ||
        range[1] !== max ||
        stateActiveMode !== null ||
        activeQuickLabel !== null
      ) {
        this.setState({
          range: [min, max],
          activeMode: null,
          activeQuickLabel: null,
        });
      }
      return;
    }

    // Parse filter value - can be "YYYY to YYYY" or "YYYY-MM-DD to YYYY-MM-DD"
    const filterValue = filter[1];
    const [fromPart, toPart] = filterValue.split(rangeSeparator);

    const fromYear = Number(fromPart.split("-")[0]);
    const toYear = Number(toPart.split("-")[0]);

    const from = Math.max(fromYear, min);
    const to = Math.min(toYear, max);

    const quickLabel =
      quickRanges?.find((rangeOption) => {
        const resolved = resolveQuickRange(rangeOption, min, max, rangeSeparator);
        if (!resolved) return false;

        if (typeof resolved === "object" && resolved.dateRangeString) {
          return filterValue === resolved.dateRangeString;
        }

        if (Array.isArray(resolved) && resolved.length === 2) {
          return filterValue === `${resolved[0]}${rangeSeparator}${resolved[1]}`;
        }

        return false;
      })?.label ?? null;

    let activeMode = null;
    if (quickLabel) {
      activeMode = "quick";
    } else if (enableCustomRange) {
      activeMode = "custom";
    }

    if (
      from !== range[0] ||
      to !== range[1] ||
      activeMode !== stateActiveMode ||
      quickLabel !== activeQuickLabel
    ) {
      this.setState({
        range: [from, to],
        activeMode,
        activeQuickLabel: quickLabel,
      });
    }
  };

  onRangeChange = (newRange, dateRangeString = null) => {
    const { currentQueryState } = this.props;
    const sorted = [...newRange].sort((a, b) => a - b);
    this.setState({ range: sorted });
    this.debouncedUpdateQuery(sorted, dateRangeString, currentQueryState);
  };

  onBarClick = (year) => {
    this.setState({ activeMode: null });
    this.onRangeChange([year, year]);
  };

  clearRangeFilter = () => {
    const { agg, currentQueryState, updateQueryState } = this.props;
    const { min, max } = this.getMinMax();

    this.setState({ range: [min, max] });

    const filters = (currentQueryState.filters || []).filter(
      (f) => Array.isArray(f) && f[0] !== agg.aggName
    );

    updateQueryState({
      ...currentQueryState,
      filters,
    });
  };

  render() {
    const {
      title,
      quickRanges,
      enableCustomRange,
      rangeSeparator,
      currentQueryState,
      agg,
    } = this.props;
    const { range, hoveredYear, tooltip, activeMode, activeQuickLabel } = this.state;
    const { min, max } = this.getMinMax();
    const buckets = this.getBuckets();
    const data = getHistogramData(buckets, min, max);
    const hasActiveFilter = (currentQueryState?.filters || []).some(
      (f) => Array.isArray(f) && f[0] === agg.aggName
    );

    if (!data.length) return null;

    const hasResults = data.some((d) => d.count > 0);

    if (!hasResults) return null;

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <div className="range-header">
              <span>{title}</span>

              <Button
                icon
                basic
                size="mini"
                onClick={this.clearRangeFilter}
                disabled={!hasActiveFilter && range[0] === min && range[1] === max}
                aria-label="Reset date filter"
              >
                <Icon name="undo" />
              </Button>
            </div>
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <ParentSize>
            {({ width }) => {
              const height = 100;

              const xScale = scaleBand({
                domain: data.map((d) => d.year),
                range: [0, width],
                padding: 0.1,
              });

              const yScale = scaleLinear({
                domain: [0, Math.max(...data.map((d) => d.count))],
                range: [height, 0],
                nice: true,
              });

              return (
                <>
                  {/* Histogram */}
                  <svg width={width} height={height}>
                    {data.map((d) => {
                      const selected = d.year >= range[0] && d.year <= range[1];
                      const rawWidth = xScale.bandwidth();
                      const barWidth = Math.min(rawWidth, MAX_BAR_WIDTH);
                      // Center the bar
                      const barX = xScale(d.year) + (rawWidth - barWidth) / 2;
                      return (
                        <Bar
                          key={d.year}
                          x={barX}
                          y={yScale(d.count)}
                          width={barWidth}
                          height={height - yScale(d.count)}
                          className={[
                            "range-histogram-bar",
                            selected && "is-selected",
                            hoveredYear === d.year && "is-hovered",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => this.onBarClick(d.year)}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            this.setState({
                              hoveredYear: d.year,
                              tooltip: {
                                year: d.year,
                                count: d.count,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              },
                            });
                          }}
                          onMouseLeave={() => {
                            this.setState({ hoveredYear: null, tooltip: null });
                          }}
                        />
                      );
                    })}
                  </svg>
                  {/* Slider */}
                  <RangeSlider
                    min={min}
                    max={max}
                    value={range}
                    onChange={(newRange) => {
                      this.setState({ activeMode: null });
                      this.onRangeChange(newRange);
                    }}
                  />
                  {quickRanges && (
                    <div className="range-section range-section--quick">
                      <RangeQuickFilters
                        ranges={quickRanges}
                        min={min}
                        max={max}
                        rangeSeparator={rangeSeparator}
                        activeLabel={activeQuickLabel}
                        onSelect={(r, dateRangeString) => {
                          this.setState({ activeMode: "quick" });
                          this.onRangeChange(r, dateRangeString);
                        }}
                        onClear={() => {
                          this.setState({ activeMode: null });
                          this.clearRangeFilter();
                        }}
                        activeMode={activeMode}
                      />
                    </div>
                  )}
                  {enableCustomRange && (
                    <div className="range-section range-section--custom">
                      <RangeCustomFilter
                        min={min}
                        max={max}
                        value={range}
                        rangeSeparator={rangeSeparator}
                        onApply={(r, dateRangeString) => {
                          this.setState({ activeMode: "custom" });
                          this.onRangeChange(r, dateRangeString);
                        }}
                        onClear={() => {
                          this.setState({ activeMode: null });
                          this.clearRangeFilter();
                        }}
                        activeMode={activeMode}
                      />
                    </div>
                  )}
                </>
              );
            }}
          </ParentSize>
          {tooltip && (
            <div
              className="range-tooltip-wrapper"
              style={{
                left: tooltip.x,
                top: tooltip.y,
              }}
            >
              <CustomTooltip year={tooltip.year} count={tooltip.count} />
            </div>
          )}
        </Card.Content>
      </Card>
    );
  }
}

RangeFacet.propTypes = {
  title: PropTypes.string.isRequired,
  agg: PropTypes.shape({
    aggName: PropTypes.string.isRequired,
  }).isRequired,
  quickRanges: PropTypes.array,
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
  updateQueryState: PropTypes.func.isRequired,
};

RangeFacet.defaultProps = {
  quickRanges: [],
  enableCustomRange: false,
};
export default withState(RangeFacet);
