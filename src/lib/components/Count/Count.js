/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component, useContext } from 'react';
import Overridable from 'react-overridable';
import { Label } from 'semantic-ui-react';
import { AppContext } from '../';
import { ShouldRender } from '../ShouldRender';

class Count extends Component {
  render() {
    const { loading, totalResults, label, overridableId } = this.props;
    return (
      <ShouldRender condition={!loading && totalResults > 0}>
        {label(
          <Element totalResults={totalResults} overridableId={overridableId} />
        )}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
};

Count.defaultProps = {
  label: (cmp) => cmp,
  overridableId: '',
};

const Element = ({ totalResults, overridableId }) => {
  const {buildUID} = useContext(AppContext);
  const _overridableId = buildUID('Count.element', overridableId)

  return (
  <Overridable
    id={_overridableId}
    totalResults={totalResults}
  >
    <Label color={'blue'}>{totalResults.toLocaleString('en-US')}</Label>
  </Overridable>
)}

export default Overridable.component('Count', Count);
