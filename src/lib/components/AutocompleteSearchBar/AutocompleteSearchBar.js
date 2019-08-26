/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import './AutocompleteSearchBar.scss';

class AutocompleteSearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateQueryString = this.props.updateQueryString;
    this.updateSuggestions = this.props.debounce
      ? _.debounce(this.props.updateSuggestions, this.props.debounceTime, {
          leading: true,
        })
      : this.props.updateSuggestions;
    this.clearSuggestions = this.props.clearSuggestions;
    this.minCharsToAutocomplete = this.props.minCharsToAutocomplete;
    this.state = {
      currentValue: this.props.queryString || '',
    };
    this.renderElement = props.renderElement || this._renderElement;
    this.renderSuggestions = props.renderSuggestions || this._renderSuggestions;
    this.handleAutocompleteChange =
      props.handleAutocompleteChange || this._handleAutocompleteChange;
  }

  _handleAutocompleteChange = suggestionString => {
    if (suggestionString.length >= this.minCharsToAutocomplete) {
      this.updateSuggestions(suggestionString);
    }
  };

  onInputChange = async queryString => {
    await this.setState({
      currentValue: queryString,
    });

    this.handleAutocompleteChange(this.state.currentValue);
  };

  executeSearch = () => {
    this.updateQueryString(this.state.currentValue);
  };

  _renderSuggestions(querySuggestions) {
    const onSuggestionSelected = async suggestion => {
      await this.setState({
        currentValue: suggestion,
      });
      this.clearSuggestions();
      this.executeSearch();
    };

    if (querySuggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {querySuggestions.map(text => (
          <li onClick={() => onSuggestionSelected(text)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    );
  }

  _renderElement(
    placeholder,
    queryString,
    querySuggestions,
    onInputChange,
    executeSearch
  ) {
    const onBtnSearchClick = (event, input) => {
      executeSearch();
    };
    const onKeyPress = (event, input) => {
      if (event.key === 'Enter') {
        executeSearch();
      }
    };

    return (
      <div className="AutoCompleteText">
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
        {this.renderSuggestions(querySuggestions)}
      </div>
    );
  }

  render() {
    const { placeholder, suggestions } = this.props;
    return this.renderElement(
      placeholder,
      this.state.currentValue,
      suggestions,
      this.onInputChange,
      this.executeSearch
    );
  }
}

AutocompleteSearchBar.propTypes = {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  updateSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
  renderSuggestions: PropTypes.func,
  handleAutocompleteChange: PropTypes.func,
  debounce: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  minCharsToAutocomplete: PropTypes.number,
};

AutocompleteSearchBar.defaultProps = {
  renderElement: null,
  renderSuggestions: null,
  handleAutocompleteChange: null,
  placeholder: 'Type something',
  minCharsToAutocomplete: 3,
};

const AutocompleteSearchBarUncontrolled = props => (
  <AutocompleteSearchBar key={props.queryString} {...props} />
);
export default AutocompleteSearchBarUncontrolled;
