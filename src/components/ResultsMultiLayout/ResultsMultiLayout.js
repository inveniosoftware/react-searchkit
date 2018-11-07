/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { ResultsList, ResultsGrid } from '@app/components';
import { ShouldRender } from '@app/components/ShouldRender';

export default class ResultsMultiLayout extends Component {
  renderResultsList(layout) {
    return layout === 'list' ? <ResultsList /> : <ResultsGrid />;
  }

  render() {
    const { currentLayout, loading, totalResults } = this.props;

    return (
      <ShouldRender condition={currentLayout && !loading && totalResults > 0}>
        {this.renderResultsList(currentLayout)}
      </ShouldRender>
    );
  }
}

ResultsMultiLayout.propTypes = {
  currentLayout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
};
