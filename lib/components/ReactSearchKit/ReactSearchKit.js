'use strict';

exports.__esModule = true;
exports.ReactSearchKit = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = require('../../store');

var _SearchApi2 = require('../../api/SearchApi');

require('semantic-ui-css/semantic.min.css');

var _UrlParamsProvider = require('../UrlParamsProvider');

var _UrlParamsApi2 = require('../../api/UrlParamsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = (0, _reactRedux.createProvider)(_store.storeKey);

var ReactSearchKit = exports.ReactSearchKit = function (_Component) {
  _inherits(ReactSearchKit, _Component);

  function ReactSearchKit(props) {
    _classCallCheck(this, ReactSearchKit);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var SearchApi = props.searchApi || _SearchApi2.SearchApi;
    var UrlParamsApi = props.urlParamsApi || _UrlParamsApi2.UrlParamsApi;
    var urlParamsSerializer = props.urlParamsSerializer,
        paramValidator = props.paramValidator;

    var setSortByOnEmptyQuery = props.setSortByOnEmptyQuery;
    var config = {
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
      urlParamsApi: new UrlParamsApi(urlParamsSerializer, paramValidator),
      setSortByOnEmptyQuery: setSortByOnEmptyQuery
    };
    _this.store = (0, _store.configureStore)(config);
    return _this;
  }

  ReactSearchKit.prototype.render = function render() {
    var searchDefault = this.props.searchDefault;


    return _react2.default.createElement(
      Provider,
      { store: this.store },
      _react2.default.createElement(
        _UrlParamsProvider.UrlParamsProvider,
        { searchDefault: searchDefault },
        this.props.children
      )
    );
  };

  return ReactSearchKit;
}(_react.Component);

ReactSearchKit.propTypes = process.env.NODE_ENV !== "production" ? {
  searchDefault: _propTypes2.default.bool,
  setSortByOnEmptyQuery: _propTypes2.default.string
} : {};

ReactSearchKit.defaultProps = {
  searchDefault: false,
  setSortByOnEmptyQuery: null
};