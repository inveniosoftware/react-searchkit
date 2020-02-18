/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import {
  onAppInitialized as _onAppInitialized,
  executeQuery,
  updateQueryState,
} from '../../state/actions';
import BootstrapComponent from './Bootstrap';

const mapDispatchToProps = dispatch => ({
  onAppInitialized: searchOnInit => dispatch(_onAppInitialized(searchOnInit)),
  updateQueryState: queryState => dispatch(updateQueryState(queryState)),
  searchOnUrlQueryStringChanged: () =>
    dispatch(executeQuery({ shouldUpdateUrlQueryString: false })),
});

export const Bootstrap = connect(null, mapDispatchToProps)(BootstrapComponent);
