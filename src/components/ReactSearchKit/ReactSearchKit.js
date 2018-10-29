import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, storeKey } from '@app/store';
import { SearchApi as _SearchApi } from '@app/api/SearchApi';
import 'semantic-ui-css/semantic.min.css';
import { UrlParamsProvider } from '@app/components/UrlParamsProvider';
import { UrlParamsApi as _UrlParamsApi } from '@app/api/UrlParamsApi';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const SearchApi = props.searchApi || _SearchApi;
    const UrlParamsApi = props.urlParamsApi || _UrlParamsApi;
    const { urlParamsSerializer, paramValidator } = props;
    let initialState = {
      query: {
        queryString: '',
        sortBy: 'mostrecent',
        sortOrder: 'desc',
        page: 1,
        size: 10,
      },
      results: {
        data: {
          hits: [],
          total: 0,
          layout: 'list',
        },
      },
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
      urlParamsApi: new UrlParamsApi(urlParamsSerializer, paramValidator),
    };
    this.store = configureStore(initialState);
  }

  render() {
    let { searchDefault } = this.props;

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
