/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import {
  ActiveFilters,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
  ResultsPerPage,
  Sort,
} from '../../lib/components';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.sortValues = this.props.sortValues;
    this.resultsPerPageValues = this.props.resultsPerPageValues;
  }

  render() {
    const { total } = this.props.currentResultsState.data;
    return total ? (
      <div>
        <Grid relaxed>
          <ActiveFilters />
        </Grid>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span style={({ marginLeft: '0.5em' }, { marginRight: '0.5em' })}>
              <Count label={(cmp) => <>Found {cmp} results</>} />
              <Sort
                values={this.sortValues}
                label={(cmp) => <> sorted by {cmp}</>}
              />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <span style={({ marginLeft: '0.5em' }, { marginRight: '0.5em' })}>
              <ResultsPerPage
                values={this.resultsPerPageValues}
                label={(cmp) => <>Show {cmp} results per page</>}
              />
            </span>
            <LayoutSwitcher defaultLayout="list" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout overridableId="zenodo" />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </div>
    ) : null;
  }
}

Results.propTypes = {};

Results.defaultProps = {};
