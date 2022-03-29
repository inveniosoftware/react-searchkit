/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  ActiveFilters,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
} from "../../lib/components";

export class Results extends Component {
  render() {
    const { currentResultsState } = this.props;
    const { data } = currentResultsState;
    const { total } = data;
    return total ? (
      <>
        <Grid relaxed>
          <ActiveFilters />
        </Grid>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span style={({ marginLeft: "0.5em" }, { marginRight: "0.5em" })}>
              <Count label={(cmp) => <>Found {cmp}</>} />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <LayoutSwitcher defaultLayout="grid" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: "2em 0" }}>
          <ResultsMultiLayout overridableId="elasticsearch" />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </>
    ) : null;
  }
}

Results.propTypes = {
  currentResultsState: PropTypes.array.isRequired,
};

Results.defaultProps = {};
