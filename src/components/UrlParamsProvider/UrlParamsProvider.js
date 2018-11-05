import React, { Component, Fragment } from 'react';

export default class UrlParamsProvider extends Component {
  constructor(props) {
    super(props);

    this.searchOnLoad = props.searchOnLoad || false;
    this.setUrlParams = props.setUrlParams;
    this.setUrlParamsWithoutPush = props.setUrlParamsWithoutPush;
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setUrlParamsWithoutPush(this.searchOnLoad);
    };
    this.setUrlParams(this.searchOnLoad);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
