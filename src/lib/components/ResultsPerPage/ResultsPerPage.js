/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 * Copyright (C) 2022 NYU.
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

class ResultsPerPage extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.updateQuerySize = this.props.updateQuerySize;
  }

  onChange = (value) => {
    if (value === this.props.currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const { loading, currentSize, totalResults, label, overridableId, ariaLabel, selectOnNavigation } =
      this.props;
    return (
      <ShouldRender
        condition={!loading && totalResults > 0 && currentSize !== -1}
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
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  updateQuerySize: PropTypes.func.isRequired,
  label: PropTypes.func,
  overridableId: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectOnNavigation: PropTypes.bool
};

ResultsPerPage.defaultProps = {
  label: (cmp) => cmp,
  overridableId: '',
  ariaLabel: 'Results per page',
  selectOnNavigation: false
};

const Element = ({ overridableId, ...props }) => {
  const { currentSize, options, onValueChange, ariaLabel, selectOnNavigation } = props;
  const { buildUID } = useContext(AppContext);
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });

  return (
    <Overridable
      id={buildUID('ResultsPerPage.element', overridableId)}
      {...props}
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

export default Overridable.component('ResultsPerPage', ResultsPerPage);
