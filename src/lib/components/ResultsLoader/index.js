/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import ResultsLoaderComponent from "./ResultsLoader";

export const ResultsLoader = connect((state) => ({
  loading: state.results.loading,
}))(ResultsLoaderComponent);
