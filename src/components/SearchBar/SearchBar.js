import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateQueryString = this.props.updateQueryString;
    this.state = {
      currentValue: this.props.queryString || '',
    };
  }

  onInputChange = (event, input) => {
    this.setState({
      currentValue: input.value,
    });
  };

  onSearchClicked = (event, input) =>
    this.updateQueryString(this.state.currentValue);

  onInputKeyPress = (event, input) => {
    if (event.key === 'Enter') {
      this.updateQueryString(this.state.currentValue);
    }
  };

  render() {
    let { placeholder } = this.props;
    placeholder = placeholder || 'Type something';

    return (
      <Input
        action={{
          content: 'Search',
          onClick: this.onSearchClicked,
        }}
        fluid
        placeholder={placeholder}
        onChange={this.onInputChange}
        value={this.state.currentValue}
        onKeyPress={this.onInputKeyPress}
      />
    );
  }
}

SearchBar.propTypes = {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  queryString: '',
};

const SearchBarUncontrolled = props => (
  <SearchBar key={props.queryString} {...props} />
);
export default SearchBarUncontrolled;
