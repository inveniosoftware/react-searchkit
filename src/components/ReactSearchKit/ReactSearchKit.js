import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { SearchApi, UrlParamsApi, configureStore, storeKey } from '@app';
import 'semantic-ui-css/semantic.min.css';
import { UrlParamsProvider } from '@app/components/UrlParamsProvider';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const appConfig = {
      searchApi: props.searchApi || new SearchApi(props.searchConfig),
      urlParamsApi:
        props.urlParamsApi || new UrlParamsApi(props.urlParamsConfig),
      defaultSortByOnEmptyQuery: props.defaultSortByOnEmptyQuery,
    };
    this.store = configureStore(appConfig);
  }

  render() {
    const { searchOnLoad } = this.props;

    return (
      <Provider store={this.store}>
        <UrlParamsProvider searchOnLoad={searchOnLoad}>
          {this.props.children}
        </UrlParamsProvider>
      </Provider>
    );
  }
}

ReactSearchKit.propTypes = {
  searchConfig: PropTypes.object,
  searchApi: PropTypes.object,
  urlParamsConfig: PropTypes.object,
  urlParamsApi: PropTypes.object,
  searchOnLoad: PropTypes.bool,
  defaultSortByOnEmptyQuery: PropTypes.string,
};

ReactSearchKit.defaultProps = {
  searchOnLoad: true,
  defaultSortByOnEmptyQuery: null,
};
