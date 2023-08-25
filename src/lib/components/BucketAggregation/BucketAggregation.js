/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from "lodash/get";
import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Card } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import BucketAggregationValues from "./BucketAggregationValues";

class BucketAggregation extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.agg = props.agg;
    this.updateQueryFilters = props.updateQueryFilters;
  }

  onFilterClicked = (filter) => {
    this.updateQueryFilters(filter);
  };

  _renderValues = (resultBuckets, selectedFilters) => {
    const { overridableId } = this.props;
    return (
      <BucketAggregationValues
        buckets={resultBuckets}
        selectedFilters={selectedFilters}
        field={this.agg.field}
        aggName={this.agg.aggName}
        childAgg={this.agg.childAgg}
        onFilterClicked={this.onFilterClicked}
        overridableId={overridableId}
      />
    );
  };

  _getSelectedFilters = (userSelectionFilters) => {
    // get selected filters for this field only
    return userSelectionFilters.filter((filter) => filter[0] === this.agg.aggName);
  };

  _getResultBuckets = (resultsAggregations) => {
    // get buckets of this field
    const thisAggs = _get(resultsAggregations, this.agg.aggName, {});
    if ("buckets" in thisAggs) {
      if (!Array.isArray(thisAggs["buckets"])) {
        // buckets can be objects or arrays: convert to array if object
        // to keep it consistent
        thisAggs["buckets"] = Object.entries(thisAggs["buckets"]).map(
          ([key, value]) => ({ ...value, key })
        );
      }
      return thisAggs["buckets"];
    }
    return [];
  };

  render() {
    const { userSelectionFilters, resultsAggregations, overridableId, ...props } =
      this.props;
    const selectedFilters = this._getSelectedFilters(userSelectionFilters);
    const resultBuckets = this._getResultBuckets(resultsAggregations);
    const valuesCmp =
      resultBuckets.length > 1
        ? this._renderValues(resultBuckets, selectedFilters)
        : null;
    return (
      <Element
        title={this.title}
        containerCmp={valuesCmp}
        overridableId={overridableId}
        {...props}
      />
    );
  }
}

BucketAggregation.propTypes = {
  title: PropTypes.string.isRequired,
  agg: PropTypes.shape({
    field: PropTypes.string.isRequired,
    aggName: PropTypes.string.isRequired,
    childAgg: PropTypes.object,
  }).isRequired,
  overridableId: PropTypes.string,
  /* REDUX */
  userSelectionFilters: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryFilters: PropTypes.func.isRequired,
};

BucketAggregation.defaultProps = {
  overridableId: "",
};

const Element = ({ overridableId, agg, title, containerCmp, updateQueryFilters }) => {
  const { buildUID } = useContext(AppContext);

  return (
    containerCmp && (
      <Overridable
        id={buildUID("BucketAggregation.element", overridableId)}
        agg={agg}
        title={title}
        containerCmp={containerCmp}
        updateQueryFilters={updateQueryFilters}
      >
        <Card>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
          <Card.Content>{containerCmp}</Card.Content>
        </Card>
      </Overridable>
    )
  );
};

Element.propTypes = {
  agg: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  containerCmp: PropTypes.node,
  overridableId: PropTypes.string,
  updateQueryFilters: PropTypes.func.isRequired,
};

Element.defaultProps = {
  containerCmp: null,
  overridableId: "",
};

export default Overridable.component("BucketAggregation", BucketAggregation);
