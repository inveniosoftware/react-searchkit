/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

class EmptyResults extends Component {
  constructor(props) {
    super(props);
    this.resetQuery = props.resetQuery;
  }

  render() {
    const {
      loading,
      totalResults,
      error,
      queryString,
      extraContent,
      overridableId,
      userSelectionFilters,
      ...props
    } = this.props;
    return (
      <ShouldRender condition={!loading && _isEmpty(error) && totalResults === 0}>
        <Element
          {...props}
          queryString={queryString}
          resetQuery={this.resetQuery}
          extraContent={extraContent}
          userSelectionFilters={userSelectionFilters}
          overridableId={overridableId}
        />
      </ShouldRender>
    );
  }
}

EmptyResults.propTypes = {
  extraContent: PropTypes.node,
  overridableId: PropTypes.string,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  resetQuery: PropTypes.func.isRequired,
  userSelectionFilters: PropTypes.array.isRequired,
};

EmptyResults.defaultProps = {
  queryString: "",
  extraContent: null,
  overridableId: "",
};

const Element = ({
  overridableId,
  queryString,
  resetQuery,
  extraContent,
  userSelectionFilters,
}) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("EmptyResults.element", overridableId)}
      queryString={queryString}
      resetQuery={resetQuery}
      extraContent={extraContent}
      userSelectionFilters={userSelectionFilters}
    >
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="search" />
          No results found!
        </Header>
        {queryString && <em>Current search "{queryString}"</em>}
        <br />
        <Button primary onClick={() => resetQuery()}>
          Clear query
        </Button>
        {extraContent}
      </Segment>
    </Overridable>
  );
};

Element.propTypes = {
  queryString: PropTypes.string,
  resetQuery: PropTypes.func.isRequired,
  extraContent: PropTypes.node,
  overridableId: PropTypes.string,
  userSelectionFilters: PropTypes.array.isRequired,
};

Element.defaultProps = {
  queryString: "",
  extraContent: null,
  overridableId: "",
};

export default Overridable.component("EmptyResults", EmptyResults);
