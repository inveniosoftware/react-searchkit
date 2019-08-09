/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { connect } from './lib/store';
import { Grid, Icon, Label } from 'semantic-ui-react';
import {
  ActiveAggregations,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
  ResultsPerPage,
  Sort,
} from './lib/components';

const Spacer = connect(state => ({
  loading: state.results.loading,
  total: state.results.data.total,
}))(({ text, loading, total }) =>
  loading || total === 0 ? null : (
    <span style={{ margin: '0 0.5em' }}>{text}</span>
  )
);

const renderSelectedAggregation = (
  label,
  key,
  removeAggregationClickHandler
) => {
  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const mainAggregationLabel = capitalize(
    label
      .split(':')
      .slice(0, 1)
      .join('')
  );
  const nestedLabel = label
    .split(':')
    .filter((item, index) => index % 2 !== 0)
    .map(item => capitalize(item))
    .join(' : ');
  const newLabel = ''.concat(mainAggregationLabel, ': ', nestedLabel);
  return (
    <Label key={key}>
      {newLabel} <Icon name="close" onClick={removeAggregationClickHandler} />
    </Label>
  );
};

const ActiveAggregationsSpacer = connect(state => ({
  aggregations: state.query.aggregations,
}))(({ text, aggregations }) =>
  aggregations.length ? (
    <Grid relaxed style={{ padding: '0 0 1em 0' }}>
      <Spacer text="Active filters:" />
      <ActiveAggregations
        renderSelectedAggregation={renderSelectedAggregation}
      />
    </Grid>
  ) : null
);

export class Results extends Component {
  constructor(props) {
    super(props);

    this.sortValues = this.props.sortValues;
    this.resultsPerPageValues = this.props.resultsPerPageValues;
  }

  render() {
    return (
      <div>
        <ActiveAggregationsSpacer />
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span>
              <Spacer text="Found" />
              <Count />
              <Spacer text="results sorted by" />
              <Sort values={this.sortValues} />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <span>
              <Spacer text="Show" />
              <ResultsPerPage
                values={this.resultsPerPageValues}
                defaultValue={10}
              />
              <Spacer text="results per page" />
            </span>
            <Spacer />
            <LayoutSwitcher defaultLayout="grid" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </div>
    );
  }
}

Results.propTypes = {};

Results.defaultProps = {};
