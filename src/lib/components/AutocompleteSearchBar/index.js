/*
 * SPDX-FileCopyrightText: 2019-2020 CERN.
 * SPDX-License-Identifier: MIT
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
