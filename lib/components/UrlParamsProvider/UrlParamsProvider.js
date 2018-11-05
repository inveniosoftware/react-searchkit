'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UrlParamsProvider = function (_Component) {
  _inherits(UrlParamsProvider, _Component);

  function UrlParamsProvider(props) {
    _classCallCheck(this, UrlParamsProvider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.searchDefault = props.searchDefault || false;
    _this.setUrlParams = props.setUrlParams;
    _this.setUrlParamsWithoutPush = props.setUrlParamsWithoutPush;
    return _this;
  }

  UrlParamsProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    window.onpopstate = function () {
      _this2.setUrlParamsWithoutPush(_this2.searchDefault);
    };
    this.setUrlParams(this.searchDefault);
  };

  UrlParamsProvider.prototype.render = function render() {
    return _react2.default.createElement(
      _react.Fragment,
      null,
      this.props.children
    );
  };

  return UrlParamsProvider;
}(_react.Component);

exports.default = UrlParamsProvider;
module.exports = exports['default'];