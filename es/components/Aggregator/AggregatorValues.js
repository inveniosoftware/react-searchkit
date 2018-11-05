var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List } from 'semantic-ui-react';
import _find from 'lodash/find';
import _capitalize from 'lodash/capitalize';

var AggregatorValues = function (_Component) {
  _inherits(AggregatorValues, _Component);

  function AggregatorValues(props) {
    _classCallCheck(this, AggregatorValues);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.isItemChecked = function (fieldName, aggrValue, userSelection) {
      var selectedFieldFound = _find(userSelection, function (userSelectedAggr) {
        return fieldName in userSelectedAggr && // check if this field in user selection
        userSelectedAggr[fieldName].value === aggrValue.key && // check if field value corresponds to this aggregation value
        Object.keys(userSelectedAggr[fieldName]).length === 1 // check if it has not nested user selections
        ;
      });
      return selectedFieldFound ? true : false;
    };

    _this.renderNestedAggregator = function (fieldName, aggrValue, userSelection) {
      var onUserSelectionChange = function onUserSelectionChange(pathToClickedAggr) {
        var aggrNameValue = {};
        aggrNameValue[fieldName] = _extends({
          value: aggrValue.key
        }, pathToClickedAggr);
        _this.parentOnUserSelectionChange(aggrNameValue);
      };
      var nestedUserSelection = userSelection.filter(function (selectedAggr) {
        return fieldName in selectedAggr;
      }).map(function (selectedAggr) {
        return selectedAggr[fieldName];
      });
      return React.createElement(AggregatorValues, {
        field: aggrValue.hasNestedField,
        values: aggrValue[aggrValue.hasNestedField],
        userSelection: nestedUserSelection,
        onUserSelectionChange: onUserSelectionChange
      });
    };

    _this.renderListItem = function (fieldName, aggrValue, index, userSelection) {
      var label = (aggrValue.text || _capitalize(aggrValue.key)) + ' (' + aggrValue.total + ')';
      var checked = _this.isItemChecked(fieldName, aggrValue, userSelection);
      var onUserSelectionChange = function onUserSelectionChange(e, _ref) {
        var value = _ref.value;

        var aggrNameValue = {};
        aggrNameValue[fieldName] = { value: aggrValue.key };
        _this.parentOnUserSelectionChange(aggrNameValue);
      };

      var nestedAggregatorTemplate = void 0;
      if (aggrValue.hasNestedField) {
        nestedAggregatorTemplate = _this.renderNestedAggregator(fieldName, aggrValue, userSelection);
      }

      return React.createElement(
        List.Item,
        { key: index },
        React.createElement(Checkbox, {
          label: label,
          value: aggrValue.key,
          checked: checked,
          onClick: onUserSelectionChange
        }),
        nestedAggregatorTemplate
      );
    };

    _this.field = props.field;
    _this.parentOnUserSelectionChange = props.onUserSelectionChange;
    return _this;
  }

  AggregatorValues.prototype.render = function render() {
    var _this2 = this;

    var values = this.props.values;
    var userSelection = this.props.userSelection;

    var listItems = values.map(function (value, index) {
      return _this2.renderListItem(_this2.field, value, index, userSelection);
    });

    return React.createElement(
      List,
      null,
      listItems
    );
  };

  return AggregatorValues;
}(Component);

export { AggregatorValues as default };


AggregatorValues.propTypes = process.env.NODE_ENV !== "production" ? {
  field: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  userSelection: PropTypes.array.isRequired,
  onUserSelectionChange: PropTypes.func.isRequired
} : {};

AggregatorValues.defaultProps = {};