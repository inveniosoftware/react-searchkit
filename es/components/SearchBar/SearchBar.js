var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

var SearchBar = function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onInputChange = function (event, input) {
      _this.setState({
        currentValue: input.value
      });
    };

    _this.onSearchClicked = function (event, input) {
      return _this.updateQueryString(_this.state.currentValue);
    };

    _this.onInputKeyPress = function (event, input) {
      if (event.key === 'Enter') {
        _this.updateQueryString(_this.state.currentValue);
      }
    };

    _this.updateQueryString = _this.props.updateQueryString;
    _this.state = {
      currentValue: _this.props.queryString || ''
    };
    _this.renderElement = props.renderElement || _this._renderElement;
    _this.setSortByOnEmpty = props.setSortByOnEmpty;
    return _this;
  }

  SearchBar.prototype._renderElement = function _renderElement(_ref) {
    var placeholder = _ref.placeholder;

    placeholder = placeholder || 'Type something';
    return React.createElement(Input, {
      action: {
        content: 'Search',
        onClick: this.onSearchClicked
      },
      fluid: true,
      placeholder: placeholder,
      onChange: this.onInputChange,
      value: this.state.currentValue,
      onKeyPress: this.onInputKeyPress
    });
  };

  SearchBar.prototype.render = function render() {
    return this.renderElement(this.props);
  };

  return SearchBar;
}(Component);

SearchBar.propTypes = process.env.NODE_ENV !== "production" ? {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
  setSortByOnEmpty: PropTypes.string
} : {};

SearchBar.defaultProps = {
  queryString: '',
  setSortByOnEmpty: null
};

var SearchBarUncontrolled = function SearchBarUncontrolled(props) {
  return React.createElement(SearchBar, _extends({ key: props.queryString }, props));
};
export default SearchBarUncontrolled;