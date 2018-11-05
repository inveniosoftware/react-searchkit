function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, storeKey } from '../../store';
import { SearchApi as _SearchApi } from '../../api/SearchApi';
import 'semantic-ui-css/semantic.min.css';
import { UrlParamsProvider } from '../UrlParamsProvider';
import { UrlParamsApi as _UrlParamsApi } from '../../api/UrlParamsApi';

var Provider = createProvider(storeKey);

export var ReactSearchKit = function (_Component) {
  _inherits(ReactSearchKit, _Component);

  function ReactSearchKit(props) {
    _classCallCheck(this, ReactSearchKit);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var SearchApi = props.searchApi || _SearchApi;
    var UrlParamsApi = props.urlParamsApi || _UrlParamsApi;
    var urlParamsSerializer = props.urlParamsSerializer,
        paramValidator = props.paramValidator;

    var setSortByOnEmptyQuery = props.setSortByOnEmptyQuery;
    var config = {
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
      urlParamsApi: new UrlParamsApi(urlParamsSerializer, paramValidator),
      setSortByOnEmptyQuery: setSortByOnEmptyQuery
    };
    _this.store = configureStore(config);
    return _this;
  }

  ReactSearchKit.prototype.render = function render() {
    var searchDefault = this.props.searchDefault;


    return React.createElement(
      Provider,
      { store: this.store },
      React.createElement(
        UrlParamsProvider,
        { searchDefault: searchDefault },
        this.props.children
      )
    );
  };

  return ReactSearchKit;
}(Component);

ReactSearchKit.propTypes = process.env.NODE_ENV !== "production" ? {
  searchDefault: PropTypes.bool,
  setSortByOnEmptyQuery: PropTypes.string
} : {};

ReactSearchKit.defaultProps = {
  searchDefault: false,
  setSortByOnEmptyQuery: null
};