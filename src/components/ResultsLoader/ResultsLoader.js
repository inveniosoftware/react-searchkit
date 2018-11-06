import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { ShouldRender } from '@app/components/ShouldRender';

export default class ResultsLoader extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this.loader;
  }

  loader = () => <Loader active inline="centered" />;

  render() {
    let { loading } = this.props;
    return (
      <ShouldRender condition={loading}>{this.renderElement()}</ShouldRender>
    );
  }
}

ResultsLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  renderElement: PropTypes.func,
};

ResultsLoader.defaultProps = {
  renderElement: null,
};
