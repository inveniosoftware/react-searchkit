import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

export default class ResultsPerPage extends Component {
  constructor(props) {
    super(props);

    this.options = props.values;
    this.defaultValue = props.defaultValue;

    this.updateQuerySize = this.props.updateQuerySize;
  }

  componentDidMount() {
    /*this.setInitialState({
      paginationSize: this.defaultValue,
    });*/
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
    const options = this._mapOptions(this.options);

    return currentSize && totalResults > 0 ? (
      <Dropdown
        selection
        options={options}
        value={currentSize}
        onChange={this.onChange}
      />
    ) : null;
  }
}

ResultsPerPage.propTypes = {
  currentSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number.isRequired,
};

ResultsPerPage.defaultProps = {};
