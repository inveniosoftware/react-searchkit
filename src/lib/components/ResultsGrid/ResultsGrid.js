/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

export default function ResultsGrid({
  loading,
  totalResults,
  results,
  resultsPerRow,
  overridableUID,
}) {
  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element
        results={results}
        resultsPerRow={resultsPerRow}
        overridableUID={overridableUID}
      />
    </ShouldRender>
  );
}

ResultsGrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  resultsPerRow: PropTypes.number,
  overridableUID: PropTypes.string,
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
  overridableUID: '',
};

const GridItem = ({ result, index, overridableUID }) => (
  <Overridable
    id={buildUID('ResultsGrid.item', overridableUID)}
    result={result}
    index={index}
  >
    <Card fluid key={index} href={`#${result.id}`}>
      <Image src={result.imgSrc || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header>{result.title}</Card.Header>
        <Card.Description>{result.description}</Card.Description>
      </Card.Content>
    </Card>
  </Overridable>
);

const Element = ({ overridableUID, ...props }) => {
  const { results, resultsPerRow } = props;
  const _results = results.map((result, index) => (
    <GridItem
      key={index}
      result={result}
      index={index}
      overridableUID={overridableUID}
    />
  ));

  return (
    <Overridable
      id={buildUID('ResultsGrid.container', overridableUID)}
      {...props}
    >
      <Card.Group itemsPerRow={resultsPerRow}>{_results}</Card.Group>
    </Overridable>
  );
};
