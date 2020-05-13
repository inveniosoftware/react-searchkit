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
import Overridable from 'react-overridable';
import { buildUID } from '../../util';

function ResultsLoader({ children, loading, overridableId }) {
  return loading ? <Element overridableId={overridableId} /> : children;
}

ResultsLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  overridableId: PropTypes.string,
};

ResultsLoader.defaultProps = {
  overridableId: '',
};

const Element = ({ overridableId }) => (
  <Overridable id={buildUID('ResultsLoader.element', overridableId)}>
    <Loader active size="huge" inline="centered" />
  </Overridable>
);

export default Overridable.component('ResultsLoader', ResultsLoader);
