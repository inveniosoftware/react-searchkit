/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQueryPaginationSize } from "../../state/actions";
import ResultsPerPageComponent from "./ResultsPerPage";

const mapDispatchToProps = (dispatch) => ({
  updateQuerySize: (size) => dispatch(updateQueryPaginationSize(size)),
});

export const ResultsPerPage = connect(
  (state) => ({
    loading: state.results.loading,
    currentSize: state.query.size,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(ResultsPerPageComponent);
