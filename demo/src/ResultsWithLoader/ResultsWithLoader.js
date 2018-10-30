import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@app/components';

export default class ResultsWithLoader extends Component {
  render() {
    let { loading } = this.props;
    return <Loading loading={loading} />;
  }
}

ResultsWithLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ResultsWithLoader.defaultProps = {
  loading: false,
};
