/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component, useContext } from 'react';
import Overridable from 'react-overridable';
import { Dropdown } from 'semantic-ui-react';
import { AppContext } from '../ReactSearchKit';
import { ShouldRender } from '../ShouldRender';

class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
  }

  onChange = (value) => {
    if (value === this.props.currentSortOrder) return;
    this.updateQuerySortOrder(value);
  };

  render() {
    const { currentSortOrder, loading, totalResults, label, overridableId } =
      this.props;
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
          />
        )}
      </ShouldRender>
    );
  }
}

SortOrder.propTypes = {
  values: PropTypes.array.isRequired,
  currentSortOrder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
};

SortOrder.defaultProps = {
  currentSortOrder: null,
  label: (cmp) => cmp,
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const { currentSortOrder, options, onValueChange } = props;
  const { buildUID } = useContext(AppContext);

  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });

  return (
    <Overridable id={buildUID('SortOrder.element', overridableId)} {...props}>
      <Dropdown
        selection
        compact
        options={_options}
        value={currentSortOrder}
        onChange={(e, { value }) => onValueChange(value)}
      />
    </Overridable>
  );
};

export default Overridable.component('SortOrder', SortOrder);
