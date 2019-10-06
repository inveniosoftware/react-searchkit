/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class ResultsGrid extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
    this.renderGridItem = props.renderGridItem || this._renderGridItem;
  }

  _renderGridItem(result, index) {
    return (
      <Card fluid key={index} href={`#${result.id}`}>
        <Image src={result.imgSrc || 'http://placehold.it/200'} />
        <Card.Content>
          <Card.Header>{result.title}</Card.Header>
          <Card.Description>{result.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }

  _renderElement(results, resultsPerRow) {
    const _results = results.map((result, index) =>
      this.renderGridItem(result, index)
    );

    return <Card.Group itemsPerRow={resultsPerRow}>{_results}</Card.Group>;
  }

  render() {
    const { loading, totalResults, results } = this.props;
    const resultsPerRow = this.props.resultsPerRow;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {this.renderElement(results, resultsPerRow)}
      </ShouldRender>
    );
  }
}

ResultsGrid.propTypes = {
  resultsPerRow: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  renderElement: PropTypes.func,
  renderGridItem: PropTypes.func,
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
  renderElement: null,
  renderGridItem: null,
};
