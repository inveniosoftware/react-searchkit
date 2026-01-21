/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { AppContext } from "../ReactSearchKit";

class RangeSlider extends React.Component {
  // Converts a value within [min, max] into a clamped percentage (0–100).
  // When min === max, return 50 to keep the thumb centered in single-value mode.
  getPercent = (v) => {
    const { min, max } = this.props;
    if (max === min) return 50;
    return Math.min(Math.max(((v - min) / (max - min)) * 100, 0), 100);
  };

  handleMinChange = (e) => {
    const { value, onChange } = this.props;
    onChange([Number(e.target.value), value[1]]);
  };

  handleMaxChange = (e) => {
    const { value, onChange } = this.props;
    onChange([value[0], Number(e.target.value)]);
  };

  render() {
    const { min, max, value, overridableId } = this.props;
    const { buildUID } = this.context;

    const [v1, v2] = value;
    const minVal = Math.min(v1, v2);
    const maxVal = Math.max(v1, v2);

    const minPercent = this.getPercent(minVal);
    const maxPercent = this.getPercent(maxVal);
    const diff = maxPercent - minPercent;

    const isSingleValue = min === max;
    // When thumbs are close, stagger labels to avoid overlap.
    const areLabelsClose = minVal !== maxVal && diff < 20;
    const areLabelsOverlapping = minVal !== maxVal && diff < 10;

    // Adjust label position so it stays visually centered over the thumb.
    // The formula applies a linear bias based on distance from the center (50%):
    //  - at 0% → +3% shift and at 100% → −3% shift
    //  - at 50% → 0% shift (no correction)
    const labelPlacement = (percentage) => percentage + ((-3 * percentage) / 50 + 3);

    // Offset labels further apart as the distance between thumbs shrinks.
    const labelOffset = () => (10 - diff) / 2;

    // Shift min label left when labels overlap.
    const minLabelPlacement = () => {
      let placement = labelPlacement(minPercent);
      if (areLabelsOverlapping) placement -= labelOffset();
      return placement;
    };

    // Shift max label right when labels overlap.
    const maxLabelPlacement = () => {
      let placement = labelPlacement(maxPercent);
      if (areLabelsOverlapping) placement += labelOffset();
      return placement;
    };

    return (
      <Overridable
        id={buildUID("RangeFacet.Slider.element", overridableId)}
        min={min}
        max={max}
        value={value}
        minVal={minVal}
        maxVal={maxVal}
        minPercent={minPercent}
        maxPercent={maxPercent}
      >
        <div className="searchkit-daterange-slider-container">
          <div className="searchkit-daterange-slider-track" />
          <div
            className="searchkit-daterange-slider-range"
            style={{
              "--range-left": `${minPercent}%`,
              "--range-width": `${diff}%`,
            }}
          />

          {isSingleValue ? (
            // Visual-only centered thumb for single fixed value
            <input type="range" value={50} disabled />
          ) : (
            <>
              <input
                type="range"
                min={min}
                max={max}
                value={v1}
                onChange={this.handleMinChange}
                className="thumb searchkit-daterange-thumb-left"
              />
              <input
                type="range"
                min={min}
                max={max}
                value={v2}
                onChange={this.handleMaxChange}
                className="thumb searchkit-daterange-thumb-right"
              />
            </>
          )}
          <div
            className={`searchkit-daterange-slider-label ${
              areLabelsClose ? "diagonal" : ""
            }`}
            style={{ "--label-left": `${minLabelPlacement()}%` }}
          >
            {minVal}
          </div>

          <div
            className={`searchkit-daterange-slider-label ${
              areLabelsClose ? "diagonal" : ""
            }`}
            style={{ "--label-left": `${maxLabelPlacement()}%` }}
          >
            {maxVal}
          </div>
        </div>
      </Overridable>
    );
  }
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

RangeSlider.defaultProps = {
  overridableId: "",
};

RangeSlider.contextType = AppContext;

export default Overridable.component("RangeSlider", RangeSlider);
