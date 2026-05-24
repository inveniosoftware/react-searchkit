/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import ResultsMultiLayoutComponent from "./ResultsMultiLayout";

export const ResultsMultiLayout = connect((state) => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
  currentLayout: state.query.layout,
}))(ResultsMultiLayoutComponent);
