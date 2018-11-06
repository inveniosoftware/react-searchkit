import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { ResultsList, ResultsGrid } from '@app/components';
import { ShouldRender } from '@app/components/ShouldRender';

export default class ResultsMultiLayout extends Component {
  renderResultsList(layout) {
    return layout === 'list' ? <ResultsList /> : <ResultsGrid />;
  }

  render() {
    const { currentLayout, loading, totalResults } = this.props;

    return (
      <ShouldRender condition={currentLayout && !loading && totalResults > 0}>
        {this.renderResultsList(currentLayout)}
      </ShouldRender>
    );
  }
}

ResultsMultiLayout.propTypes = {
  currentLayout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
};
