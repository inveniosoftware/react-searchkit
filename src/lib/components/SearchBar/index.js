/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQueryString } from "../../state/actions";
import SearchBarComponent from "./SearchBar";

const mapDispatchToProps = (dispatch) => ({
  updateQueryString: (query) => dispatch(updateQueryString(query)),
});

export const SearchBar = connect(
  (state) => ({
    queryString: state.query.queryString,
  }),
  mapDispatchToProps
)(SearchBarComponent);
