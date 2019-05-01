/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import BootstrapComponent from './Bootstrap';

const mapDispatchToProps = dispatch => ({
  setUrlQueryString: searchOnInit =>
    dispatch(setQueryFromUrl(searchOnInit, true)),
  setUrlQueryStringWithoutPush: searchOnInit =>
    dispatch(setQueryFromUrl(searchOnInit, false)),
});

export const Bootstrap = connect(
  null,
  mapDispatchToProps
)(BootstrapComponent);
