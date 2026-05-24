/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import ResultsGridComponent from "./ResultsGrid";

export const ResultsGrid = connect((state) => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
  results: state.results.data.hits,
}))(ResultsGridComponent);
