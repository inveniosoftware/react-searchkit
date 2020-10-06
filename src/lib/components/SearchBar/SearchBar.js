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
      isAfterSearch: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isAfterSearch && props.queryString !== state.currentValue) {
      return {
        currentValue: props.queryString,
        isAfterSearch: false,
      };
    }
    return null;
  }

  onInputChange = (queryString) => {
    this.setState({
      currentValue: queryString,
    });
  };

  executeSearch = () => {
    this.updateQueryString(this.state.currentValue);
    this.setState({ isAfterSearch: true });
  };

  render() {
    const { placeholder, overridableId } = this.props;
    return (
      <Element
        placeholder={placeholder}
        queryString={this.state.currentValue}
        onInputChange={this.onInputChange}
        executeSearch={this.executeSearch}
        overridableId={overridableId}
        onQueryChange={() => console.log('Query Changed?')}
      />
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  queryString: PropTypes.string.isRequired,
  updateQueryString: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: '',
  queryString: '',
  overridableId: '',
};

// NOTE: This is actually the recommended approach from React.
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
const SearchBarUncontrolled = (props) => {
  return <SearchBar key={props.queryString} {...props} />;
};

// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#alternative-1-reset-uncontrolled-component-with-an-id-prop
const SearchControlled = (props) => {
  return <SearchBar {...props} />;
};

const Element = ({ overridableId, ...props }) => {
  const {
    placeholder: passedPlaceholder,
    queryString,
    onInputChange,
    executeSearch,
  } = props;
  const placeholder = passedPlaceholder || 'Type something';
  const onBtnSearchClick = (event, input) => {
    executeSearch();
  };
  const onKeyPress = (event, input) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };
  return (
    <Overridable id={buildUID('SearchBar.element', overridableId)} {...props}>
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
    </Overridable>
  );
};

export default Overridable.component('SearchBar', SearchControlled);
