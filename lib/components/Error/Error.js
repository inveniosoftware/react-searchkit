'use strict';

exports.__esModule = true;
exports.default = undefined;

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

var Error = function (_Component) {
  _inherits(Error, _Component);

  function Error(props) {
    _classCallCheck(this, Error);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.error = function (_ref) {
      var error = _ref.error;

      return _react2.default.createElement(
        'div',
        null,
        'Oups! Something went wrong while fetching results.'
      );
    };

    _this.renderElement = props.renderElement || _this.error;
    return _this;
  }

  Error.prototype.render = function render() {
    var _props = this.props,
        error = _props.error,
        loading = _props.loading;

    return _react2.default.createElement(
      _.ShouldRender,
      { condition: !loading && !(0, _isEmpty3.default)(error) },
      _react2.default.createElement(
        _react.Fragment,
        null,
        this.renderElement(error)
      )
    );
  };

  return Error;
}(_react.Component);

exports.default = Error;


Error.propTypes = process.env.NODE_ENV !== "production" ? {
  error: _propTypes2.default.object.isRequired,
  renderElement: _propTypes2.default.func
} : {};

Error.defaultProps = {
  error: {},
  renderElement: null
};
module.exports = exports['default'];