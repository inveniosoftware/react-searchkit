/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { Checkbox, Button, Input, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

const getLastDayOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const normalizeDateParts = ({ year, month, day, defaultMonth, defaultDay }) => ({
  y: Number(year),
  m: month && String(month).trim() !== "" ? Number(month) : defaultMonth,
  d: day && String(day).trim() !== "" ? Number(day) : defaultDay,
});

const buildDateRange = ({
  fromYear,
  fromMonth,
  fromDay,
  toYear,
  toMonth,
  toDay,
  rangeSeparator,
}) => {
  if (!fromYear || !toYear) return null;

  const fy = Number(fromYear);
  const ty = Number(toYear);
  if (isNaN(fy) || isNaN(ty)) return null;

  const hasAnyDetail = fromMonth || fromDay || toMonth || toDay;

  if (!hasAnyDetail) {
    return `${fy}${rangeSeparator}${ty}`;
  }

  const from = normalizeDateParts({
    year: fromYear,
    month: fromMonth,
    day: fromDay,
    defaultMonth: 1,
    defaultDay: 1,
  });

  const to = normalizeDateParts({
    year: toYear,
    month: toMonth,
    day: toDay,
    defaultMonth: 12,
    defaultDay: getLastDayOfMonth(ty, toMonth || 12),
  });

  return (
    `${from.y}-${String(from.m).padStart(2, "0")}-${String(from.d).padStart(2, "0")}` +
    `${rangeSeparator}` +
    `${to.y}-${String(to.m).padStart(2, "0")}-${String(to.d).padStart(2, "0")}`
  );
};

const DatePartInput = ({ placeholder, value, disabled, onChange, onBlur, width }) => (
  <Input
    size="mini"
    placeholder={placeholder}
    value={value}
    disabled={disabled}
    inputMode="numeric"
    onChange={(e) => onChange(e.target.value)}
    onBlur={onBlur}
    style={{ width }}
  />
);

DatePartInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  width: PropTypes.string,
};

DatePartInput.defaultProps = {
  width: "7ch",
};

class RangeCustomFilter extends React.Component {
  constructor(props) {
    super(props);
    const { min, max, value } = props;

    this.state = {
      checked: false,
      expanded: false,
      fromYear: value[0] ?? min,
      toYear: value[1] ?? max,
      fromMonth: "",
      fromDay: "",
      toMonth: "",
      toDay: "",
      dateError: "",
    };
  }

  componentDidMount() {
    this.syncFromProps();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeMode, value, min, max } = this.props;
    const { checked } = this.state;

    if (prevProps.activeMode !== activeMode) {
      this.syncActiveMode();
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

  syncActiveMode = () => {
    const { activeMode } = this.props;
    const { checked, expanded } = this.state;

    if (activeMode !== "custom") {
      if (checked || expanded) {
        this.setState({ checked: false, expanded: false });
      }
    }
  };

  syncFromProps = () => {
    const { value, min, max } = this.props;
    const { checked } = this.state;

    if (!checked) {
      this.setState({
        fromYear: value[0] ?? min,
        toYear: value[1] ?? max,
        fromMonth: "",
        fromDay: "",
        toMonth: "",
        toDay: "",
        dateError: "",
      });
    }
  };

  handleNumericChange = (value, field, maxLength) => {
    if (value === "" || new RegExp(`^\\d{0,${maxLength}}$`).test(value)) {
      this.setState({ [field]: value, dateError: "" });
    }
  };

  validateDates = () => {
    const { min, max } = this.props;
    const { fromYear, toYear, fromMonth, fromDay, toMonth, toDay } = this.state;

    if (String(fromYear).length !== 4 || String(toYear).length !== 4) {
      this.setState({ dateError: "Year must be 4 digits" });
      return false;
    }
    const from = normalizeDateParts({
      year: fromYear,
      month: fromMonth,
      day: fromDay,
      defaultMonth: 1,
      defaultDay: 1,
    });
    const to = normalizeDateParts({
      year: toYear,
      month: toMonth,
      day: toDay,
      defaultMonth: 12,
      defaultDay: getLastDayOfMonth(Number(toYear), toMonth || 12),
    });
    // Year bounds
    if (from.y < min || from.y > max || to.y < min || to.y > max) {
      this.setState({ dateError: "Year must be between " + min + " and " + max });
      return false;
    }
    // Month bounds
    if (from.m < 1 || from.m > 12 || to.m < 1 || to.m > 12) {
      this.setState({ dateError: "Month must be between 1 and 12" });
      return false;
    }
    // Day bounds
    if (
      from.d < 1 ||
      from.d > getLastDayOfMonth(from.y, from.m) ||
      to.d < 1 ||
      to.d > getLastDayOfMonth(to.y, to.m)
    ) {
      this.setState({ dateError: "Please enter a valid day of the month" });
      return false;
    }
    // Ordering check
    if (new Date(from.y, from.m - 1, from.d) > new Date(to.y, to.m - 1, to.d)) {
      this.setState({ dateError: "Start date must be before end date" });
      return false;
    }
    return true;
  };

  applyRange = () => {
    const { checked, fromYear, fromMonth, fromDay, toYear, toMonth, toDay } =
      this.state;
    const { rangeSeparator, onApply } = this.props;

    if (!checked) return;
    if (!this.validateDates()) return;

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

    const [fromPart, toPart] = dateRangeString.split(rangeSeparator);
    onApply(
      [Number(fromPart.slice(0, 4)), Number(toPart.slice(0, 4))],
      dateRangeString
    );
  };

  toggleChecked = () => {
    const { checked } = this.state;
    const { onClear } = this.props;

    if (checked) {
      this.setState({ checked: false, expanded: false });
      onClear();
      return;
    }

    this.setState({ checked: true });
    // applyRange();
  };

  render() {
    const {
      checked,
      expanded,
      fromYear,
      toYear,
      fromMonth,
      fromDay,
      toMonth,
      toDay,
      dateError,
    } = this.state;

    return (
      <div className="range-custom-filter">
        {!expanded && (
          <div className="range-custom-collapsed">
            <Checkbox checked={checked} onChange={this.toggleChecked} />

            <div className="range-custom-fields">
              <DatePartInput
                placeholder="YYYY"
                value={fromYear}
                disabled={!checked}
                width="8.5ch"
                onChange={(v) => this.handleNumericChange(v, "fromYear", 4)}
                onBlur={this.applyRange}
              />
              {" to "}

              <DatePartInput
                placeholder="YYYY"
                value={toYear}
                disabled={!checked}
                width="8.5ch"
                onChange={(v) => this.handleNumericChange(v, "toYear", 4)}
                onBlur={this.applyRange}
              />

              <Button
                type="button"
                basic
                size="mini"
                disabled={!checked}
                onClick={() => this.setState({ expanded: true })}
                className="range-custom-toggle"
              >
                Custom Dates
              </Button>
              {dateError && <Label basic color="red" size="tiny" content={dateError} />}
            </div>
          </div>
        )}

        {expanded && (
          <div className="range-custom-expanded">
            <Checkbox checked={checked} onChange={this.toggleChecked} />

            <div className="range-custom-fields">
              <DatePartInput
                placeholder="YYYY"
                value={fromYear}
                disabled={!checked}
                width="8.5ch"
                onChange={(v) => this.handleNumericChange(v, "fromYear", 4)}
                onBlur={this.applyRange}
              />

              <DatePartInput
                placeholder="MM"
                value={fromMonth}
                disabled={!checked}
                onChange={(v) => this.handleNumericChange(v, "fromMonth", 2)}
                onBlur={this.applyRange}
              />

              <DatePartInput
                placeholder="DD"
                value={fromDay}
                disabled={!checked}
                onChange={(v) => this.handleNumericChange(v, "fromDay", 2)}
                onBlur={this.applyRange}
              />

              <span className="range-separator">to</span>

              <DatePartInput
                placeholder="YYYY"
                value={toYear}
                disabled={!checked}
                width="8.5ch"
                onChange={(v) => this.handleNumericChange(v, "toYear", 4)}
                onBlur={this.applyRange}
              />

              <DatePartInput
                placeholder="MM"
                value={toMonth}
                disabled={!checked}
                onChange={(v) => this.handleNumericChange(v, "toMonth", 2)}
                onBlur={this.applyRange}
              />

              <DatePartInput
                placeholder="DD"
                value={toDay}
                disabled={!checked}
                onChange={(v) => this.handleNumericChange(v, "toDay", 2)}
                onBlur={this.applyRange}
              />

              {dateError && <Label basic color="red" size="tiny" content={dateError} />}
            </div>
          </div>
        )}
      </div>
    );
  }
}

RangeCustomFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.array.isRequired,
  activeMode: PropTypes.oneOf(["quick", "custom", null]),
  rangeSeparator: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

RangeCustomFilter.defaultProps = {
  activeMode: null,
};

export default RangeCustomFilter;
