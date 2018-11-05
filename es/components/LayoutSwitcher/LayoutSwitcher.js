function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Menu, Icon } from 'semantic-ui-react';
import { ShouldRender } from './..';

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

    return React.createElement(
      ShouldRender,
      { condition: currentLayout && !loading && totalResults > 0 },
      React.createElement(
        Menu,
        { compact: true, icon: true },
        React.createElement(
          Menu.Item,
          {
            name: 'list',
            active: currentLayout === 'list',
            onClick: this.onLayoutSwitch
          },
          React.createElement(Icon, { name: 'list layout' })
        ),
        React.createElement(
          Menu.Item,
          {
            name: 'grid',
            active: currentLayout === 'grid',
            onClick: this.onLayoutSwitch
          },
          React.createElement(Icon, { name: 'grid layout' })
        )
      )
    );
  };

  return LayoutSwitcher;
}(Component);

export { LayoutSwitcher as default };


LayoutSwitcher.propTypes = process.env.NODE_ENV !== "production" ? {
  defaultLayout: PropTypes.oneOf(['list', 'grid']),
  updateLayout: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  currentLayout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired
} : {};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list'
};