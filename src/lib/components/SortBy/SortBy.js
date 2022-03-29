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

class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySortBy = props.updateQuerySortBy;
  }

  onChange = (value) => {
    const { currentSortBy } = this.props;
    if (value === currentSortBy) return;
    this.updateQuerySortBy(value);
  };

  render() {
    const {
      currentSortBy,
      loading,
      totalResults,
      label,
      overridableId,
      ariaLabel,
      selectOnNavigation,
    } = this.props;
    return (
      <ShouldRender condition={currentSortBy !== null && !loading && totalResults > 0}>
        {label(
          <Element
            currentSortBy={currentSortBy}
            options={this.options}
            onValueChange={this.onChange}
            overridableId={overridableId}
            ariaLabel={ariaLabel}
            selectOnNavigation={selectOnNavigation}
          />
        )}
      </ShouldRender>
    );
  }
}

SortBy.propTypes = {
  values: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  currentSortBy: PropTypes.string,
  updateQuerySortBy: PropTypes.func.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
};

SortBy.defaultProps = {
  currentSortBy: null,
  label: (cmp) => cmp,
  overridableId: "",
  ariaLabel: "Sort Results By",
  selectOnNavigation: false,
};

const Element = ({
  overridableId,
  currentSortBy,
  options,
  onValueChange,
  ariaLabel,
  selectOnNavigation,
  ...props
}) => {
  const { buildUID } = useContext(AppContext);

  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });

  return (
    <Overridable id={buildUID("SortBy.element", overridableId)} {...props}>
      <Dropdown
        selection
        compact
        options={_options}
        value={currentSortBy}
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
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
};

Element.defaultProps = {
  currentSortBy: null,
  overridableId: "",
  ariaLabel: "Sort Results By",
  selectOnNavigation: false,
};

export default Overridable.component("SortBy", SortBy);
