/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '@app/components/ShouldRender';
import _isEmpty from 'lodash/isEmpty';

export default class EmptyResults extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this.empty;
  }

  empty = total => (total === 0 ? <div>No results found!</div> : null);

  render() {
    const { loading, error, total } = this.props;
    return (
      <ShouldRender condition={!loading && _isEmpty(error)}>
        <Fragment>{this.renderElement(total)}</Fragment>
      </ShouldRender>
    );
  }
}

EmptyResults.propTypes = {
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  renderElement: PropTypes.func,
};

EmptyResults.defaultProps = {
  renderElement: null,
};
