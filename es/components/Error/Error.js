function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShouldRender } from './..';
import _isEmpty from 'lodash/isEmpty';

var Error = function (_Component) {
  _inherits(Error, _Component);

  function Error(props) {
    _classCallCheck(this, Error);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.error = function (_ref) {
      var error = _ref.error;

      return React.createElement(
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

    return React.createElement(
      ShouldRender,
      { condition: !loading && !_isEmpty(error) },
      React.createElement(
        Fragment,
        null,
        this.renderElement(error)
      )
    );
  };

  return Error;
}(Component);

export { Error as default };


Error.propTypes = process.env.NODE_ENV !== "production" ? {
  error: PropTypes.object.isRequired,
  renderElement: PropTypes.func
} : {};

Error.defaultProps = {
  error: {},
  renderElement: null
};