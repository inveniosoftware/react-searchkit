var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import _find from 'lodash/find';
import { ShouldRender } from './..';

var SortBy = function (_Component) {
  _inherits(SortBy, _Component);

  function SortBy(props) {
    _classCallCheck(this, SortBy);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._mapOptions = function (options) {
      return options.map(function (element, index) {
        return { key: index, text: element.text, value: element.value };
      });
    };

    _this.onChange = function (event, _ref) {
      var value = _ref.value;

      if (value === _this.props.currentSortBy) return;
      _this.updateQuerySortBy(value);
    };

    _this.options = props.values;
    _this.defaultValue = _this.props.defaultValue;
    _this.updateQuerySortBy = props.updateQuerySortBy;
    _this.setInitialState = props.setInitialState;
    _this.showOnEmptyResults = props.showOnEmptyResults;
    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  SortBy.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      sortBy: this.defaultValue
    });
  };

  SortBy.prototype._renderElement = function _renderElement(_ref2) {
    var currentSortBy = _ref2.currentSortBy;

    var options = this._mapOptions(this.options);
    return React.createElement(Dropdown, {
      selection: true,
      compact: true,
      options: options,
      value: currentSortBy,
      onChange: this.onChange
    });
  };

  SortBy.prototype.render = function render() {
    var selectedValue = this.props.currentSortBy;
    var numberOfResults = this.props.total;
    var loading = this.props.loading;
    return React.createElement(
      ShouldRender,
      {
        condition: !loading && selectedValue && (this.showOnEmptyResults || numberOfResults > 1)
      },
      this.renderElement(_extends({}, this.props))
    );
  };

  return SortBy;
}(Component);

export { SortBy as default };


SortBy.propTypes = process.env.NODE_ENV !== "production" ? {
  values: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  updateQuerySortBy: PropTypes.func.isRequired,
  renderElement: PropTypes.func
} : {};

SortBy.defaultProps = {
  showOnEmptyResults: false
};