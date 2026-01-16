/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2026 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import PropTypes from "prop-types";

const RangeSlider = ({ min, max, value, onChange }) => {
  const step = 1;

  const [currentMinInputVal, currentMaxInputVal] = value;
  const minVal = Math.min(currentMinInputVal, currentMaxInputVal);
  const maxVal = Math.max(currentMinInputVal, currentMaxInputVal);

  const getPercent = (v) => {
    if (max === min) return 0;
    const percentage = ((v - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  const percentageDifference = maxPercent - minPercent;

  const isSingleValue = minVal === maxVal;

  const areLabelsClose = !isSingleValue && percentageDifference < 20;
  const areLabelsOverlapping = !isSingleValue && percentageDifference < 10;

  const labelPlacement = (percentage) => percentage + ((-3 * percentage) / 50 + 3);

  const labelOffset = () => (10 - percentageDifference) / 2;

  const minLabelPlacement = () => {
    let placement = labelPlacement(minPercent);
    if (areLabelsOverlapping) placement -= labelOffset();
    return placement;
  };

  const maxLabelPlacement = () => {
    let placement = labelPlacement(maxPercent);
    if (areLabelsOverlapping) placement += labelOffset();
    return placement;
  };

  const handleMinChange = (e) => {
    onChange([Number(e.target.value), currentMaxInputVal]);
  };

  const handleMaxChange = (e) => {
    onChange([currentMinInputVal, Number(e.target.value)]);
  };

  return (
    <div className="slider-container">
      <div className="slider-track" />

      <div
        className="slider-range"
        style={{
          left: `${minPercent}%`,
          width: `${percentageDifference}%`,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentMinInputVal}
        onChange={handleMinChange}
        className="thumb thumb-left"
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentMaxInputVal}
        onChange={handleMaxChange}
        className="thumb thumb-right"
      />

      <div
        className={`slider-label ${areLabelsClose ? "diagonal" : ""}`}
        style={{ left: `${minLabelPlacement()}%` }}
      >
        {minVal}
      </div>

      <div
        className={`slider-label ${areLabelsClose ? "diagonal" : ""}`}
        style={{
          left: `${maxLabelPlacement()}%`,
          visibility: minVal === maxVal ? "hidden" : "",
        }}
      >
        {maxVal}
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeSlider;
