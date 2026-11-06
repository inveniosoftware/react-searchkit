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

class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
  }

  onChange = (value) => {
    const { currentSortOrder } = this.props;
    if (value === currentSortOrder) return;
    this.updateQuerySortOrder(value);
  };

  render() {
    const {
      currentSortOrder = null,
      loading,
      totalResults,
      label = (cmp) => cmp,
      overridableId = "",
      ariaLabel = i18next.t("Sort Order"),
      selectOnNavigation = false,
    } = this.props;
    return (
      <ShouldRender
        condition={currentSortOrder !== null && !loading && totalResults > 0}
      >
        {label(
          <Element
            currentSortOrder={currentSortOrder}
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

SortOrder.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  /* REDUX */
  currentSortOrder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
};

const Element = ({
  overridableId = "",
  currentSortOrder = null,
  options,
  onValueChange,
  ariaLabel = i18next.t("Sort Order"),
  selectOnNavigation = false,
}) => {
  const { buildUID } = useContext(AppContext);

  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });

  return (
    <Overridable
      id={buildUID("SortOrder.element", overridableId)}
      options={options}
      currentSortOrder={currentSortOrder}
      onValueChange={onValueChange}
      ariaLabel={ariaLabel}
      selectOnNavigation={selectOnNavigation}
    >
      <Dropdown
        selection
        compact
        options={_options}
        value={currentSortOrder}
        onChange={(_, { value }) => onValueChange(value)}
        aria-label={ariaLabel}
        selectOnNavigation={selectOnNavigation}
      />
    </Overridable>
  );
};

Element.propTypes = {
  options: PropTypes.array.isRequired,
  currentSortOrder: PropTypes.string,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
};

export default Overridable.component("SortOrder", SortOrder);
