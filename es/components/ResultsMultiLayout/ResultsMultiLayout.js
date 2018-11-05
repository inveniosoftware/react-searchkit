function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { ResultsList, ResultsGrid, ShouldRender } from './..';

var ResultsMultiLayout = function (_Component) {
  _inherits(ResultsMultiLayout, _Component);

  function ResultsMultiLayout(props) {
    _classCallCheck(this, ResultsMultiLayout);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.items = props.items;
    return _this;
  }

  ResultsMultiLayout.prototype.renderResultsList = function renderResultsList(items, layout) {
    return layout == 'list' ? React.createElement(ResultsList, { items: items }) : React.createElement(ResultsGrid, { items: items });
  };

  ResultsMultiLayout.prototype.render = function render() {
    var _props = this.props,
        currentLayout = _props.currentLayout,
        loading = _props.loading,
        totalResults = _props.totalResults,
        items = _props.items;


    return React.createElement(
      ShouldRender,
      { condition: currentLayout && !loading && totalResults > 0 },
      this.renderResultsList(items, currentLayout)
    );
  };

  return ResultsMultiLayout;
}(Component);

export { ResultsMultiLayout as default };


ResultsMultiLayout.propTypes = process.env.NODE_ENV !== "production" ? {
  items: PropTypes.array.isRequired,
  currentLayout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired
} : {};

ResultsMultiLayout.defaultProps = {
  currentLayout: undefined
};