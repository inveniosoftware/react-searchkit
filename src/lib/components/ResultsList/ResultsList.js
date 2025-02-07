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
import { Item } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

function ResultsList({
  loading,
  totalResults,
  results,
  overridableId,
  onResultsRendered,
}) {
  useEffect(() => {
    if (onResultsRendered) {
      onResultsRendered();
    }
  }, [onResultsRendered]);

  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      <Element results={results} overridableId={overridableId} />
    </ShouldRender>
  );
}

ResultsList.propTypes = {
  overridableId: PropTypes.string,
  onResultsRendered: PropTypes.func,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
};

ResultsList.defaultProps = {
  overridableId: "",
  onResultsRendered: () => {},
};

const ListItem = ({ result, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable id={buildUID("ResultsList.item", overridableId)} result={result}>
      <Item href={`#${result.id}`}>
        <Item.Image size="small" src={result.imgSrc || "https://placehold.co/200"} />
        <Item.Content>
          <Item.Header>{result.title}</Item.Header>
          <Item.Description>{result.description}</Item.Description>
        </Item.Content>
      </Item>
    </Overridable>
  );
};

ListItem.propTypes = {
  result: PropTypes.object.isRequired,
  overridableId: PropTypes.string.isRequired,
};

const Element = ({ results, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  const _results = results.map((result, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem result={result} key={index} overridableId={overridableId} />
  ));

  return (
    <Overridable
      id={buildUID("ResultsList.container", overridableId)}
      results={_results}
    >
      <Item.Group divided relaxed link>
        {_results}
      </Item.Group>
    </Overridable>
  );
};

Element.propTypes = {
  results: PropTypes.array.isRequired,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  overridableId: "",
};

export default Overridable.component("ResultsList", ResultsList);
