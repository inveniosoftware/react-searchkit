/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import {connect} from "react-redux";

export function withQueryComponent(WrappedComponent) {
  class Wrapper extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    currentQueryState: state.query,
    totalResults: state.results.data.total,
  });

  return connect(
      mapStateToProps,
      null
  )(Wrapper)
}
