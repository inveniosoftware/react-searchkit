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
import { Overridable } from 'react-overridable';
import { ShouldRender } from '../ShouldRender';

export default function ResultsGrid({
  loading,
  totalResults,
  results,
  resultsPerRow,
}) {
  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element results={results} resultsPerRow={resultsPerRow} />
    </ShouldRender>
  );
}

ResultsGrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  resultsPerRow: PropTypes.number,
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
};

const GridItem = ({ result, index }) => (
  <Overridable id="ResultsGrid.item" result={result} index={index}>
    <Card fluid key={index} href={`#${result.id}`}>
      <Image src={result.imgSrc || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header>{result.title}</Card.Header>
        <Card.Description>{result.description}</Card.Description>
      </Card.Content>
    </Card>
  </Overridable>
);

const Element = ({ results, resultsPerRow }) => {
  const _results = results.map((result, index) => (
    <GridItem result={result} index={index} />
  ));

  return (
    <Overridable id="ResultsGrid.container">
      <Card.Group itemsPerRow={resultsPerRow}>{_results}</Card.Group>
    </Overridable>
  );
};
