import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onQueryChange = this.props.onQueryChange;
    this.onSearchExecute = this.props.onSearchExecute;
    this.state = {
      currentValue: this.props.currentQueryString || '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentQuery !== state.currentValue) {
      return {
        currentValue: props.currentQueryString,
      };
    }
    return null;
  }

  handleInputChange = (event, data) => this.onQueryChange(data.value);

  handleButtonClick = (event, data) =>
    this.onSearchExecute(this.state.currentValue);

  render() {
    let { placeholder } = this.props;
    placeholder = placeholder || 'Search for a record';

    return (
      <Input
        action={{ content: 'search', onClick: this.handleButtonClick }}
        className="searchbar"
        icon="search"
        placeholder={placeholder}
        iconPosition="left"
        onChange={this.handleInputChange}
        value={this.state.currentValue}
      />
    );
  }
}

SearchBar.propTypes = {
  currentQueryString: PropTypes.string,
  onQueryChange: PropTypes.func.isRequired,
  onSearchExecute: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  currentQueryString: '',
};

export default SearchBar;
