import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';
import { ShouldRender } from '@app/components';

export default class SortBy extends Component {
  constructor(props) {
    super(props);
    this.options = props.values;
    this.defaultValue = this.props.defaultValue;
    this.updateQuerySortBy = props.updateQuerySortBy;
    this.setInitialState = props.setInitialState;
    this.showOnEmptyResults = props.showOnEmptyResults;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    this.setInitialState({
      sortBy: this.defaultValue,
    });
  }

  _renderElement({ currentSortBy }) {
    const options = this._mapOptions(this.options);
    return (
      <Dropdown
        selection
        compact
        options={options}
        value={currentSortBy}
        onChange={this.onChange}
      />
    );
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
    const numberOfResults = this.props.total;
    let loading = this.props.loading;
    return (
      <ShouldRender
        condition={
          !loading ||
          (selectedValue && (this.showOnEmptyResults || numberOfResults > 1))
        }
      >
        {this.renderElement({ ...this.props })}
      </ShouldRender>
    );
  }
}

SortBy.propTypes = {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

SortBy.defaultProps = {
  showOnEmptyResults: false,
};
