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
import { Overridable } from 'react-overridable';
import { ShouldRender } from '../ShouldRender';

export default class Count extends Component {
  render() {
    const { loading, totalResults, label } = this.props;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {label(<Element totalResults={totalResults} />)}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  label: PropTypes.func,
};

Count.defaultProps = {
  label: (cmp) => cmp,
};

const Element = ({ totalResults }) => (
  <Overridable id="Count.element" totalResults={totalResults}>
    <Label color={'blue'}>{totalResults}</Label>
  </Overridable>
);
