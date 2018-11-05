var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from './..';
import _isEmpty from 'lodash/isEmpty';

var EmptyResults = function (_Component) {
  _inherits(EmptyResults, _Component);

  function EmptyResults(props) {
    _classCallCheck(this, EmptyResults);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.empty = function (_ref) {
      var total = _ref.total;
      return total === 0 ? React.createElement(
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

    return React.createElement(
      ShouldRender,
      { condition: !loading && _isEmpty(error) },
      React.createElement(
        Fragment,
        null,
        this.renderElement(_extends({}, this.props))
      )
    );
  };

  return EmptyResults;
}(Component);

export { EmptyResults as default };


EmptyResults.propTypes = process.env.NODE_ENV !== "production" ? {
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.object,
  renderElement: PropTypes.func
} : {};

EmptyResults.defaultProps = {
  total: null,
  loading: null,
  error: null,
  renderElement: null
};