/*
 * SPDX-FileCopyrightText: 2018-2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from "react-redux";
import { updateQueryPaginationPage } from "../../state/actions";
import PaginationComponent from "./Pagination";

const mapDispatchToProps = (dispatch) => ({
  updateQueryPage: (page) => dispatch(updateQueryPaginationPage(page)),
});

export const Pagination = connect(
  (state) => ({
    currentPage: state.query.page,
    currentSize: state.query.size,
    loading: state.results.loading,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(PaginationComponent);
