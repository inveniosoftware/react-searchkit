import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@app/components';

export default class ResultsLoader extends Component {
  render() {
    let { loading } = this.props;
    return <Loading loading={loading} />;
  }
}

ResultsLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ResultsLoader.defaultProps = {
  loading: false,
};
