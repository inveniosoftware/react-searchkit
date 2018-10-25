import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import { configureStore, storeKey } from '../../store';
import { SearchApi } from '../../api/SearchApi';
import 'semantic-ui-css/semantic.min.css';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const searchApi = props.searchApi || SearchApi;
    this.store = configureStore({
      query: {},
      apiConfig: props.apiConfig,
      searchApi: new searchApi(),
    });
  }

  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}
