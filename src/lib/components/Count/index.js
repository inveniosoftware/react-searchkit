/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import CountComponent from "./Count";

export const Count = connect((state) => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
}))(CountComponent);
