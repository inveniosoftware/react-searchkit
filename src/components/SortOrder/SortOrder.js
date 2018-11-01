import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';
import { ShouldRender } from '@app/components';

export default class SortOrder extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortOrder = props.updateQuerySortOrder;
    this.setInitialState = props.setInitialState;
    this.showOnEmptyResults = props.showOnEmptyResults;
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement({ currentSortOrder }) {
    const options = this._mapOptions(this.options);
    return (
      <Dropdown
        selection
        compact
        options={options}
        value={currentSortOrder}
        onChange={this.onChange}
      />
    );
  }

  componentDidMount() {
    this.setInitialState({
      sortOrder: this.defaultValue,
    });
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = (event, { value }) => {
    if (value === this.props.currentSortOrder) return;
    this.updateQuerySortOrder(value);
  };

  render() {
    const selectedValue = this.props.currentSortOrder;
    const numberOfResults = this.props.total;
    let loading = this.props.loading;
    return (
      <ShouldRender
        condition={
          !loading &&
          (selectedValue && (this.showOnEmptyResults || numberOfResults > 1))
        }
      >
        {this.renderElement({ ...this.props })}
      </ShouldRender>
    );
  }
}

SortOrder.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  currentSortOrder: PropTypes.string,
  updateQuerySortOrder: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

SortOrder.defaultProps = {
  currentSortOrder: undefined,
  showOnEmptyResults: false,
};
