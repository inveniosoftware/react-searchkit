/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { Overridable } from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

export default function ResultsList({
  loading,
  totalResults,
  results,
  overridableUID,
}) {
  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element results={results} overridableUID={overridableUID} />
    </ShouldRender>
  );
}

ResultsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  overridableUID: PropTypes.string,
};

ResultsList.defaultProps = {
  overridableUID: '',
};

const ListItem = ({ result, index, overridableUID }) => (
  <Overridable
    id={buildUID('ResultsList.item', overridableUID)}
    result={result}
    index={index}
  >
    <Item key={index} href={`#${result.id}`}>
      <Item.Image
        size="small"
        src={result.imgSrc || 'http://placehold.it/200'}
      />
      <Item.Content>
        <Item.Header>{result.title}</Item.Header>
        <Item.Description>{result.description}</Item.Description>
      </Item.Content>
    </Item>
  </Overridable>
);

const Element = ({ results, overridableUID }) => {
  const _results = results.map((result, index) => (
    <ListItem
      result={result}
      index={index}
      key={index}
      overridableUID={overridableUID}
    />
  ));

  return (
    <Overridable
      id={buildUID('ResultsList.container', overridableUID)}
      results={_results}
    >
      <Item.Group divided relaxed link>
        {_results}
      </Item.Group>
    </Overridable>
  );
};
