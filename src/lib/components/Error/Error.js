/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Overridable } from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

export default function Error({ loading, error, overridableUID }) {
  return (
    <ShouldRender condition={!loading && !_isEmpty(error)}>
      <Element error={error} overridableUID={overridableUID} />
    </ShouldRender>
  );
}

Error.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  overridableUID: PropTypes.string,
};

Error.defaultProps = {
  overridableUID: '',
};

const Element = ({ error, overridableUID }) => {
  return (
    <Overridable id={buildUID('Error.element', overridableUID)} error={error}>
      <div>Oups! Something went wrong while fetching results.</div>
    </Overridable>
  );
};
