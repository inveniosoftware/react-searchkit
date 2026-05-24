/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import ResultsListComponent from "./ResultsList";

export const ResultsList = connect((state) => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
  results: state.results.data.hits,
}))(ResultsListComponent);
