import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import { configureStore, storeKey } from '../../store';
import { SearchApi as _SearchApi } from '../../api/SearchApi';
import 'semantic-ui-css/semantic.min.css';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const SearchApi = props.searchApi || _SearchApi;
    this.store = configureStore({
      query: {
        queryString: '',
        sorting: {
          sortBy: null,
          sortOrder: null,
        },
      },
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
    });
  }

  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}
