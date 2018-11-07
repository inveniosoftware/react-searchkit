/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

const mapDispatchToProps = dispatch => ({
  setUrlParams: searchOnLoad => dispatch(setQueryFromUrl(searchOnLoad, true)),
  setUrlParamsWithoutPush: searchOnLoad =>
    dispatch(setQueryFromUrl(searchOnLoad, false)),
});

export const UrlParamsProvider = connect(
  null,
  mapDispatchToProps
)(UrlParamsProviderComponent);
