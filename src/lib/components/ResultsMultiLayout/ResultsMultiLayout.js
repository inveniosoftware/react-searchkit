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
  overridableUID,
}) {
  return (
    <ShouldRender
      condition={currentLayout != null && !loading && totalResults > 0}
    >
      <Element layout={currentLayout} overridableUID={overridableUID} />
    </ShouldRender>
  );
}

ResultsMultiLayout.propTypes = {
  totalResults: PropTypes.number.isRequired,
  currentLayout: PropTypes.string,
  overridableUID: PropTypes.string,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: null,
  overridableUID: '',
};

const Element = ({ layout, overridableUID }) => (
  <Overridable
    id={buildUID('ResultsMultiLayout.element', overridableUID)}
    layout={layout}
    ResultsList={ResultsList}
    ResultsGrid={ResultsGrid}
  >
    {layout === 'list' ? (
      <ResultsList overridableUID={overridableUID} />
    ) : (
      <ResultsGrid overridableUID={overridableUID} />
    )}
  </Overridable>
);

export default Overridable.component('ResultsMultiLayout', ResultsMultiLayout);
