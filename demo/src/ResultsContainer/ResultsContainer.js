import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithLoader } from '@app/components';
import { ResultsList } from '@app/components';

const LoadingResultsList = WithLoader(ResultsList);

export default class ResultsContainer extends Component {
  render() {
    const { loading } = this.props;
    return <LoadingResultsList loading={loading} />;
  }
}

ResultsContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
};

ResultsContainer.defaultProps = {
  loading: false,
};
