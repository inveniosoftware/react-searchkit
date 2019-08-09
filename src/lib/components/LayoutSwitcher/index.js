/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateResultsLayout, setInitialState } from '../../state/actions';
import LayoutSwitcherComponent from './LayoutSwitcher';

const mapDispatchToProps = dispatch => ({
  updateLayout: layout => dispatch(updateResultsLayout(layout)),
  setInitialState: initialState => dispatch(setInitialState(initialState)),
});
export const LayoutSwitcher = connect(
  state => ({
    loading: state.results.loading,
    currentLayout: state.query.layout,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(LayoutSwitcherComponent);
