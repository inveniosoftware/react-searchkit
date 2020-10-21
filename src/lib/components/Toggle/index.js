/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQueryFilters } from '../../state/actions';
import ToggleComponent from './Toggle';

const mapDispatchToProps = dispatch => ({
  updateQueryFilters: filter => dispatch(updateQueryFilters(filter)),
});

export const Toggle = connect(
  state => ({
    userSelectionFilters: state.query.filters
  }),
  mapDispatchToProps,
)(ToggleComponent);
