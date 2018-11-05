'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('./..');

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmptyResults = function (_Component) {
  _inherits(EmptyResults, _Component);

  function EmptyResults(props) {
    _classCallCheck(this, EmptyResults);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.empty = function (_ref) {
      var total = _ref.total;
      return total === 0 ? _react2.default.createElement(
        'div',
        null,
        'No results found!'
      ) : null;
    };

    _this.renderElement = props.renderElement || _this.empty;
    return _this;
  }

  EmptyResults.prototype.render = function render() {
    var _props = this.props,
        loading = _props.loading,
        error = _props.error;

    return _react2.default.createElement(
      _.ShouldRender,
      { condition: !loading && (0, _isEmpty3.default)(error) },
      _react2.default.createElement(
        _react.Fragment,
        null,
        this.renderElement(_extends({}, this.props))
      )
    );
  };

  return EmptyResults;
}(_react.Component);

exports.default = EmptyResults;


EmptyResults.propTypes = process.env.NODE_ENV !== "production" ? {
  total: _propTypes2.default.number,
  loading: _propTypes2.default.bool,
  error: _propTypes2.default.object,
  renderElement: _propTypes2.default.func
} : {};

EmptyResults.defaultProps = {
  total: null,
  loading: null,
  error: null,
  renderElement: null
};
module.exports = exports['default'];