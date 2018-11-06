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

  _renderElement(currentSize, values, onValueChange) {
    const onChange = (event, { value }) => {
      onValueChange(value);
    };
    return (
      <Dropdown
        inline
        compact
        options={this._mapOptions(values)}
        value={currentSize}
        onChange={onChange}
      />
    );
  }

  _mapOptions = options => {
    return options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
  };

  onChange = value => {
    if (value === this.props.currentSize) return;
    this.updateQuerySize(value);
  };

  render() {
    const { currentSize, totalResults, loading, values } = this.props;
    return (
      <ShouldRender condition={!loading && (currentSize && totalResults > 0)}>
        {this.renderElement(currentSize, values, this.onChange)}
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

ResultsPerPage.defaultProps = {
  renderElement: null,
};
