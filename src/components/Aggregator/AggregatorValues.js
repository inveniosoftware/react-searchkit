import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List } from 'semantic-ui-react';
import _find from 'lodash/find';
import _capitalize from 'lodash/capitalize';

export default class AggregatorValues extends Component {
  constructor(props) {
    super(props);
    this.field = props.field;
    this.parentOnUserSelectionChange = props.onUserSelectionChange;
  }

  isItemChecked = (fieldName, aggrValue, userSelection) => {
    const selectedFieldFound = _find(userSelection, userSelectedAggr => {
      return (
        fieldName in userSelectedAggr && // check if this field in user selection
        userSelectedAggr[fieldName].value === aggrValue.key && // check if field value corresponds to this aggregation value
        Object.keys(userSelectedAggr[fieldName]).length === 1 // check if it has not nested user selections
      );
    });
    return selectedFieldFound ? true : false;
  };

  renderNestedAggregator = (fieldName, aggrValue, userSelection) => {
    const onUserSelectionChange = pathToClickedAggr => {
      const aggrNameValue = {};
      aggrNameValue[fieldName] = {
        value: aggrValue.key,
        ...pathToClickedAggr,
      };
      this.parentOnUserSelectionChange(aggrNameValue);
    };
    const nestedUserSelection = userSelection
      .filter(selectedAggr => fieldName in selectedAggr)
      .map(selectedAggr => selectedAggr[fieldName]);
    return (
      <AggregatorValues
        field={aggrValue.hasNestedField}
        values={aggrValue[aggrValue.hasNestedField]}
        userSelection={nestedUserSelection}
        onUserSelectionChange={onUserSelectionChange}
      />
    );
  };

  renderListItem = (fieldName, aggrValue, index, userSelection) => {
    const label = `${aggrValue.text || _capitalize(aggrValue.key)} (${
      aggrValue.total
    })`;
    const checked = this.isItemChecked(fieldName, aggrValue, userSelection);
    const onUserSelectionChange = (e, { value }) => {
      const aggrNameValue = {};
      aggrNameValue[fieldName] = { value: aggrValue.key };
      this.parentOnUserSelectionChange(aggrNameValue);
    };

    let nestedAggregatorTemplate;
    if (aggrValue.hasNestedField) {
      nestedAggregatorTemplate = this.renderNestedAggregator(
        fieldName,
        aggrValue,
        userSelection
      );
    }

    return (
      <List.Item key={index}>
        <Checkbox
          label={label}
          value={aggrValue.key}
          checked={checked}
          onClick={onUserSelectionChange}
        />
        {nestedAggregatorTemplate}
      </List.Item>
    );
  };

  render() {
    const values = this.props.values;
    const userSelection = this.props.userSelection;

    const listItems = values.map((value, index) =>
      this.renderListItem(this.field, value, index, userSelection)
    );

    return <List>{listItems}</List>;
  }
}

AggregatorValues.propTypes = {
  field: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  userSelection: PropTypes.array.isRequired,
  onUserSelectionChange: PropTypes.func.isRequired,
};

AggregatorValues.defaultProps = {};
