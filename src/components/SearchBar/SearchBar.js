/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateQueryString = this.props.updateQueryString;
    this.state = {
      currentValue: this.props.queryString || '',
    };
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement(placeholder, value, onInputChange, onUpdateQuery) {
    placeholder = placeholder || 'Type something';
    const onChange = (event, input) => {
      onInputChange(input);
    };
    const onClick = (event, input) => {
      onUpdateQuery();
    };
    const onKeyPress = (event, input) => {
      if (event.key === 'Enter') {
        onUpdateQuery();
      }
    };
    return (
      <Input
        action={{
          content: 'Search',
          onClick: onClick,
        }}
        fluid
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyPress={onKeyPress}
      />
    );
  }

  onInputChange = input => {
    this.setState({
      currentValue: input.value,
    });
  };

  onUpdateQuery = () => {
    this.updateQueryString(this.state.currentValue);
  };

  render() {
    const { placeholder } = this.props;
    return this.renderElement(
      placeholder,
      this.state.currentValue,
      this.onInputChange,
      this.onUpdateQuery
    );
  }
}

SearchBar.propTypes = {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

SearchBar.defaultProps = {
  renderElement: null,
};

const SearchBarUncontrolled = props => (
  <SearchBar key={props.queryString} {...props} />
);
export default SearchBarUncontrolled;
