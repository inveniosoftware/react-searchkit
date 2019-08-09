/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from '../../store';
import { updateQueryString } from '../../state/actions';
import SearchBarComponent from './SearchBar';

const mapDispatchToProps = dispatch => ({
  updateQueryString: query => dispatch(updateQueryString(query)),
});

export const SearchBar = connect(
  state => ({
    queryString: state.query.queryString,
  }),
  mapDispatchToProps
)(SearchBarComponent);
