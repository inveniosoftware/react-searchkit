/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResultsList } from '../ResultsList';
import { ResultsGrid } from '../ResultsGrid';
import { ShouldRender } from '../ShouldRender';

export default class ResultsMultiLayout extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
    this.ResultsListCmp = props.resultsListCmp || ResultsList;
    this.ResultsGridCmp = props.resultsGridCmp || ResultsGrid;
  }

  _renderElement = layout =>
    layout === 'list' ? <this.ResultsListCmp /> : <this.ResultsGridCmp />;

  render() {
    const { loading, totalResults, currentLayout } = this.props;
    return (
      <ShouldRender
        condition={currentLayout != null && !loading && totalResults > 0}
      >
        {this.renderElement(currentLayout)}
      </ShouldRender>
    );
  }
}

ResultsMultiLayout.propTypes = {
  totalResults: PropTypes.number.isRequired,
  currentLayout: PropTypes.string,
  renderElement: PropTypes.func,
  resultsListCmp: PropTypes.func,
  resultsGridCmp: PropTypes.func,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: null,
  renderElement: null,
  resultsListCmp: null,
  resultsGridCmp: null,
};
