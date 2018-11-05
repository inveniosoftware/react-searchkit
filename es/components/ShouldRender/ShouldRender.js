function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

var ShouldRender = function (_Component) {
  _inherits(ShouldRender, _Component);

  function ShouldRender() {
    _classCallCheck(this, ShouldRender);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ShouldRender.prototype.render = function render() {
    var condition = this.props.condition;

    return condition ? React.createElement(
      Fragment,
      null,
      {...this.props.children}
    ) : null;
  };

  return ShouldRender;
}(Component);

export { ShouldRender as default };


ShouldRender.propTypes = process.env.NODE_ENV !== "production" ? {
  condition: PropTypes.bool.isRequired
} : {};

ShouldRender.defaultProps = {
  condition: true
};