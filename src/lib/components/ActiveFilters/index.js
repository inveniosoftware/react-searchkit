/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { connect } from "react-redux";
import { updateQueryFilters } from "../../state/actions";
import ActiveFiltersComponent from "./ActiveFilters";

const mapDispatchToProps = (dispatch) => ({
  updateQueryFilters: (filter) => dispatch(updateQueryFilters(filter)),
});

export const ActiveFilters = connect(
  (state) => ({
    filters: state.query.filters,
  }),
  mapDispatchToProps
)(ActiveFiltersComponent);
