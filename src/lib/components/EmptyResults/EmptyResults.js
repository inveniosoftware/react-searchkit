/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

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
      ...props
    } = this.props;
    return (
      <ShouldRender
        condition={!loading && _isEmpty(error) && totalResults === 0}
      >
        <Element
          {...props}
          queryString={queryString}
          resetQuery={this.resetQuery}
          extraContent={extraContent}
          overridableId={overridableId}
        />
      </ShouldRender>
    );
  }
}

EmptyResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  resetQuery: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

EmptyResults.defaultProps = {
  queryString: '',
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const { queryString, resetQuery } = props;
  return (
    <Overridable
      id={buildUID('EmptyResults.element', overridableId)}
      {...props}
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
      </Segment>
    </Overridable>
  );
};

export default Overridable.component('EmptyResults', EmptyResults);
