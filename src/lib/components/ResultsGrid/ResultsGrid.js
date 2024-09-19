/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import Overridable from "react-overridable";
import { Card, Image } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

function ResultsGrid({ loading, totalResults, results, resultsPerRow, overridableId, onResultsRendered }) {

  useEffect(() => {
    if (onResultsRendered) {
      onResultsRendered();
    }

    return () => {
      if (onResultsRendered) {
        onResultsRendered = null;
      }
    };
  }, [onResultsRendered]);

  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element
        results={results}
        resultsPerRow={resultsPerRow}
        overridableId={overridableId}
      />
    </ShouldRender>
  );
}

ResultsGrid.propTypes = {
  resultsPerRow: PropTypes.number,
  overridableId: PropTypes.string,
  onResultsRendered: PropTypes.func,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
};

ResultsGrid.defaultProps = {
  resultsPerRow: 3,
  overridableId: "",
  onResultsRendered: () => {},
};

const GridItem = ({ result, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable id={buildUID("ResultsGrid.item", overridableId)} result={result}>
      <Card fluid href={`#${result.id}`}>
        <Image src={result.imgSrc || "http://placehold.it/200"} />
        <Card.Content>
          <Card.Header>{result.title}</Card.Header>
          <Card.Description>{result.description}</Card.Description>
        </Card.Content>
      </Card>
    </Overridable>
  );
};

GridItem.propTypes = {
  result: PropTypes.object.isRequired,
  overridableId: PropTypes.string.isRequired,
};

const Element = ({ overridableId, results, resultsPerRow }) => {
  const { buildUID } = useContext(AppContext);

  const _results = results.map((result, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <GridItem key={index} result={result} overridableId={overridableId} />
  ));

  return (
    <Overridable
      id={buildUID("ResultsGrid.container", overridableId)}
      results={_results}
      resultsPerRow={resultsPerRow}
    >
      <Card.Group itemsPerRow={resultsPerRow}>{_results}</Card.Group>
    </Overridable>
  );
};

Element.propTypes = {
  results: PropTypes.array.isRequired,
  resultsPerRow: PropTypes.number,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  resultsPerRow: 3,
  overridableId: "",
};

export default Overridable.component("ResultsGrid", ResultsGrid);
