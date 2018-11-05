'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _ = require('./..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Count = function (_Component) {
  _inherits(Count, _Component);

  function Count(props) {
    _classCallCheck(this, Count);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  Count.prototype._renderElement = function _renderElement(total) {
    return _react2.default.createElement(
      _semanticUiReact.Label,
      { color: 'blue' },
      total
    );
  };

  Count.prototype.render = function render() {
    var _props = this.props,
        total = _props.total,
        loading = _props.loading;

    return _react2.default.createElement(
      _.ShouldRender,
      { condition: !loading && total > 0 },
      this.renderElement(total)
    );
  };

  return Count;
}(_react.Component);

exports.default = Count;


Count.propTypes = process.env.NODE_ENV !== "production" ? {
  total: _propTypes2.default.number,
  loading: _propTypes2.default.bool,
  renderTemplate: _propTypes2.default.func
} : {};

Count.defaultProps = {
  total: 0,
  loading: null,
  renderTemplate: null
};
module.exports = exports['default'];