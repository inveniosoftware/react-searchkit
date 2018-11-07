/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, Fragment } from 'react';

export default class UrlParamsProvider extends Component {
  constructor(props) {
    super(props);

    this.searchOnLoad = props.searchOnLoad || false;
    this.setUrlParams = props.setUrlParams;
    this.setUrlParamsWithoutPush = props.setUrlParamsWithoutPush;
  }

  componentWillMount() {
    window.onpopstate = () => {
      this.setUrlParamsWithoutPush(this.searchOnLoad);
    };
    this.setUrlParams(this.searchOnLoad);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
