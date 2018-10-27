import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortBy from './SortBy';
import SortOrder from './SortOrder';

export default class SortContainer extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultSortBy = this.props.defaultSortBy;
    this.defaultOrder = this.props.defaultOrder;
    this.showOnEmptyResults = props.showOnEmptyResults;
    // actions
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
  }

  render() {
    const numberOfResults = this.props.total;
    const currentSortByValue = this.props.currentSorting.sortBy;
    const currentSortOrderValue = this.props.currentSorting.sortOrder;

    return this.showOnEmptyResults || numberOfResults > 1 ? (
      <span>
        <SortBy
          values={this.options}
          defaultValue={this.defaultSortBy}
          currentSortBy={currentSortByValue}
          updateQuerySortBy={this.updateQuerySortBy}
        />
        <SortOrder
          values={this.options}
          defaultValue={this.defaultOrder}
          currentSortBy={currentSortByValue}
          currentSortOrder={currentSortOrderValue}
          updateQuerySortOrder={this.updateQuerySortOrder}
        />
      </span>
    ) : null;
  }
}

SortContainer.propTypes = {
  values: PropTypes.array.isRequired,
  defaultSortBy: PropTypes.string.isRequired,
  defaultOrder: PropTypes.string.isRequired,
  showOnEmptyResults: PropTypes.bool,
  currentSorting: PropTypes.object.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
};

SortContainer.defaultProps = {
  showOnEmptyResults: false,
};
