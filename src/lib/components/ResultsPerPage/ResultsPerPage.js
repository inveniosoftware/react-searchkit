/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-FileCopyrightText: 2022 NYU.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Dropdown } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";
import { i18next } from "@translations/i18next";

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
      label = (cmp) => cmp,
      overridableId = "",
      ariaLabel = i18next.t("Results per page"),
      selectOnNavigation = false,
      showWhenOnlyOnePage = true,
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

const Element = ({
  overridableId = "",
  currentSize,
  options,
  onValueChange,
  ariaLabel = i18next.t("Results per page"),
  selectOnNavigation = false,
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

export default Overridable.component("ResultsPerPage", ResultsPerPage);
