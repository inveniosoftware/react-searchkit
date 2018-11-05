'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _semanticUiReact = require('semantic-ui-react');

var _ = require('./..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutSwitcher = function (_Component) {
  _inherits(LayoutSwitcher, _Component);

  function LayoutSwitcher(props) {
    _classCallCheck(this, LayoutSwitcher);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onLayoutSwitch = function (event, _ref) {
      var name = _ref.name;

      _this.updateLayout(name);
    };

    _this.defaultValue = _this.props.defaultLayout;
    _this.updateLayout = props.updateLayout;
    _this.setInitialState = props.setInitialState;
    return _this;
  }

  LayoutSwitcher.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      layout: this.defaultValue
    });
  };

  LayoutSwitcher.prototype.render = function render() {
    var _props = this.props,
        currentLayout = _props.currentLayout,
        loading = _props.loading,
        totalResults = _props.totalResults;

    return _react2.default.createElement(
      _.ShouldRender,
      { condition: currentLayout && !loading && totalResults > 0 },
      _react2.default.createElement(
        _semanticUiReact.Menu,
        { compact: true, icon: true },
        _react2.default.createElement(
          _semanticUiReact.Menu.Item,
          {
            name: 'list',
            active: currentLayout === 'list',
            onClick: this.onLayoutSwitch
          },
          _react2.default.createElement(_semanticUiReact.Icon, { name: 'list layout' })
        ),
        _react2.default.createElement(
          _semanticUiReact.Menu.Item,
          {
            name: 'grid',
            active: currentLayout === 'grid',
            onClick: this.onLayoutSwitch
          },
          _react2.default.createElement(_semanticUiReact.Icon, { name: 'grid layout' })
        )
      )
    );
  };

  return LayoutSwitcher;
}(_react.Component);

exports.default = LayoutSwitcher;


LayoutSwitcher.propTypes = process.env.NODE_ENV !== "production" ? {
  defaultLayout: _propTypes2.default.oneOf(['list', 'grid']),
  updateLayout: _propTypes2.default.func.isRequired,
  setInitialState: _propTypes2.default.func.isRequired,
  currentLayout: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  totalResults: _propTypes2.default.number.isRequired
} : {};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list'
};
module.exports = exports['default'];