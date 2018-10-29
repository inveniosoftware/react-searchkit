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

  componentDidMount() {
    // this.setInitialState({
    //   sortBy: this.defaultSortBy,
    //   sortOrder: this.defaultOrder,
    // });
  }

  render() {
    const numberOfResults = this.props.total;
    const currentSortByValue = this.props.currentSortBy;
    const currentSortOrderValue = this.props.currentSortOrder;

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
  currentSortBy: PropTypes.string,
  currentSortOrder: PropTypes.string,
  updateQuerySortBy: PropTypes.func.isRequired,
  updateQuerySortOrder: PropTypes.func.isRequired,
};

SortContainer.defaultProps = {
  showOnEmptyResults: false,
  currentSortBy: undefined,
  currentSortOrder: undefined,
};
