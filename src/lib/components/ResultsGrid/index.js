/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from "react-redux";
import ResultsGridComponent from "./ResultsGrid";

export const ResultsGrid = connect((state) => ({
  loading: state.results.loading,
  totalResults: state.results.data.total,
  results: state.results.data.hits,
}))(ResultsGridComponent);
