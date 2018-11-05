var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import AggregatorValues from './AggregatorValues';

var Aggregator = function (_Component) {
  _inherits(Aggregator, _Component);

  function Aggregator(props) {
    _classCallCheck(this, Aggregator);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onUserSelectionChange = function (pathToClickedAggr) {
      _this.updateQueryAggregation(pathToClickedAggr);
    };

    _this.title = props.title;
    _this.field = props.field;
    _this.setInitialState = props.setInitialState;
    _this.updateQueryAggregation = props.updateQueryAggregation;
    _this.renderElement = props.renderElement || _this._renderElement;
    return _this;
  }

  Aggregator.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      aggregations: []
    });
  };

  Aggregator.prototype._renderElement = function _renderElement(_ref) {
    var _this2 = this;

    var userSelectionAggregations = _ref.userSelectionAggregations,
        resultsAggregations = _ref.resultsAggregations;

    var current = userSelectionAggregations || [];
    var results = resultsAggregations[this.field] || [];

    // user selection for this specific aggregator
    var userSelection = current.filter(function (selectedAggr) {
      return _this2.field in selectedAggr;
    });

    return React.createElement(
      Card,
      null,
      React.createElement(Card.Content, { header: this.title }),
      React.createElement(
        Card.Content,
        null,
        React.createElement(AggregatorValues, {
          field: this.field,
          values: results,
          userSelection: userSelection,
          onUserSelectionChange: this.onUserSelectionChange
        })
      )
    );
  };

  Aggregator.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      this.renderElement(_extends({}, this.props))
    );
  };

  return Aggregator;
}(Component);

export { Aggregator as default };


Aggregator.propTypes = process.env.NODE_ENV !== "production" ? {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  userSelectionAggregations: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func
} : {};

Aggregator.defaultProps = {};