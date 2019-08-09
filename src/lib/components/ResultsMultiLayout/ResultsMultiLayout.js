/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResultsList, ResultsGrid } from '../';
import { ShouldRender } from '../ShouldRender';

export default class ResultsMultiLayout extends Component {
  renderResultsList(layout) {
    return layout === 'list' ? <ResultsList /> : <ResultsGrid />;
  }

  render() {
    const { loading, totalResults, currentLayout } = this.props;
    return (
      <ShouldRender
        condition={currentLayout != null && !loading && totalResults > 0}
      >
        {this.renderResultsList(currentLayout)}
      </ShouldRender>
    );
  }
}

ResultsMultiLayout.propTypes = {
  totalResults: PropTypes.number.isRequired,
  currentLayout: PropTypes.string,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: null,
};
