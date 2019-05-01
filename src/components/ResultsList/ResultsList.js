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
import { Item, Label } from 'semantic-ui-react';
import { ShouldRender } from '@app/components/ShouldRender';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderResult(result, index) {
    const keywords = result.keywords || [];
    const labels = keywords.map((keyword, index) => (
      <Label key={index} content={keyword} />
    ));

    return (
      <Item key={index}>
        <Item.Image size="small" src={'https://via.placeholder.com/200'} />

        <Item.Content>
          <Item.Header>{result.title}</Item.Header>
          <Item.Description>
            {_truncate(result.description, { length: 200 })}
          </Item.Description>
          <Item.Extra>{labels}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  _renderElement(results) {
    const _results = results.map((result, index) =>
      this._renderResult(result, index)
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
};

ResultsList.defaultProps = {
  renderElement: null,
};
