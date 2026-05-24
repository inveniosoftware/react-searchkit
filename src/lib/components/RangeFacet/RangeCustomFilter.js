/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import { DateTime } from "luxon";
import { Checkbox, Button, Input, Label, List } from "semantic-ui-react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { RANGE_MODES, VALUE_TYPES } from "./utils";
import { AppContext } from "../ReactSearchKit";

// Masked input formatters: strip non-digits and auto-insert separators.
// As the user types, digits are reformatted on each keystroke:
//   "2025" → "2025", "20250" → "2025-0", "202503" → "2025-03",
//   "20250315" → "2025-03-15" (max 8 digits for dates).
const FORMAT_FNS = {
  [VALUE_TYPES.DATE]: (input) => {
    const digits = input.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
  },
  [VALUE_TYPES.INT]: (input) => {
    return input.replace(/\D/g, "");
  },
};

const DEFAULT_HELP_TEXTS = {
  [VALUE_TYPES.DATE]: "e.g. 2025 or 2025-03-15",
  [VALUE_TYPES.INT]: null,
};

class RangeCustomFilter extends React.Component {
  constructor(props) {
    super(props);
    const { min, max, value } = props;

    this.state = {
      checked: false,
      fromValue: String(value[0] ?? min),
      toValue: String(value[1] ?? max),
      error: null,
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
      error: null,
    });
  };

  syncActiveMode = () => {
    const { activeMode } = this.props;
    const { checked } = this.state;

    if (activeMode !== RANGE_MODES.CUSTOM && checked) {
      this.clearState();
    }
  };

  syncFromProps = () => {
    const { value, min, max, activeMode, activeFilter } = this.props;

    // If custom mode is active and has a filter, keep the filter values
    if (activeMode === RANGE_MODES.CUSTOM && activeFilter) return;

    this.setState({
      fromValue: String(value[0] ?? min),
      toValue: String(value[1] ?? max),
    });
  };

  syncActiveFilter = () => {
    const { activeMode, activeFilter, rangeSeparator } = this.props;
    if (activeMode !== RANGE_MODES.CUSTOM || !activeFilter) return;

    const parts = activeFilter.split(rangeSeparator);
    if (parts.length < 2) return;

    this.setState({
      checked: true,
      fromValue: parts[0].trim(),
      toValue: parts[1].trim(),
      error: null,
    });
  };

  formatValue = (input) => {
    const { valueType } = this.props;
    const fn = FORMAT_FNS[valueType] || FORMAT_FNS[VALUE_TYPES.DATE];
    return fn(input);
  };

  handleChange = (field) => (e) => {
    const formatted = this.formatValue(e.target.value);
    this.setState({ [field]: formatted, error: null });
  };

  // Normalize a date value by zero-padding parts (e.g. "2025-3" → "2025-03")
  normalizeValue = (value) => {
    if (!value) return value;
    const { valueType } = this.props;
    if (valueType === VALUE_TYPES.INT) return value;
    const parts = value.split("-");
    return parts
      .map((p, i) => (i === 0 ? p.padStart(4, "0") : p.padStart(2, "0")))
      .join("-");
  };

  // Clicking into an input auto-activates the custom radio
  activateOnFocus = () => {
    const { checked } = this.state;
    if (!checked) {
      this.toggleChecked();
    }
  };

  // Parse a normalized date string (YYYY, YYYY-MM, or YYYY-MM-DD) into a DateTime.
  // For partial dates, fills in start-of-period or end-of-period defaults.
  parseDate = (value, isStart) => {
    const dt = DateTime.fromISO(value);
    if (!dt.isValid) return dt;
    if (value.length === 4) return isStart ? dt.startOf("year") : dt.endOf("year");
    if (value.length === 7) return isStart ? dt.startOf("month") : dt.endOf("month");
    return dt;
  };

  parseValue = (value, isStart) => {
    const { valueType } = this.props;
    if (valueType === VALUE_TYPES.INT) {
      const n = Number(value);
      return Number.isFinite(n) ? n : null;
    }
    const dt = this.parseDate(value, isStart);
    return dt?.isValid ? dt : null;
  };

  validate = (fromValue, toValue) => {
    const { valueType } = this.props;
    const isDate = valueType !== VALUE_TYPES.INT;

    if (!fromValue && !toValue) {
      return this.setError("Enter at least one value");
    }

    if (fromValue) {
      if (isDate && fromValue.length < 4) {
        return this.setError("Year must be 4 digits");
      }
      const from = this.parseValue(fromValue, true);
      if (from === null) {
        return this.setError(isDate ? "Invalid date" : "Invalid number");
      }
    }

    if (toValue) {
      if (isDate && toValue.length < 4) {
        return this.setError("Year must be 4 digits");
      }
      const to = this.parseValue(toValue, false);
      if (to === null) {
        return this.setError(isDate ? "Invalid date" : "Invalid number");
      }
    }

    if (fromValue && toValue) {
      const from = this.parseValue(fromValue, true);
      const to = this.parseValue(toValue, false);
      if (from > to) {
        return this.setError("Start must be before end");
      }
    }

    return true;
  };

  setError = (error) => {
    this.setState({ error });
    return false;
  };

  applyRange = () => {
    const { checked, fromValue, toValue } = this.state;
    const { rangeSeparator, onApply, activeFilter } = this.props;

    if (!checked) return;

    // Normalize to zero-padded ISO format (e.g. "2025-3" → "2025-03")
    const normalizedFrom = this.normalizeValue(fromValue);
    const normalizedTo = this.normalizeValue(toValue);

    // Skip if values haven't changed
    const rangeString = `${normalizedFrom}${rangeSeparator}${normalizedTo}`;
    if (rangeString === activeFilter) return;

    if (!this.validate(normalizedFrom, normalizedTo)) return;

    // Extract years for slider range; fall back to min/max for open-ended ranges
    const { min, max } = this.props;
    const fromYear = normalizedFrom ? parseInt(normalizedFrom.slice(0, 4), 10) : min;
    const toYear = normalizedTo ? parseInt(normalizedTo.slice(0, 4), 10) : max;

    onApply([fromYear, toYear], rangeString);
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.applyRange();
    }
  };

  toggleChecked = () => {
    const { checked } = this.state;
    const { onClear, onActivate } = this.props;
    // Disable the custom filter and clear the active filter
    if (checked) {
      this.clearState();
      onClear();
      return;
    }
    // Enable the custom filter
    onActivate();
    this.setState({ checked: true });
  };

  render() {
    const { checked, fromValue, toValue, error } = this.state;
    const {
      overridableId,
      activeFilter,
      dateRangeToLabel,
      helpText,
      valueType,
      fromAriaLabel,
      toAriaLabel,
      applyAriaLabel,
      customRangeAriaLabel,
    } = this.props;
    const { buildUID } = this.context;
    const resolvedHelpText = helpText ?? DEFAULT_HELP_TEXTS[valueType];

    return (
      <Overridable
        id={buildUID("RangeFacet.CustomFilter.element", overridableId)}
        checked={checked}
        error={error}
        activeFilter={activeFilter}
      >
        <List.Item className="searchkit-daterange-custom-item">
          <Checkbox
            radio
            checked={checked}
            onChange={this.toggleChecked}
            aria-label={customRangeAriaLabel}
          />
          <div className="searchkit-daterange-custom-body">
            <div className="searchkit-daterange-custom-filter">
              <Input
                size="mini"
                value={fromValue}
                onChange={this.handleChange("fromValue")}
                onFocus={this.activateOnFocus}
                onKeyDown={this.handleKeyDown}
                inputMode="numeric"
                dir="ltr"
                error={!!error}
                className="searchkit-daterange-masked-input"
                aria-label={fromAriaLabel}
              />
              <span>{dateRangeToLabel}</span>
              <Input
                size="mini"
                value={toValue}
                onChange={this.handleChange("toValue")}
                onFocus={this.activateOnFocus}
                onKeyDown={this.handleKeyDown}
                inputMode="numeric"
                dir="ltr"
                error={!!error}
                className="searchkit-daterange-masked-input"
                aria-label={toAriaLabel}
              />
              <Button
                type="button"
                primary
                size="mini"
                icon="search"
                disabled={!checked}
                onClick={this.applyRange}
                aria-label={applyAriaLabel}
              />
            </div>
            {resolvedHelpText && <label className="helptext">{resolvedHelpText}</label>}
            {error && <Label basic color="red" size="tiny" content={error} />}
          </div>
        </List.Item>
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
  onActivate: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  dateRangeToLabel: PropTypes.string,
  valueType: PropTypes.oneOf([VALUE_TYPES.DATE, VALUE_TYPES.INT]),
  helpText: PropTypes.string,
  fromAriaLabel: PropTypes.string,
  toAriaLabel: PropTypes.string,
  applyAriaLabel: PropTypes.string,
  customRangeAriaLabel: PropTypes.string,
};

RangeCustomFilter.defaultProps = {
  activeMode: null,
  activeFilter: null,
  overridableId: "",
  dateRangeToLabel: "to",
  valueType: VALUE_TYPES.DATE,
  helpText: undefined,
  fromAriaLabel: "From",
  toAriaLabel: "To",
  applyAriaLabel: "Apply custom range",
  customRangeAriaLabel: "Custom range",
};

RangeCustomFilter.contextType = AppContext;

export default RangeCustomFilter;
