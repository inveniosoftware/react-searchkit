'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _ = require('./..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortOrder = function (_Component) {
  _inherits(SortOrder, _Component);

  function SortOrder(props) {
    _classCallCheck(this, SortOrder);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._mapOptions = function (options) {
      return options.map(function (element, index) {
        return { key: index, text: element.text, value: element.value };
      });
    };

    _this.onChange = function (event, _ref) {
      var value = _ref.value;

      if (value === _this.props.currentSortOrder) return;
      _this.updateQuerySortOrder(value);
    };

    _this.options = props.values;
    _this.defaultValue = _this.props.defaultValue;
    _this.updateQuerySortOrder = props.updateQuerySortOrder;
    _this.setInitialState = props.setInitialState;
    _this.showOnEmptyResults = props.showOnEmptyResults;
    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  SortOrder.prototype._renderElement = function _renderElement(_ref2) {
    var currentSortOrder = _ref2.currentSortOrder;

    var options = this._mapOptions(this.options);
    return _react2.default.createElement(_semanticUiReact.Dropdown, {
      selection: true,
      compact: true,
      options: options,
      value: currentSortOrder,
      onChange: this.onChange
    });
  };

  SortOrder.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      sortOrder: this.defaultValue
    });
  };

  SortOrder.prototype.render = function render() {
    var selectedValue = this.props.currentSortOrder;
    var numberOfResults = this.props.total;
    var loading = this.props.loading;
    return _react2.default.createElement(
      _.ShouldRender,
      {
        condition: !loading && selectedValue && (this.showOnEmptyResults || numberOfResults > 1)
      },
      this.renderElement(_extends({}, this.props))
    );
  };

  return SortOrder;
}(_react.Component);

exports.default = SortOrder;


SortOrder.propTypes = process.env.NODE_ENV !== "production" ? {
  values: _propTypes2.default.array.isRequired,
  defaultValue: _propTypes2.default.string.isRequired,
  currentSortOrder: _propTypes2.default.string,
  updateQuerySortOrder: _propTypes2.default.func.isRequired,
  renderElement: _propTypes2.default.func
} : {};

SortOrder.defaultProps = {
  currentSortOrder: undefined,
  showOnEmptyResults: false
};
module.exports = exports['default'];