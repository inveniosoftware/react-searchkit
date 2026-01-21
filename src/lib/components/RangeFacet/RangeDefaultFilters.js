/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, useContext } from "react";
import { Checkbox, List } from "semantic-ui-react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { RANGE_MODES, resolveDefaultRange, findDefaultLabel } from "./utils";
import { AppContext } from "../ReactSearchKit";

class RangeDefaultFilters extends Component {
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
    const { activeMode, activeFilter } = this.props;
    if (
      prevProps.activeMode !== activeMode ||
      prevProps.activeFilter !== activeFilter
    ) {
      this.syncActiveLabel();
    }
  }

  syncActiveLabel = () => {
    const { activeMode, activeFilter, ranges, min, max, rangeSeparator } = this.props;

    if (activeMode !== RANGE_MODES.DEFAULT || !activeFilter) {
      this.setState({ activeLabel: null });
      return;
    }

    const defaultLabel = findDefaultLabel(
      ranges,
      activeFilter,
      min,
      max,
      rangeSeparator
    );
    this.setState({ activeLabel: defaultLabel ?? null });
  };

  handleToggle = (range, checked) => {
    const { min, max, rangeSeparator, onSelect, onClear } = this.props;

    if (checked) {
      this.setState({ activeLabel: null });
      onClear();
      return;
    }

    const resolved = resolveDefaultRange(range, min, max, rangeSeparator);
    if (resolved) {
      this.setState({ activeLabel: range.label });
      onSelect(resolved.yearRange, resolved.dateRangeString);
    }
  };

  render() {
    const { ranges, overridableId } = this.props;
    const { activeLabel } = this.state;

    if (ranges.length === 0) return null;

    return (
      <RangeDefaultFiltersElement
        ranges={ranges}
        activeLabel={activeLabel}
        onToggle={this.handleToggle}
        overridableId={overridableId}
      />
    );
  }
}
RangeDefaultFilters.propTypes = {
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
  activeMode: PropTypes.oneOf([RANGE_MODES.DEFAULT, RANGE_MODES.CUSTOM, null]),
  activeFilter: PropTypes.string,
  overridableId: PropTypes.string,
};

RangeDefaultFilters.defaultProps = {
  activeMode: null,
  activeFilter: null,
  overridableId: "",
};

const RangeDefaultFiltersElement = ({
  ranges,
  activeLabel,
  onToggle,
  overridableId,
}) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("RangeFacet.DefaultFilters.element", overridableId)}
      ranges={ranges}
      activeLabel={activeLabel}
    >
      <List>
        {ranges.map((range) => {
          const checked = activeLabel === range.label;

          return (
            <List.Item key={range.label}>
              <Checkbox
                label={range.label}
                checked={checked}
                onChange={() => onToggle(range, checked)}
              />
            </List.Item>
          );
        })}
      </List>
    </Overridable>
  );
};

RangeDefaultFiltersElement.propTypes = {
  ranges: PropTypes.array.isRequired,
  activeLabel: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

RangeDefaultFiltersElement.defaultProps = {
  activeLabel: null,
  overridableId: "",
};

export default Overridable.component("RangeFacet.DefaultFilters", RangeDefaultFilters);
