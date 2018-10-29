import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmptyResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>No results found!</div>;
  }
}

EmptyResults.propTypes = {};

EmptyResults.defaultProps = {};
