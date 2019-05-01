/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component, Fragment } from 'react';

export default class Boostrap extends Component {
  constructor(props) {
    super(props);

    this.searchOnInit = props.searchOnInit || false;
    this.setUrlQueryString = props.setUrlQueryString;
    this.setUrlQueryStringWithoutPush = props.setUrlQueryStringWithoutPush;
  }

  componentWillMount() {
    window.onpopstate = () => {
      this.setUrlQueryStringWithoutPush(this.searchOnInit);
    };
    this.setUrlQueryString(this.searchOnInit);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
