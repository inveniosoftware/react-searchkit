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
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

function Error({ loading, error, overridableId }) {
  return (
    <ShouldRender condition={!loading && !_isEmpty(error)}>
      <Element error={error} overridableId={overridableId} />
    </ShouldRender>
  );
}

Error.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  overridableId: PropTypes.string,
};

Error.defaultProps = {
  overridableId: '',
};

const Element = ({ error, overridableId }) => {
  return (
    <Overridable id={buildUID('Error.element', overridableId)} error={error}>
      <div>Oups! Something went wrong while fetching results.</div>
    </Overridable>
  );
};

export default Overridable.component('Error', Error);
