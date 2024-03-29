/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Icon, Label } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

class ActiveFilters extends Component {
  constructor(props) {
    super(props);
    this.updateQueryFilters = props.updateQueryFilters;
  }

  _getLabel = (filter) => {
    const aggName = filter[0];
    let value = filter[1];
    let currentFilter = [aggName, value];
    const hasChild = filter.length === 3;
    if (hasChild) {
      const { label, activeFilter } = this._getLabel(filter[2]);
      value = `${value}.${label}`;
      currentFilter.push(activeFilter);
    }
    return {
      label: value,
      activeFilter: currentFilter,
    };
  };

  render() {
    const { filters, overridableId } = this.props;
    return (
      !!filters.length && (
        <Element
          filters={filters}
          removeActiveFilter={this.updateQueryFilters}
          getLabel={this._getLabel}
          overridableId={overridableId}
        />
      )
    );
  }
}

ActiveFilters.propTypes = {
  overridableId: PropTypes.string,
  /* REDUX */
  filters: PropTypes.array.isRequired,
  updateQueryFilters: PropTypes.func.isRequired,
};

ActiveFilters.defaultProps = {
  overridableId: "",
};

const Element = ({ overridableId, filters, removeActiveFilter, getLabel }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("ActiveFilters.element", overridableId)}
      filters={filters}
      removeActiveFilter={removeActiveFilter}
      getLabel={getLabel}
    >
      <>
        {filters.map((filter, index) => {
          const { label, activeFilter } = getLabel(filter);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Label image key={index} onClick={() => removeActiveFilter(activeFilter)}>
              {label}
              <Icon name="delete" />
            </Label>
          );
        })}
      </>
    </Overridable>
  );
};

Element.propTypes = {
  filters: PropTypes.array.isRequired,
  removeActiveFilter: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  overridableId: "",
};

export default Overridable.component("ActiveFilters", ActiveFilters);
