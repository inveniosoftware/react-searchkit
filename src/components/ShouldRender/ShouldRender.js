import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class ShouldRender extends Component {
  render() {
    let { condition } = this.props;
    return condition ? <Fragment>{...this.props.children}</Fragment> : null;
  }
}

ShouldRender.propTypes = {
  condition: PropTypes.bool.isRequired,
};

ShouldRender.defaultProps = {
  condition: true,
};
