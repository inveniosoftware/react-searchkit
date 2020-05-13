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
import Overridable from 'react-overridable';
import './AutocompleteSearchBar.scss';
import { buildUID } from '../../util';

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
    this.handleAutocompleteChange =
      props.handleAutocompleteChange || this._handleAutocompleteChange;
  }

  _handleAutocompleteChange = (suggestionString) => {
    if (suggestionString.length >= this.minCharsToAutocomplete) {
      this.updateSuggestions(suggestionString);
    }
  };

  onInputChange = async (queryString) => {
    await this.setState({
      currentValue: queryString,
    });

    this.handleAutocompleteChange(this.state.currentValue);
  };

  executeSearch = () => {
    this.updateQueryString(this.state.currentValue);
  };

  render() {
    const { placeholder, suggestions, overridableUID } = this.props;
    return (
      <Element
        placeholder={placeholder}
        queryString={this.state.currentValue}
        querySuggestions={suggestions}
        onInputChange={this.onInputChange}
        executeSearch={this.executeSearch}
        overridableUID={overridableUID}
      />
    );
  }
}

AutocompleteSearchBar.propTypes = {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  updateSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  handleAutocompleteChange: PropTypes.func,
  debounce: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  minCharsToAutocomplete: PropTypes.number,
  overridableUID: PropTypes.string,
};

AutocompleteSearchBar.defaultProps = {
  handleAutocompleteChange: null,
  placeholder: 'Type something',
  minCharsToAutocomplete: 3,
  overridableUID: '',
};

const AutocompleteSearchBarUncontrolled = (props) => (
  <AutocompleteSearchBar key={props.queryString} {...props} />
);

const Element = ({ overridableUID, ...props }) => {
  const {
    placeholder,
    queryString,
    querySuggestions,
    onInputChange,
    executeSearch,
  } = props;
  const onBtnSearchClick = (event, input) => {
    executeSearch();
  };
  const onKeyPress = (event, input) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <Overridable
      id={buildUID('AutocompleteSearchBar.element', overridableUID)}
      {...props}
    >
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
        <Suggestions
          querySuggestions={querySuggestions}
          overridableUID={overridableUID}
        />
      </div>
    </Overridable>
  );
};

const Suggestions = ({ overridableUID, ...props }) => {
  const { querySuggestions } = props;
  const onSuggestionSelected = async (suggestion) => {
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
    <Overridable
      id={buildUID('AutocompleteSearchBar.suggestions', overridableUID)}
      {...props}
    >
      <ul>
        {querySuggestions.map((text) => (
          <li onClick={() => onSuggestionSelected(text)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </Overridable>
  );
};

export default Overridable.component(
  'AutocompleteSearchBar',
  AutocompleteSearchBarUncontrolled
);
