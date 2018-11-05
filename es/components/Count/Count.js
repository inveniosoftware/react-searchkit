function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { ShouldRender } from './..';

var Count = function (_Component) {
  _inherits(Count, _Component);

  function Count(props) {
    _classCallCheck(this, Count);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  Count.prototype._renderElement = function _renderElement(total) {
    return React.createElement(
      Label,
      { color: 'blue' },
      total
    );
  };

  Count.prototype.render = function render() {
    var _props = this.props,
        total = _props.total,
        loading = _props.loading;

    return React.createElement(
      ShouldRender,
      { condition: !loading && total > 0 },
      this.renderElement(total)
    );
  };

  return Count;
}(Component);

export { Count as default };


Count.propTypes = process.env.NODE_ENV !== "production" ? {
  total: PropTypes.number,
  loading: PropTypes.bool,
  renderTemplate: PropTypes.func
} : {};

Count.defaultProps = {
  total: 0,
  loading: null,
  renderTemplate: null
};