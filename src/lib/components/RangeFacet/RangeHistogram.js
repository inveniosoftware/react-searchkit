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
import { Popup } from "semantic-ui-react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { withParentSize } from "@visx/responsive";
import { AppContext } from "../ReactSearchKit";

const MAX_BAR_WIDTH = 30;

class RangeHistogram extends Component {
  state = {
    hoveredYear: null,
    tooltip: null,
  };

  handleBarHover = (event, datum) => {
    const rect = event.currentTarget.getBoundingClientRect();
    this.setState({
      hoveredYear: datum.year,
      tooltip: {
        year: datum.year,
        count: datum.count,
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  handleBarLeave = () => {
    this.setState({ hoveredYear: null, tooltip: null });
  };

  buildScales = (data, width, height) => {
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

    return { xScale, yScale };
  };

  render() {
    const { parentWidth, data, range, height, onBarClick, overridableId } = this.props;
    const { hoveredYear, tooltip } = this.state;

    if (!parentWidth || parentWidth <= 0 || data.length === 0) {
      return null;
    }

    const { xScale, yScale } = this.buildScales(data, parentWidth, height);

    return (
      <RangeHistogramElement
        data={data}
        range={range}
        width={parentWidth}
        height={height}
        xScale={xScale}
        yScale={yScale}
        hoveredYear={hoveredYear}
        tooltip={tooltip}
        onBarClick={onBarClick}
        onBarHover={this.handleBarHover}
        onBarLeave={this.handleBarLeave}
        overridableId={overridableId}
      />
    );
  }
}

RangeHistogram.propTypes = {
  parentWidth: PropTypes.number, // injected by withParentSize
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number.isRequired,
  onBarClick: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

RangeHistogram.defaultProps = {
  parentWidth: null,
  overridableId: "",
};

const RangeHistogramElement = ({
  data,
  range,
  width,
  height,
  xScale,
  yScale,
  hoveredYear,
  tooltip,
  onBarClick,
  onBarHover,
  onBarLeave,
  overridableId,
}) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("RangeFacet.Histogram.element", overridableId)}
      data={data}
      range={range}
      width={width}
      height={height}
    >
      <>
        <svg width={width} height={height}>
          {data.map((d) => {
            const selected = d.year >= range[0] && d.year <= range[1];
            const rawWidth = xScale.bandwidth();
            const barWidth = Math.min(rawWidth, MAX_BAR_WIDTH);
            const barX = xScale(d.year) + (rawWidth - barWidth) / 2;

            return (
              <Bar
                key={d.year}
                x={barX}
                y={yScale(d.count)}
                width={barWidth}
                height={height - yScale(d.count)}
                className={[
                  "searchkit-daterange-histogram-bar",
                  selected && "is-selected",
                  hoveredYear === d.year && "is-hovered",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onBarClick(d.year)}
                onMouseEnter={(event) => onBarHover(event, d)}
                onMouseLeave={onBarLeave}
              />
            );
          })}
        </svg>

        <RangeHistogramTooltip tooltip={tooltip} overridableId={overridableId} />
      </>
    </Overridable>
  );
};

RangeHistogramElement.propTypes = {
  data: PropTypes.array.isRequired,
  range: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  hoveredYear: PropTypes.number,
  tooltip: PropTypes.object,
  onBarClick: PropTypes.func.isRequired,
  onBarHover: PropTypes.func.isRequired,
  onBarLeave: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

RangeHistogramElement.defaultProps = {
  hoveredYear: null,
  tooltip: null,
  overridableId: "",
};

const RangeHistogramTooltip = ({ tooltip, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("RangeFacet.Histogram.Tooltip.element", overridableId)}
      tooltip={tooltip}
    >
      {tooltip && (
        <Popup
          open
          inverted
          size="mini"
          position="top center"
          content={`${tooltip.year}: ${tooltip.count}`}
          trigger={
            <span
              style={{
                position: "fixed",
                left: tooltip.x,
                top: tooltip.y,
              }}
            />
          }
        />
      )}
    </Overridable>
  );
};

RangeHistogramTooltip.propTypes = {
  tooltip: PropTypes.shape({
    year: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  overridableId: PropTypes.string,
};

RangeHistogramTooltip.defaultProps = {
  tooltip: null,
  overridableId: "",
};

export default Overridable.component("RangeHistogram", withParentSize(RangeHistogram));
