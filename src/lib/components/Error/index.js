/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import ErrorComponent from "./Error";

export const Error = connect((state) => ({
  loading: state.results.loading,
  error: state.results.error,
}))(ErrorComponent);
