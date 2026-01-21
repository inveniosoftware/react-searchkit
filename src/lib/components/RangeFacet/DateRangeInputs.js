/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Input } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

const DEFAULT_PLACEHOLDERS = { YYYY: "YYYY", MM: "MM", DD: "DD" };

const getPartConfig = (part, placeholders = {}) => {
  const placeholder = placeholders[part] ?? DEFAULT_PLACEHOLDERS[part] ?? part;

  switch (part) {
    case "YYYY":
      return { placeholder, maxLength: 4, width: "8.5ch" };
    case "MM":
      return { placeholder, maxLength: 2, width: "7ch" };
    case "DD":
      return { placeholder, maxLength: 2, width: "7ch" };
    default:
      return { placeholder, maxLength: 4, width: "8.5ch" };
  }
};

const getFieldName = (prefix, part) => {
  if (part === "YYYY") return `${prefix}Year`;
  if (part === "MM") return `${prefix}Month`;
  if (part === "DD") return `${prefix}Day`;
  return "";
};

class DateRangeInputs extends Component {
  handlePartChange = (field, maxLength) => (event) => {
    const { onPartChange } = this.props;
    onPartChange(event.target.value, field, maxLength);
  };

  render() {
    const {
      format,
      values,
      disabled,
      onPartBlur,
      overridableId,
      toLabel,
      placeholders,
    } = this.props;

    return (
      <DateRangeInputsElement
        format={format}
        values={values}
        disabled={disabled}
        onPartChange={this.handlePartChange}
        onPartBlur={onPartBlur}
        overridableId={overridableId}
        toLabel={toLabel}
        placeholders={placeholders}
      />
    );
  }
}
DateRangeInputs.propTypes = {
  format: PropTypes.oneOf(["YYYY", "YYYY-MM", "YYYY-MM-DD"]).isRequired,
  values: PropTypes.shape({
    fromYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fromMonth: PropTypes.string,
    fromDay: PropTypes.string,
    toYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    toMonth: PropTypes.string,
    toDay: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onPartChange: PropTypes.func.isRequired,
  onPartBlur: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  toLabel: PropTypes.string,
  placeholders: PropTypes.shape({
    YYYY: PropTypes.string,
    MM: PropTypes.string,
    DD: PropTypes.string,
  }),
};

DateRangeInputs.defaultProps = {
  overridableId: "",
  toLabel: "to",
  placeholders: undefined,
};

const DateRangeInputsElement = ({
  format,
  values,
  disabled,
  onPartChange,
  onPartBlur,
  overridableId,
  toLabel,
  placeholders,
}) => {
  const { buildUID } = useContext(AppContext);
  const parts = format.split("-");
  const isStacked = format !== "YYYY";
  const toText = toLabel ?? "to";
  const mergedPlaceholders = placeholders ?? {};

  const renderParts = (side) =>
    parts.map((part) => {
      const field = getFieldName(side, part);
      const config = getPartConfig(part, mergedPlaceholders);

      return (
        <Input
          key={`${side}-${part}`}
          size="mini"
          placeholder={config.placeholder}
          value={values[field] ?? ""}
          disabled={disabled}
          inputMode="numeric"
          onChange={onPartChange(field, config.maxLength)}
          onBlur={onPartBlur}
          style={{ width: config.width }}
        />
      );
    });

  return (
    <Overridable
      id={buildUID("RangeFacet.DateInputs.Layout", overridableId)}
      format={format}
      values={values}
      disabled={disabled}
    >
      <div className={`searchkit-daterange-inputs${isStacked ? " is-stacked" : ""}`}>
        {isStacked ? (
          <>
            <div className="searchkit-daterange-inputs-row">
              {renderParts("from")}
              <span>{toText}</span>
            </div>
            <div className="searchkit-daterange-inputs-row">{renderParts("to")}</div>
          </>
        ) : (
          <>
            {["from", "to"].map((side, sideIndex) => (
              <React.Fragment key={side}>
                {renderParts(side)}
                {sideIndex === 0 && <span>{toText}</span>}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </Overridable>
  );
};

DateRangeInputsElement.propTypes = {
  format: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPartChange: PropTypes.func.isRequired,
  onPartBlur: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
  toLabel: PropTypes.string,
  placeholders: PropTypes.shape({
    YYYY: PropTypes.string,
    MM: PropTypes.string,
    DD: PropTypes.string,
  }),
};

DateRangeInputsElement.defaultProps = {
  overridableId: "",
  toLabel: "to",
  placeholders: undefined,
};

export default DateRangeInputs;
