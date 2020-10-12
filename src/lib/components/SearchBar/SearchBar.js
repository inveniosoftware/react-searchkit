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
import Overridable from 'react-overridable';
import { buildUID } from '../../util';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateQueryString = this.props.updateQueryString;
    this.state = {
      currentValue: this.props.queryString || '',
    };
  }

  onInputChange = (queryString) => {
    this.setState({
      currentValue: queryString,
    });
  };

  executeSearch = () => {
    this.updateQueryString(this.state.currentValue);
  };

  onBtnSearchClick = (event, input) => {
    this.executeSearch();
  };

  onKeyPress = (event, input) => {
    if (event.key === 'Enter') {
      this.executeSearch();
    }
  };

  render() {
    const {
      actionProps,
      autofocus,
      executeSearch,
      onBtnSearchClick,
      onInputChange,
      onKeyPress,
      overridableId,
      placeholder,
      uiProps,
    } = this.props;
    return (
      <Element
        actionProps={actionProps}
        autofocus={autofocus}
        executeSearch={executeSearch || this.executeSearch}
        onBtnSearchClick={onBtnSearchClick || this.onBtnSearchClick}
        onInputChange={onInputChange || this.onInputChange}
        onKeyPress={onKeyPress || this.onKeyPress}
        overridableId={overridableId}
        placeholder={placeholder}
        queryString={this.state.currentValue}
        uiProps={uiProps}
      />
    );
  }
}

SearchBar.propTypes = {
  actionProps: PropTypes.object,
  autofocus: PropTypes.bool,
  executeSearch: PropTypes.func,
  onBtnSearchClick: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  overridableId: PropTypes.string,
  placeholder: PropTypes.string,
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  uiProps: PropTypes.object,
};

SearchBar.defaultProps = {
  actionProps: null,
  autofocus: false,
  executeSearch: null,
  onBtnSearchClick: null,
  onInputChange: null,
  onKeyPress: null,
  overridableId: '',
  placeholder: '',
  queryString: '',
  uiProps: null,
};

// NOTE: Adding the key prop, will recreate the SearchBar in order to update
// state with the latest redux queryString value.
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
const SearchBarUncontrolled = (props) => (
  <SearchBar key={props.queryString} {...props} />
);

class Element extends Component {
  componentDidMount() {
    const { autofocus } = this.props;
    if (autofocus && this.focusInput) {
      this.focusInput.focus();
    }
  }

  render() {
    const {
      actionProps,
      onBtnSearchClick,
      onInputChange,
      onKeyPress,
      overridableId,
      placeholder,
      queryString,
      uiProps,
    } = this.props;

    return (
      <Overridable
        id={buildUID('SearchBar.element', overridableId)}
        {...this.props}
      >
        <Input
          action={{
            content: 'Search',
            onClick: onBtnSearchClick,
            ...actionProps,
          }}
          fluid
          {...uiProps}
          placeholder={placeholder || 'Type something'}
          onChange={(event, { value }) => {
            onInputChange(value);
          }}
          value={queryString}
          onKeyPress={onKeyPress}
          ref={(input) => {
            this.focusInput = input;
          }}
        />
      </Overridable>
    );
  }
}

export default Overridable.component('SearchBar', SearchBarUncontrolled);
