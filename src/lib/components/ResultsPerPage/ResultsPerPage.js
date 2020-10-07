/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';
import { Dropdown } from 'semantic-ui-react';
import Overridable from 'react-overridable';

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
    const {
      loading,
      currentSize,
      totalResults,
      label,
      overridableId,
    } = this.props;
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
};

ResultsPerPage.defaultProps = {
  label: (cmp) => cmp,
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const { currentSize, options, onValueChange } = props;
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
      />
    </Overridable>
  );
};

export default Overridable.component('ResultsPerPage', ResultsPerPage);
