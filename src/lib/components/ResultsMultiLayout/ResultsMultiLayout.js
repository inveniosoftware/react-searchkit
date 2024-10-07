/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { useContext } from "react";
import Overridable from "react-overridable";
import { AppContext } from "../ReactSearchKit";
import { ResultsGrid } from "../ResultsGrid";
import { ResultsList } from "../ResultsList";
import { ShouldRender } from "../ShouldRender";

function ResultsMultiLayout({
  loading,
  totalResults,
  currentLayout,
  overridableId,
  onResultsRendered,
}) {
  return (
    <ShouldRender condition={currentLayout != null && !loading && totalResults > 0}>
      <Element
        layout={currentLayout}
        overridableId={overridableId}
        onResultsRendered={onResultsRendered}
      />
    </ShouldRender>
  );
}

ResultsMultiLayout.propTypes = {
  currentLayout: PropTypes.string,
  overridableId: PropTypes.string,
  onResultsRendered: PropTypes.func,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: null,
  overridableId: "",
  onResultsRendered: () => {},
};

const Element = ({ layout, overridableId, onResultsRendered }) => {
  const { buildUID } = useContext(AppContext);
  return (
    <Overridable
      id={buildUID("ResultsMultiLayout.element", overridableId)}
      layout={layout}
      onResultsRendered={onResultsRendered}
    >
      {layout === "list" ? (
        <ResultsList
          overridableId={overridableId}
          onResultsRendered={onResultsRendered}
        />
      ) : (
        <ResultsGrid
          overridableId={overridableId}
          onResultsRendered={onResultsRendered}
        />
      )}
    </Overridable>
  );
};

Element.propTypes = {
  layout: PropTypes.string,
  overridableId: PropTypes.string,
  onResultsRendered: PropTypes.func,
};

Element.defaultProps = {
  layout: "",
  overridableId: "",
  onResultsRendered: () => {},
};

export default Overridable.component("ResultsMultiLayout", ResultsMultiLayout);
