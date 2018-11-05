'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _truncate2 = require('lodash/truncate');

var _truncate3 = _interopRequireDefault(_truncate2);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsGrid = function (_Component) {
  _inherits(ResultsGrid, _Component);

  function ResultsGrid(props) {
    _classCallCheck(this, ResultsGrid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.itemsPerRow = props.itemsPerRow;
    _this.items = props.items;
    _this.renderElement = props.renderItem || _this._renderElement;
    return _this;
  }

  ResultsGrid.prototype._renderElement = function _renderElement(gridItemData) {
    var metadata = gridItemData.metadata;
    return _react2.default.createElement(
      _semanticUiReact.Card,
      {
        fluid: true,
        key: gridItemData.id,
        href: 'https://videos.cern.ch/record/' + metadata.recid
      },
      _react2.default.createElement(_semanticUiReact.Image, { src: 'https://via.placeholder.com/200' }),
      _react2.default.createElement(
        _semanticUiReact.Card.Content,
        null,
        _react2.default.createElement(
          _semanticUiReact.Card.Header,
          null,
          metadata.title.title || metadata.title
        ),
        _react2.default.createElement(
          _semanticUiReact.Card.Meta,
          null,
          metadata.publication_date
        ),
        _react2.default.createElement(
          _semanticUiReact.Card.Description,
          null,
          (0, _truncate3.default)(metadata.description, { length: 200 })
        )
      )
    );
  };

  ResultsGrid.prototype.renderItems = function renderItems(items) {
    var _this2 = this;

    return items.map(function (item) {
      return _this2.renderElement(item);
    });
  };

  ResultsGrid.prototype.render = function render() {
    return _react2.default.createElement(
      _semanticUiReact.Card.Group,
      { itemsPerRow: this.itemsPerRow },
      this.renderItems(this.items)
    );
  };

  return ResultsGrid;
}(_react.Component);

exports.default = ResultsGrid;


ResultsGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  itemsPerRow: _propTypes2.default.number,
  items: _propTypes2.default.array.isRequired,
  renderElement: _propTypes2.default.func
} : {};

ResultsGrid.defaultProps = {
  itemsPerRow: 3
};
module.exports = exports['default'];