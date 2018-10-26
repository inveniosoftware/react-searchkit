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
  }

  componentDidMount() {
    /*this.setInitialState({
      sortBy: this.defaultValue,
    });*/
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  _getFirstSortOrderValue = (options, selectedValue) => {
    const selectedOption = _find(options, valueObj => {
      return valueObj.value === selectedValue;
    });
    const orderOptions = selectedOption ? selectedOption.order : [];
    return Array.isArray(orderOptions) && orderOptions.length
      ? orderOptions[0].value
      : undefined;
  };

  onChange = (event, input) => {
    if (input.value === this.props.currentSortBy) return;

    const firstSortOrder = this._getFirstSortOrderValue(
      this.options,
      input.value
    );
    this.updateQuerySortBy(input.value, firstSortOrder);
  };

  render() {
    const selectedValue = this.props.currentSortBy;
    const options = this._mapOptions(this.options);

    return selectedValue ? (
      <Dropdown
        selection
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
  currentSortBy: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
};

SortBy.defaultProps = {};
