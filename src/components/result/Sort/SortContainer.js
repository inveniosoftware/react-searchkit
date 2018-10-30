import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortBy from './SortBy';
import SortOrder from './SortOrder';

export default class SortContainer extends Component {
  constructor(props) {
    super(props);
    this.sortByOptions = props.sortByOptions;
    this.sortOrderOptions = props.sortOrderOptions;
    this.defaultSortBy = this.props.defaultSortBy;
    this.defaultOrder = this.props.defaultOrder;
    this.showOnEmptyResults = props.showOnEmptyResults;
    // actions
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
    this.setInitialState = props.setInitialState;
  }

  render() {
    const numberOfResults = this.props.total;
    const currentSortByValue = this.props.currentSortBy;
    const currentSortOrderValue = this.props.currentSortOrder;

    return this.showOnEmptyResults || numberOfResults > 1 ? (
      <span>
        <SortBy
          values={this.sortByOptions}
          defaultValue={this.defaultSortBy}
          currentSortBy={currentSortByValue}
          updateQuerySortBy={this.updateQuerySortBy}
          setInitialState={this.setInitialState}
        />
        <SortOrder
          values={this.sortOrderOptions}
          defaultValue={this.defaultOrder}
          currentSortOrder={currentSortOrderValue}
          updateQuerySortOrder={this.updateQuerySortOrder}
          setInitialState={this.setInitialState}
        />
      </span>
    ) : null;
  }
}

SortContainer.propTypes = {
  sortByOptions: PropTypes.array.isRequired,
  sortOrderOptions: PropTypes.array.isRequired,
  defaultSortBy: PropTypes.string.isRequired,
  defaultOrder: PropTypes.string.isRequired,
  showOnEmptyResults: PropTypes.bool,
  currentSortOrder: PropTypes.string,
  updateQuerySortBy: PropTypes.func.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
};

SortContainer.defaultProps = {
  showOnEmptyResults: false,
  currentSortBy: undefined,
  currentSortOrder: undefined,
};
