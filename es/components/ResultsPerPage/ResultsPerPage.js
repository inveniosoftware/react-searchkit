var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { ShouldRender } from './..';

var ResultsPerPage = function (_Component) {
  _inherits(ResultsPerPage, _Component);

  function ResultsPerPage(props) {
    _classCallCheck(this, ResultsPerPage);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._mapOptions = function (options) {
      return options.map(function (element, index) {
        return { key: index, text: element.text, value: element.value };
      });
    };

    _this.onChange = function (event, _ref) {
      var value = _ref.value;

      if (value === _this.props.currentSize) return;
      _this.updateQuerySize(value);
    };

    _this.options = props.values;
    _this.defaultValue = props.defaultValue;
    _this.updateQuerySize = _this.props.updateQuerySize;
    _this.setInitialState = props.setInitialState;
    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  ResultsPerPage.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      size: this.defaultValue
    });
  };

  ResultsPerPage.prototype._renderElement = function _renderElement(_ref2) {
    var currentSize = _ref2.currentSize;

    return React.createElement(Dropdown, {
      inline: true,
      compact: true,
      options: this._mapOptions(this.options),
      value: currentSize,
      onChange: this.onChange
    });
  };

  ResultsPerPage.prototype.render = function render() {
    var currentSize = this.props.currentSize;
    var totalResults = this.props.totalResults;
    var loading = this.props.loading;
    return React.createElement(
      ShouldRender,
      { condition: !loading && currentSize && totalResults > 0 },
      this.renderElement(_extends({}, this.props))
    );
  };

  return ResultsPerPage;
}(Component);

export { ResultsPerPage as default };


ResultsPerPage.propTypes = process.env.NODE_ENV !== "production" ? {
  currentSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.number.isRequired,
  renderElement: PropTypes.func
} : {};