import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.options = this.props.values;
    this.showOnEmptyResults = this.props.showOnEmptyResults;
    this.updateQuerySortBy = this.props.updateQuerySortBy;
    this.updateQuerySortOrder = this.props.updateQuerySortOrder;
  }

  mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onSortByChange = (event, input) => {
    this.updateQuerySortBy(input.value);
  };

  onOrderChange = (event, input) => {
    this.updateQuerySortOrder(input.value);
  };

  getSortOrderCmp = selectedSortByValue => {
    const selectedSortBy = this.values.find(
      valueObj => valueObj.value === selectedSortByValue
    );
    sortOrderValues = selectedSortBy.order ? selectedSortBy : [];

    return (
      <Dropdown
        selection
        options={order_values}
        onChange={this.onOrderChange}
      />
    );
  };

  render() {
    const total = this.props.total;
    const { sortBy, sortOrder } = this.props.currentSorting;

    const sortByOptions = this.mapOptions(this.options.values);
    const sortByDefaultOption = this.options.default || sortByOptions[0].value;

    return this.showOnEmptyResults || total > 1 ? (
      <div>
        <Dropdown
          selection
          options={sortByOptions}
          defaultValue={sortByDefaultOption}
          onChange={this.onSortByChange}
        />
      </div>
    ) : null;
  }
}

Sort.propTypes = {
  showOnEmptyResults: PropTypes.bool,
};

Sort.defaultProps = {
  showOnEmptyResults: false,
};
