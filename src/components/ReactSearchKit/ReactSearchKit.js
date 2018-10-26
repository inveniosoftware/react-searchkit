import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, storeKey } from '../../store';
import { SearchApi as _SearchApi } from '../../api/SearchApi';
import 'semantic-ui-css/semantic.min.css';
import { UrlParamsProvider } from '../UrlParamsProvider';
import { UrlParamsApi as _UrlParamsApi } from '../../api/UrlParamsApi';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const SearchApi = props.searchApi || _SearchApi;
    const UrlParamsApi = props.urlParamsApi || _UrlParamsApi;
    let initialState = {
      query: {
        queryString: '',
        sorting: {
          sortBy: 'mostrecent',
          sortOrder: 'desc',
        },
      },
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
      urlParamsApi: new UrlParamsApi(),
    };
    this.store = configureStore(initialState);
  }

  render() {
    let { searchDefault } = this.props.searchDefault;
    return (
      <Provider store={this.store}>
        <UrlParamsProvider searchDefault={searchDefault}>
          {this.props.children}
        </UrlParamsProvider>
      </Provider>
    );
  }
}

ReactSearchKit.propTypes = {
  searchDefault: PropTypes.bool,
};

ReactSearchKit.defaultProps = {
  searchDefault: false,
};
