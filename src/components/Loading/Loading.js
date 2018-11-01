import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { ShouldRender } from '@app/components';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.loader = props.loader || <Loader active inline="centered" />;
  }
  render() {
    let { loading } = this.props;
    return <ShouldRender condition={loading}>{this.loader}</ShouldRender>;
  }
}
