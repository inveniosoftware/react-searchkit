/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Overridable } from 'react-overridable';

export default function ResultsLoader({ children, loading }) {
  return loading ? <Element /> : children;
}

ResultsLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const Element = () => (
  <Overridable id="ResultsLoader.element">
    <Loader active size="huge" inline="centered" />
  </Overridable>
);
