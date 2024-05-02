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

class ResultsPerPage extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySize = props.updateQuerySize;
  }

  onChange = (value) => {
    const { currentSize } = this.props;
    if (value === currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const {
      loading,
      currentSize,
      totalResults,
      label,
      overridableId,
      ariaLabel,
      selectOnNavigation,
      showWhenOnlyOnePage,
    } = this.props;
    return (
      <ShouldRender
        condition={
          !loading && currentSize !== -1 && showWhenOnlyOnePage
            ? totalResults > 0
            : totalResults > currentSize
        }
      >
        {label(
          <Element
            currentSize={currentSize}
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

ResultsPerPage.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  showWhenOnlyOnePage: PropTypes.bool,
  /* REDUX */
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySize: PropTypes.func.isRequired,
};

ResultsPerPage.defaultProps = {
  label: (cmp) => cmp,
  overridableId: "",
  ariaLabel: "Results per page",
  selectOnNavigation: false,
  showWhenOnlyOnePage: true,
};

const Element = ({
  overridableId,
  currentSize,
  options,
  onValueChange,
  ariaLabel,
  selectOnNavigation,
}) => {
  const { buildUID } = useContext(AppContext);
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });

  return (
    <Overridable
      id={buildUID("ResultsPerPage.element", overridableId)}
      currentSize={currentSize}
      options={options}
      onValueChange={onValueChange}
      ariaLabel={ariaLabel}
      selectOnNavigation={selectOnNavigation}
    >
      <Dropdown
        inline
        compact
        options={_options}
        value={currentSize}
        onChange={(e, { value }) => onValueChange(value)}
        aria-label={ariaLabel}
        selectOnNavigation={selectOnNavigation}
      />
    </Overridable>
  );
};

Element.propTypes = {
  currentSize: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  ariaLabel: "Results per page",
  selectOnNavigation: false,
  overridableId: "",
};

export default Overridable.component("ResultsPerPage", ResultsPerPage);
