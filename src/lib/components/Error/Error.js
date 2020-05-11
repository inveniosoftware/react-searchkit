/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '../ShouldRender';
import _isEmpty from 'lodash/isEmpty';
import { Overridable } from 'react-overridable';

export default function Error({ loading, error }) {
  return (
    <ShouldRender condition={!loading && !_isEmpty(error)}>
      <Element error={error} />
    </ShouldRender>
  );
}

Error.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

const Element = ({ error }) => {
  return (
    <Overridable id="Error.element" error={error}>
      <div>Oups! Something went wrong while fetching results.</div>
    </Overridable>
  );
};
