import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '@app/components';
import _isEmpty from 'lodash/isEmpty';

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this.error;
  }

  error = error => {
    return <div>Oups! Something went wrong while fetching results.</div>;
  };

  render() {
    const { error, loading } = this.props;
    return (
      <ShouldRender condition={!loading && !_isEmpty(error)}>
        <Fragment>{this.renderElement(error)}</Fragment>
      </ShouldRender>
    );
  }
}

Error.propTypes = {
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  renderElement: PropTypes.func,
};

Error.defaultProps = {
  renderElement: null,
};
