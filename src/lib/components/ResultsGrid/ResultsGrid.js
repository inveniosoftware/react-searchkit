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
import { Card, Image } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class ResultsGrid extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderResult(result, index) {
    let metadata = result.metadata;
    return (
      <Card fluid key={index} href={`#${metadata.recid}`}>
        <Image src={result.imageSrc || 'https://via.placeholder.com/200'} />
        <Card.Content>
          <Card.Header>{metadata.title.title || metadata.title}</Card.Header>
          <Card.Meta>{metadata.publication_date}</Card.Meta>
          <Card.Description>
            {_truncate(metadata.description, { length: 200 })}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  _renderElement(results, resultsPerRow) {
    const _results = results.map((result, index) =>
      this._renderResult(result, index)
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
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
  renderElement: null,
};
