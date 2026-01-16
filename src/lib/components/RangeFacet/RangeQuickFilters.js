/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { Checkbox, List } from "semantic-ui-react";
import PropTypes from "prop-types";

export function resolveQuickRange(range, min, max, rangeSeparator) {
  const { type, value } = range;

  if (type === "years") {
    return [Math.max(min, max - value + 1), max];
  }

  if (type === "months") {
    // Calculate actual months back from max date
    const maxDate = new Date(max, 11, 31);
    const fromDate = new Date(maxDate);
    fromDate.setMonth(fromDate.getMonth() - value + 1);
    fromDate.setDate(1);

    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth() + 1;
    const toYear = max;
    const toMonth = 12;
    const toDay = 31;

    // Build date range string: YYYY-MM-DD to YYYY-MM-DD
    const finalFromYear = Math.max(min, fromYear);
    const dateRangeString = `${finalFromYear}-${String(fromMonth).padStart(
      2,
      "0"
    )}-01${rangeSeparator}${toYear}-${String(toMonth).padStart(2, "0")}-${String(
      toDay
    ).padStart(2, "0")}`;

    return {
      yearRange: [finalFromYear, toYear],
      dateRangeString,
    };
  }

  return null;
}
class RangeQuickFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLabel: null,
    };
  }

  componentDidMount() {
    this.syncActiveLabel();
  }

  componentDidUpdate(prevProps) {
    const { activeMode, activeLabel } = this.props;
    if (prevProps.activeMode !== activeMode || prevProps.activeLabel !== activeLabel) {
      this.syncActiveLabel();
    }
  }

  syncActiveLabel = () => {
    const { activeMode, activeLabel: externalActiveLabel } = this.props;
    const { activeLabel } = this.state;

    if (activeMode !== "quick") {
      if (activeLabel !== null) {
        this.setState({ activeLabel: null });
      }
      return;
    }

    if (externalActiveLabel && externalActiveLabel !== activeLabel) {
      this.setState({ activeLabel: externalActiveLabel });
    }
  };

  handleToggle = (range, checked) => {
    const { min, max, rangeSeparator, onSelect, onClear } = this.props;

    if (checked) {
      this.setState({ activeLabel: null });
      onClear();
      return;
    }

    const resolved = resolveQuickRange(range, min, max, rangeSeparator);
    if (resolved) {
      this.setState({ activeLabel: range.label });
      if (typeof resolved === "object" && resolved.yearRange) {
        onSelect(resolved.yearRange, resolved.dateRangeString);
      } else {
        onSelect(resolved);
      }
    }
  };

  render() {
    const { ranges } = this.props;
    const { activeLabel } = this.state;

    if (!ranges?.length) return null;

    return (
      <List>
        {ranges.map((range) => {
          const checked = activeLabel === range.label;

          return (
            <List.Item key={range.label}>
              <Checkbox
                label={range.label}
                checked={checked}
                onChange={() => this.handleToggle(range, checked)}
              />
            </List.Item>
          );
        })}
      </List>
    );
  }
}

RangeQuickFilters.propTypes = {
  ranges: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["years", "months"]).isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  rangeSeparator: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  activeMode: PropTypes.oneOf(["quick", "custom", null]),
  activeLabel: PropTypes.string,
};

RangeQuickFilters.defaultProps = {
  activeMode: null,
  activeLabel: null,
};

export default RangeQuickFilters;
