/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShouldRender } from '../ShouldRender';

export default class EmptyResults extends Component {
  constructor(props) {
    super(props);
    this.resetQuery = props.resetQuery;
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement = (queryString, resetQuery) => (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="search" />
        No results found!
      </Header>
      <em>Current search "{queryString}"</em>
      <br />
      <Button primary onClick={() => resetQuery()}>
        Clear query
      </Button>
    </Segment>
  );

  render() {
    const { loading, totalResults, error, queryString } = this.props;
    return (
      <ShouldRender
        condition={!loading && _isEmpty(error) && totalResults === 0}
      >
        {this.renderElement(queryString, this.resetQuery)}
      </ShouldRender>
    );
  }
}

EmptyResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  resetQuery: PropTypes.func.isRequired,
};

EmptyResults.defaultProps = {
  queryString: '',
  renderElement: null,
};
