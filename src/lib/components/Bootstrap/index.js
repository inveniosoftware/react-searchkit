/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import {
  onAppInitialized as _onAppInitialized,
  updateQueryState,
  updateQueryStateFromUrl,
} from "../../state/actions";
import BootstrapComponent from "./Bootstrap";

const mapDispatchToProps = (dispatch) => ({
  onAppInitialized: (searchOnInit) => dispatch(_onAppInitialized(searchOnInit)),
  updateQueryState: (queryState) => dispatch(updateQueryState(queryState)),
  searchOnUrlQueryStringChanged: () => dispatch(updateQueryStateFromUrl()),
});

export const Bootstrap = connect(null, mapDispatchToProps)(BootstrapComponent);
