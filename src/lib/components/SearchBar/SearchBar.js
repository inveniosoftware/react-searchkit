/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import Overridable from "react-overridable";
import { Input } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateQueryString = props.updateQueryString;
    this.state = {
      currentValue: props.queryString || "",
    };
  }

  onInputChange = (queryString) => {
    this.setState({
      currentValue: queryString,
    });
  };

  executeSearch = () => {
    const { currentValue } = this.state;
    this.updateQueryString(currentValue);
  };

  onBtnSearchClick = () => {
    this.executeSearch();
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
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
    const { currentValue } = this.state;
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
        queryString={currentValue}
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
  uiProps: PropTypes.object,
  /* REDUX */
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  actionProps: null,
  autofocus: false,
  executeSearch: null,
  onBtnSearchClick: null,
  onInputChange: null,
  onKeyPress: null,
  overridableId: "",
  placeholder: "",
  queryString: "",
  uiProps: null,
};

// NOTE: Adding the key prop, will recreate the SearchBar in order to update
// state with the latest redux queryString value.
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
const SearchBarUncontrolled = (props) => {
  const { queryString } = props;
  return <SearchBar key={queryString} {...props} />;
};

SearchBarUncontrolled.propTypes = {
  queryString: PropTypes.string,
};

SearchBarUncontrolled.defaultProps = {
  queryString: "",
};

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
    const { buildUID } = this.context;

    return (
      <Overridable
        id={buildUID("SearchBar.element", overridableId)}
        queryString={queryString}
        onBtnSearchClick={onBtnSearchClick}
        onInputChange={onInputChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        actionProps={actionProps}
        uiProps={uiProps}
      >
        <Input
          action={{
            content: "Search",
            onClick: onBtnSearchClick,
            ...actionProps,
          }}
          fluid
          {...uiProps}
          placeholder={placeholder || "Type something"}
          onChange={(_, { value }) => {
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

Element.propTypes = {
  actionProps: PropTypes.object,
  autofocus: PropTypes.bool,
  onBtnSearchClick: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  overridableId: PropTypes.string,
  placeholder: PropTypes.string,
  queryString: PropTypes.string,
  uiProps: PropTypes.object,
};

Element.defaultProps = {
  actionProps: null,
  autofocus: false,
  onBtnSearchClick: null,
  onInputChange: null,
  onKeyPress: null,
  overridableId: "",
  placeholder: "",
  queryString: "",
  uiProps: null,
};

Element.contextType = AppContext;

export default Overridable.component("SearchBar", SearchBarUncontrolled);
