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

  _renderElement(placeholder, queryString, onInputChange, executeSearch) {
    placeholder = placeholder || 'Type something';
    const onBtnSearchClick = (event, input) => {
      executeSearch();
    };
    const onKeyPress = (event, input) => {
      if (event.key === 'Enter') {
        executeSearch();
      }
    };
    return (
      <Input
        action={{
          content: 'Search',
          onClick: onBtnSearchClick,
        }}
        fluid
        placeholder={placeholder}
        onChange={(event, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        onKeyPress={onKeyPress}
      />
    );
  }

  onInputChange = queryString => {
    this.setState({
      currentValue: queryString,
    });
  };

  executeSearch = () => {
    this.updateQueryString(this.state.currentValue);
  };

  render() {
    const { placeholder } = this.props;
    return this.renderElement(
      placeholder,
      this.state.currentValue,
      this.onInputChange,
      this.executeSearch
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
