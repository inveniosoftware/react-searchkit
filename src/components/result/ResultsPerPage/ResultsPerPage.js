import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { ShouldRender } from '@app/components';

export default class ResultsPerPage extends Component {
  constructor(props) {
    super(props);

    this.options = props.values;
    this.defaultValue = props.defaultValue;
    this.updateQuerySize = this.props.updateQuerySize;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    this.setInitialState({
      size: this.defaultValue,
    });
  }

  _renderElement({ currentSize }) {
    return (
      <Dropdown
        inline
        compact
        options={this._mapOptions(this.options)}
        value={currentSize}
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
    if (value === this.props.currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const currentSize = this.props.currentSize;
    const totalResults = this.props.totalResults;
    let loading = this.props.loading;
    return (
      <ShouldRender condition={!loading || (currentSize && totalResults > 0)}>
        {this.renderElement({ ...this.props })}
      </ShouldRender>
    );
  }
}

ResultsPerPage.propTypes = {
  currentSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
};
