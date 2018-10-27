import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithLoader } from '@app/components';
import Results from './Results';

const LoadingResults = WithLoader(Results);

export default class ResultsWithLoader extends Component {
  render() {
    return <LoadingResults {...this.props} />;
  }
}

ResultsWithLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ResultsWithLoader.defaultProps = {
  loading: false,
};
