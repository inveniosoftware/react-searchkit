function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Item, Label } from 'semantic-ui-react';

var ResultsList = function (_Component) {
  _inherits(ResultsList, _Component);

  function ResultsList(props) {
    _classCallCheck(this, ResultsList);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.items = props.items;
    _this.renderElement = props.renderItem || _this._renderElement;
    return _this;
  }

  ResultsList.prototype._renderElement = function _renderElement(rowData) {
    var metadata = rowData.metadata;
    return React.createElement(
      Item,
      {
        key: rowData.id,
        href: 'https://videos.cern.ch/record/' + metadata.recid
      },
      React.createElement(Item.Image, { size: 'small', src: 'https://via.placeholder.com/200' }),
      React.createElement(
        Item.Content,
        null,
        React.createElement(
          Item.Header,
          null,
          metadata.title.title || metadata.title
        ),
        React.createElement(
          Item.Description,
          null,
          _truncate(metadata.description, { length: 200 })
        ),
        React.createElement(
          Item.Extra,
          null,
          React.createElement(Label, { icon: 'globe', content: 'My label' })
        )
      )
    );
  };

  ResultsList.prototype.renderItems = function renderItems(items) {
    var _this2 = this;

    return items.map(function (item) {
      return _this2.renderElement(item);
    });
  };

  ResultsList.prototype.render = function render() {
    return React.createElement(
      Item.Group,
      { divided: true, relaxed: true, link: true },
      this.renderItems(this.items)
    );
  };

  return ResultsList;
}(Component);

export { ResultsList as default };


ResultsList.propTypes = process.env.NODE_ENV !== "production" ? {
  items: PropTypes.array.isRequired,
  renderElement: PropTypes.func
} : {};

ResultsList.defaultProps = {
  items: []
};