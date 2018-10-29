import React, { Component, Fragment } from 'react';

export default class UrlParamsProvider extends Component {
  constructor(props) {
    super(props);

    this.searchDefault = props.searchDefault || false;
    this.setUrlParams = props.setUrlParams;
    this.setUrlParamsWithoutPush = props.setUrlParamsWithoutPush;
    this.urlParamsApi = props.urlParamsApi;
  }

  componentDidMount() {
    if (this.urlParamsApi) {
      window.onpopstate = () => {
        this.setUrlParamsWithoutPush(this.searchDefault);
      };
      this.setUrlParams(this.searchDefault);
    }
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
