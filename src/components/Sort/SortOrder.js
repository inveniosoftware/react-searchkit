import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';

export default class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
  }

  componentDidMount() {
    /*this.setInitialState({
      sortOrder: this.defaultValue,
    });*/
  }

  _mapOptions = (options, sortBySelectedValue) => {
    const opt = _find(options, option => option.value === sortBySelectedValue);
    const opts = Array.isArray(opt.order) ? opt.order : [];
    return opts.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = (event, input) => {
    if (input.value === this.props.currentSortOrder) return;
    this.updateQuerySortOrder(input.value);
  };

  render() {
    const sortBySelectedValue = this.props.currentSortBy;
    const selectedValue = this.props.currentSortOrder;
    const options = this._mapOptions(this.options, sortBySelectedValue);

    return Array.isArray(options) && options.length ? (
      <Dropdown
        selection
        options={options}
        value={selectedValue}
        onChange={this.onChange}
      />
    ) : null;
  }
}

SortOrder.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  currentSortBy: PropTypes.string.isRequired,
  currentSortOrder: PropTypes.string,
  updateQuerySortOrder: PropTypes.func.isRequired,
};

SortOrder.defaultProps = {
  currentSortOrder: undefined,
};
