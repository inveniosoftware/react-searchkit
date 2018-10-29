import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.errorCmp = this.props.errorCmp || this.defaultError;
    this.errorCmp = this.errorCmp.bind(this);
  }

  defaultError = error => {
    return <div>Oups! Something went wrong while fetching results.</div>;
  };

  render() {
    const { error } = this.props;
    return this.errorCmp(error);
  }
}

Error.propTypes = {
  error: PropTypes.object.isRequired,
  errorCmp: PropTypes.func,
};

Error.defaultProps = {
  error: {},
  errorCmp: undefined,
};
