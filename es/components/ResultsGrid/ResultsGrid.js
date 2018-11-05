function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Card, Image } from 'semantic-ui-react';

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
    return React.createElement(
      Card,
      {
        fluid: true,
        key: gridItemData.id,
        href: 'https://videos.cern.ch/record/' + metadata.recid
      },
      React.createElement(Image, { src: 'https://via.placeholder.com/200' }),
      React.createElement(
        Card.Content,
        null,
        React.createElement(
          Card.Header,
          null,
          metadata.title.title || metadata.title
        ),
        React.createElement(
          Card.Meta,
          null,
          metadata.publication_date
        ),
        React.createElement(
          Card.Description,
          null,
          _truncate(metadata.description, { length: 200 })
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
    return React.createElement(
      Card.Group,
      { itemsPerRow: this.itemsPerRow },
      this.renderItems(this.items)
    );
  };

  return ResultsGrid;
}(Component);

export { ResultsGrid as default };


ResultsGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  itemsPerRow: PropTypes.number,
  items: PropTypes.array.isRequired,
  renderElement: PropTypes.func
} : {};

ResultsGrid.defaultProps = {
  itemsPerRow: 3
};