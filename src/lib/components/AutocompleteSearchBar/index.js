/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from "react-redux";
import {
  clearSuggestions,
  updateQueryString,
  updateSuggestions,
} from "../../state/actions";
import AutocompleteSearchBarComponent from "../AutocompleteSearchBar/AutocompleteSearchBar";

const mapDispatchToProps = (dispatch) => ({
  updateQueryString: (query) => dispatch(updateQueryString(query)),
  updateSuggestions: (query) => dispatch(updateSuggestions(query)),
  clearSuggestions: () => dispatch(clearSuggestions()),
});

const mapStateToProps = (state) => ({
  queryString: state.query.queryString,
  suggestions: state.query.suggestions,
});

export const AutocompleteSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteSearchBarComponent);
