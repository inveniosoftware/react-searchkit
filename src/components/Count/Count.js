/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { ShouldRender } from '@app/components/ShouldRender';

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement(total) {
    return <Label color={'blue'}>{total}</Label>;
  }

  render() {
    const { total, loading } = this.props;
    return (
      <ShouldRender condition={!loading && total > 0}>
        {this.renderElement(total)}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  renderElement: PropTypes.func,
};

Count.defaultProps = {
  renderElement: null,
};
