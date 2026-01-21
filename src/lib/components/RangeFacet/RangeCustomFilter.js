/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { DateTime } from "luxon";
import { Checkbox, Button, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { RANGE_MODES, buildDateRange } from "./utils";
import DateRangeInputs from "./DateRangeInputs";
import { AppContext } from "../ReactSearchKit";

class RangeCustomFilter extends React.Component {
  constructor(props) {
    super(props);
    const { min, max, value } = props;

    this.state = {
      checked: false,
      expanded: false,
      fromYear: value[0] ?? min,
      toYear: value[1] ?? max,
      fromMonth: null,
      fromDay: null,
      toMonth: null,
      toDay: null,
      dateError: null,
    };
  }

  componentDidMount() {
    this.syncFromProps();
    this.syncActiveFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMode, activeFilter, value, min, max } = this.props;
    const { checked } = this.state;

    if (prevProps.activeMode !== activeMode) {
      this.syncActiveMode();
    }

    if (
      prevProps.activeMode !== activeMode ||
      prevProps.activeFilter !== activeFilter
    ) {
      this.syncActiveFilter();
    }

    if (activeMode !== RANGE_MODES.CUSTOM && checked && prevProps.value !== value) {
      this.clearState();
    }

    if (
      prevProps.value !== value ||
      prevProps.min !== min ||
      prevProps.max !== max ||
      prevState.checked !== checked
    ) {
      this.syncFromProps();
    }
  }

  clearState = () => {
    this.setState({
      checked: false,
      expanded: false,
      fromMonth: null,
      fromDay: null,
      toMonth: null,
      toDay: null,
      dateError: null,
    });
  };

  syncActiveMode = () => {
    const { activeMode } = this.props;
    const { checked, expanded } = this.state;

    if (activeMode !== RANGE_MODES.CUSTOM && (checked || expanded)) {
      this.clearState();
    }
  };

  syncFromProps = () => {
    const { value, min, max, activeMode, activeFilter } = this.props;

    // If custom mode is active and have a filter
    if (activeMode === RANGE_MODES.CUSTOM && activeFilter) return;

    this.setState({
      fromYear: String(value[0] ?? min),
      toYear: String(value[1] ?? max),
    });
  };

  syncActiveFilter = () => {
    const { activeMode, activeFilter, rangeSeparator } = this.props;
    if (activeMode !== RANGE_MODES.CUSTOM || !activeFilter) return;

    const [fromPart, toPart] = activeFilter.split(rangeSeparator);
    const parse = (value) => {
      const dt = DateTime.fromISO(value);
      if (!dt.isValid) return null;
      return {
        year: String(dt.year),
        month: value.length >= 7 ? String(dt.month).padStart(2, "0") : null,
        day: value.length >= 10 ? String(dt.day).padStart(2, "0") : null,
      };
    };

    const from = parse(fromPart);
    const to = parse(toPart);
    if (!from || !to) return;
    // Expand if there is more than year
    const { expanded } = this.state;
    const expand = expanded || from.month || from.day || to.month || to.day;

    this.setState({
      checked: true,
      expanded: expand,
      fromYear: from.year,
      toYear: to.year,
      fromMonth: from.month,
      fromDay: from.day,
      toMonth: to.month,
      toDay: to.day,
      dateError: null,
    });
  };

  handleNumericChange = (value, field, maxLength) => {
    if (value === null || new RegExp(`^\\d{0,${maxLength}}$`).test(value)) {
      this.setState({ [field]: value, dateError: null });
    }
  };

  validateDates = () => {
    const { min, max } = this.props;
    const { fromYear, toYear, fromMonth, fromDay, toMonth, toDay } = this.state;

    if (String(fromYear).length !== 4 || String(toYear).length !== 4) {
      return this.setError("Year must be 4 digits");
    }

    const from = DateTime.fromObject({
      year: Number(fromYear),
      month: fromMonth ? Number(fromMonth) : 1,
      day: fromDay ? Number(fromDay) : 1,
    });

    const toBase = DateTime.fromObject({
      year: Number(toYear),
      month: toMonth ? Number(toMonth) : 12,
      day: 1,
    });

    const to = toDay ? toBase.set({ day: Number(toDay) }) : toBase.endOf("month");

    if (!from.isValid || !to.isValid) {
      return this.setError("Please enter a valid date");
    }
    if (from.year < min || from.year > max || to.year < min || to.year > max) {
      return this.setError(`Year must be between ${min} and ${max}`);
    }

    if (from > to) {
      return this.setError("Start date must be before end date");
    }
    return true;
  };

  setError = (error) => {
    this.setState({ dateError: error });
    return false;
  };

  applyRange = () => {
    const { checked, fromYear, fromMonth, fromDay, toYear, toMonth, toDay } =
      this.state;
    const { rangeSeparator, onApply } = this.props;

    if (!checked || !this.validateDates()) return;

    const dateRangeString = buildDateRange({
      fromYear,
      fromMonth,
      fromDay,
      toYear,
      toMonth,
      toDay,
      rangeSeparator,
    });

    if (!dateRangeString) return;

    const [fromISO, toISO] = dateRangeString.split(rangeSeparator);
    onApply(
      [DateTime.fromISO(fromISO).year, DateTime.fromISO(toISO).year],
      dateRangeString
    );
  };

  toggleChecked = () => {
    const { checked } = this.state;
    const { onClear } = this.props;
    // Disable the custom filter and clear the filter
    if (checked) {
      this.clearState();
      onClear();
      return;
    }
    // Enable the custom filter
    this.setState({ checked: true });
  };

  renderError = () => {
    const { dateError } = this.state;
    if (!dateError) return null;
    return <Label basic color="red" size="tiny" content={dateError} />;
  };

  render() {
    const { checked, expanded, dateError } = this.state;
    const { fromYear, fromMonth, fromDay, toYear, toMonth, toDay } = this.state;
    const {
      overridableId,
      activeFilter,
      customDatesLabel,
      dateRangeToLabel,
      datePlaceholders,
    } = this.props;
    const { buildUID } = this.context;

    return (
      <Overridable
        id={buildUID("RangeFacet.CustomFilter.element", overridableId)}
        checked={checked}
        expanded={expanded}
        dateError={dateError}
        activeFilter={activeFilter}
      >
        <div className="searchkit-daterange-custom-filter">
          <Checkbox checked={checked} onChange={this.toggleChecked} />

          <div className="searchkit-daterange-custom-body">
            <DateRangeInputs
              format={expanded ? "YYYY-MM-DD" : "YYYY"}
              values={{ fromYear, fromMonth, fromDay, toYear, toMonth, toDay }}
              disabled={!checked}
              onPartChange={this.handleNumericChange}
              onPartBlur={this.applyRange}
              overridableId={overridableId}
              toLabel={dateRangeToLabel}
              placeholders={datePlaceholders}
            />

            {!expanded && (
              <Button
                type="button"
                basic
                size="mini"
                disabled={!checked}
                onClick={() => this.setState({ expanded: true })}
                className="searchkit-daterange-custom-toggle"
              >
                {customDatesLabel}
              </Button>
            )}

            {this.renderError()}
          </div>
        </div>
      </Overridable>
    );
  }
}

RangeCustomFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  activeMode: PropTypes.oneOf([RANGE_MODES.DEFAULT, RANGE_MODES.CUSTOM, null]),
  activeFilter: PropTypes.string,
  rangeSeparator: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  customDatesLabel: PropTypes.string,
  dateRangeToLabel: PropTypes.string,
  datePlaceholders: PropTypes.shape({
    YYYY: PropTypes.string,
    MM: PropTypes.string,
    DD: PropTypes.string,
  }),
};

RangeCustomFilter.defaultProps = {
  activeMode: null,
  activeFilter: null,
  overridableId: "",
  customDatesLabel: "Custom Dates",
  dateRangeToLabel: "to",
  datePlaceholders: undefined,
};

RangeCustomFilter.contextType = AppContext;

export default RangeCustomFilter;
