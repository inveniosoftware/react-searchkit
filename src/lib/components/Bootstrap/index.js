/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from 'react-redux';
import {
  executeQuery,
  onAppInitialized as _onAppInitialized,
  updateQueryState,
} from '../../state/actions';
import BootstrapComponent from './Bootstrap';

const mapDispatchToProps = (dispatch) => ({
  onAppInitialized: (searchOnInit) => dispatch(_onAppInitialized(searchOnInit)),
  updateQueryState: (queryState) => dispatch(updateQueryState(queryState)),
  searchOnUrlQueryStringChanged: () =>
    dispatch(executeQuery({ shouldUpdateUrlQueryString: false })),
});

export const Bootstrap = connect(null, mapDispatchToProps)(BootstrapComponent);
