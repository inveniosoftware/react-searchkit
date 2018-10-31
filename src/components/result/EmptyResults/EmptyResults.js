import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from '@app/components';
import _isEmpty from 'lodash/isEmpty';

export default class EmptyResults extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this.empty;
  }

  empty = ({ total }) => (total === 0 ? <div>No results found!</div> : null);

  render() {
    const { loading, error } = this.props;
    return (
      <ShouldRender condition={!loading && _isEmpty(error)}>
        <Fragment>{this.renderElement({ ...this.props })}</Fragment>
      </ShouldRender>
    );
  }
}

EmptyResults.propTypes = {
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.object,
  renderElement: PropTypes.func,
};

EmptyResults.defaultProps = {
  total: null,
  loading: null,
  error: null,
  renderElement: null,
};
