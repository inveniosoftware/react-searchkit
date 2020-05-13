/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { ResultsList } from '../ResultsList';
import { ResultsGrid } from '../ResultsGrid';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

function ResultsMultiLayout({
  loading,
  totalResults,
  currentLayout,
  overridableId,
}) {
  return (
    <ShouldRender
      condition={currentLayout != null && !loading && totalResults > 0}
    >
      <Element layout={currentLayout} overridableId={overridableId} />
    </ShouldRender>
  );
}

ResultsMultiLayout.propTypes = {
  totalResults: PropTypes.number.isRequired,
  currentLayout: PropTypes.string,
  overridableId: PropTypes.string,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: null,
  overridableId: '',
};

const Element = ({ layout, overridableId }) => (
  <Overridable
    id={buildUID('ResultsMultiLayout.element', overridableId)}
    layout={layout}
    ResultsList={ResultsList}
    ResultsGrid={ResultsGrid}
  >
    {layout === 'list' ? (
      <ResultsList overridableId={overridableId} />
    ) : (
      <ResultsGrid overridableId={overridableId} />
    )}
  </Overridable>
);

export default Overridable.component('ResultsMultiLayout', ResultsMultiLayout);
