/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
    this.renderListItem = props.renderListItem || this._renderListItem;
  }

  _renderListItem(result, index) {
    return (
      <Item key={index} href={`#${result.id}`}>
        <Item.Image
          size="small"
          src={result.imgSrc || 'http://placehold.it/200'}
        />

        <Item.Content>
          <Item.Header>{result.title}</Item.Header>
          <Item.Description>{result.description}</Item.Description>
        </Item.Content>
      </Item>
    );
  }

  _renderElement(results) {
    const _results = results.map((result, index) =>
      this.renderListItem(result, index)
    );

    return (
      <Item.Group divided relaxed link>
        {_results}
      </Item.Group>
    );
  }

  render() {
    const { loading, totalResults, results } = this.props;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {this.renderElement(results)}
      </ShouldRender>
    );
  }
}

ResultsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  renderElement: PropTypes.func,
  renderListItem: PropTypes.func,
};

ResultsList.defaultProps = {
  renderElement: null,
  renderListItem: null,
};
