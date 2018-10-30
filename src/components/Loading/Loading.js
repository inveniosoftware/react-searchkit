import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.loader = props.loader || <Loader active inline="centered" />;
  }
  render() {
    let { loading } = this.props;
    if (loading) {
      return this.loader;
    } else {
      return null;
    }
  }
}
