/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShouldRender extends Component {
  render() {
    const { condition } = this.props;
    return condition ? this.props.children : null;
  }
}

ShouldRender.propTypes = {
  condition: PropTypes.bool,
};

ShouldRender.defaultProps = {
  condition: true,
};
