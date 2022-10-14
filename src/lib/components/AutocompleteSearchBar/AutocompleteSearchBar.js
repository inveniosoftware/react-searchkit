/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Input, Button } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import "./AutocompleteSearchBar.scss";

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
      currentValue: this.props.queryString || "",
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
    const { placeholder, suggestions, overridableId } = this.props;
    return (
      <Element
        placeholder={placeholder}
        queryString={this.state.currentValue}
        querySuggestions={suggestions}
        onInputChange={this.onInputChange}
        executeSearch={this.executeSearch}
        overridableId={overridableId}
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
  overridableId: PropTypes.string,
};

AutocompleteSearchBar.defaultProps = {
  handleAutocompleteChange: null,
  placeholder: "Type something",
  minCharsToAutocomplete: 3,
  overridableId: "",
};

const AutocompleteSearchBarUncontrolled = (props) => (
  <AutocompleteSearchBar key={props.queryString} {...props} />
);

const Element = ({
  overridableId,
  placeholder,
  queryString,
  querySuggestions,
  onInputChange,
  executeSearch,
  ...props
}) => {
  const { buildUID } = useContext(AppContext);
  const onBtnSearchClick = (event, input) => {
    executeSearch();
  };
  const onKeyPress = (event, input) => {
    if (event.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <Overridable
      id={buildUID("AutocompleteSearchBar.element", overridableId)}
      {...props}
    >
      <div className="AutoCompleteText">
        <Input
          action={{
            content: "Search",
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
          overridableId={overridableId}
        />
      </div>
    </Overridable>
  );
};

const Suggestions = ({ overridableId, ...props }) => {
  const { querySuggestions } = props;
  const { buildUID } = useContext(AppContext);
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
      id={buildUID("AutocompleteSearchBar.suggestions", overridableId)}
      {...props}
    >
      <ul>
        {querySuggestions.map((text) => (
          <Button as="li" onClick={() => onSuggestionSelected(text)} key={text}>
            {text}
          </Button>
        ))}
      </ul>
    </Overridable>
  );
};

export default Overridable.component(
  "AutocompleteSearchBar",
  AutocompleteSearchBarUncontrolled
);
