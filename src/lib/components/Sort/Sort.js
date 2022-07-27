/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 * Copyright (C) 2022 NYU.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Dropdown } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySorting = props.updateQuerySorting;

    this.options.forEach(
      (option) =>
        (option["value"] = this._computeValue(option.sortBy, option.sortOrder))
    );
  }

  _computeValue = (sortBy, sortOrder) => {
    return sortOrder ? `${sortBy}-${sortOrder}` : sortBy;
  };

  onChange = (value) => {
    const { currentSortBy, currentSortOrder } = this.props;
    if (value === this._computeValue(currentSortBy, currentSortOrder)) return;
    const selected = this.options.find((option) => option.value === value);
    this.updateQuerySorting(selected.sortBy, selected.sortOrder);
  };

  render() {
    const {
      currentSortBy,
      currentSortOrder,
      loading,
      totalResults,
      label,
      overridableId,
      sortOrderDisabled,
      ariaLabel,
      selectOnNavigation,
    } = this.props;
    return (
      <ShouldRender
        condition={
          currentSortBy !== null &&
          (sortOrderDisabled || currentSortBy !== null) &&
          !loading &&
          totalResults > 0
        }
      >
        {label(
          <Element
            currentSortBy={currentSortBy}
            currentSortOrder={currentSortOrder}
            options={this.options}
            onValueChange={this.onChange}
            computeValue={this._computeValue}
            overridableId={overridableId}
            ariaLabel={ariaLabel}
            selectOnNavigation={selectOnNavigation}
          />
        )}
      </ShouldRender>
    );
  }
}

Sort.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
  sortOrderDisabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  /* REDUX */
  currentSortBy: PropTypes.string,
  currentSortOrder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySorting: PropTypes.func.isRequired,
};

Sort.defaultProps = {
  currentSortBy: null,
  currentSortOrder: null,
  label: (cmp) => <>
      <label className="min-width-max-content rel-mr-1">Sort by</label>
      {cmp}
    </>,
  overridableId: "",
  sortOrderDisabled: false,
  ariaLabel: "Sort",
  selectOnNavigation: false,
};

const Element = ({
  overridableId,
  currentSortBy,
  currentSortOrder,
  options,
  onValueChange,
  computeValue,
  ariaLabel,
  selectOnNavigation,
}) => {
  const { buildUID } = useContext(AppContext);
  const selected = computeValue(currentSortBy, currentSortOrder);
  const _options = options.map((element, index) => {
    return {
      key: index,
      text: element.text,
      value: element.value,
    };
  });
  return (
    <Overridable
      id={buildUID("Sort.element", overridableId)}
      options={options}
      currentSortBy={currentSortBy}
      currentSortOrder={currentSortOrder}
      onValueChange={onValueChange}
      ariaLabel={ariaLabel}
      selectOnNavigation={selectOnNavigation}
    >
      <Dropdown
        selection
        options={_options}
        value={selected}
        onChange={(e, { value }) => onValueChange(value)}
        aria-label={ariaLabel}
        selectOnNavigation={selectOnNavigation}
      />
    </Overridable>
  );
};

Element.propTypes = {
  options: PropTypes.array.isRequired,
  currentSortBy: PropTypes.string,
  currentSortOrder: PropTypes.string,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  computeValue: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

Element.defaultProps = {
  currentSortBy: null,
  currentSortOrder: null,
  overridableId: "",
  ariaLabel: "Sort",
  selectOnNavigation: false,
};

export default Overridable.component("Sort", Sort);
