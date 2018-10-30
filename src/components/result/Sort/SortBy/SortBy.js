import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';

export default class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.setInitialState = props.setInitialState;
    this.showOnEmptyResults = props.showOnEmptyResults;
  }

  componentDidMount() {
    this.setInitialState({
      sortBy: this.defaultValue,
    });
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = (event, { value }) => {
    if (value === this.props.currentSortBy) return;
    this.updateQuerySortBy(value);
  };

  render() {
    const selectedValue = this.props.currentSortBy;
    const options = this._mapOptions(this.options);
    const numberOfResults = this.props.total;
    let loading = this.props.loading;

    if (loading) {
      return null;
    }
    return selectedValue && (this.showOnEmptyResults || numberOfResults > 1) ? (
      <Dropdown
        selection
        compact
        options={options}
        value={selectedValue}
        onChange={this.onChange}
      />
    ) : null;
  }
}

SortBy.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
};

SortBy.defaultProps = {
  showOnEmptyResults: false,
};
