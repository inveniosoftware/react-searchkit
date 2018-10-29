import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { ResultsList } from '@app/components';
import { ResultsGrid } from '@app/components';

export default class ResultsMultiLayout extends Component {
  constructor(props) {
    super(props);
    this.items = props.items;
  }

  renderResultsList(items, layout) {
    return layout == 'list' ? (
      <ResultsList items={items} />
    ) : (
      <ResultsGrid items={items} />
    );
  }

  render() {
    const currentLayout = this.props.currentLayout;
    const totalResults = this.props.totalResults;
    const items = this.props.items;
    return currentLayout && totalResults > 0
      ? this.renderResultsList(items, currentLayout)
      : null;
  }
}

ResultsMultiLayout.propTypes = {
  items: PropTypes.array.isRequired,
  currentLayout: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
};

ResultsMultiLayout.defaultProps = {
  currentLayout: undefined,
};
