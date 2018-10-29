import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, Icon, List } from 'semantic-ui-react';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';

export default class NestedAggregator extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.nestedFields = props.nestedFields;
    this.field = this.nestedFields['field'];
    this.updateQueryAggregation = props.updateQueryAggregation;
  }

  componentDidMount() {
    /*this.setInitialState({
      sortBy: this.defaultValue,
    });*/
  }

  onClick = (field, value) => {
    this.updateQueryAggregation(field, value);
  };

  renderAggregatedResults = (
    currentAggregations,
    resultsAggregations,
    field
  ) => {
    const items = resultsAggregations.map((aggregation, index) => {
      const checked = currentAggregations.indexOf(aggregation.key) >= 0;
      const label = `${aggregation.text || _capitalize(aggregation.key)} (${
        aggregation.total
      })`;

      let nestedFieldsTmpl;
      const nestedField = _find(Object.keys(aggregation), key =>
        Array.isArray(aggregation[key])
      );

      if (nestedField) {
        nestedFieldsTmpl = (
          <List.List>
            {this.renderAggregatedResults(
              currentAggregations,
              aggregation[nestedField],
              nestedField
            )}
          </List.List>
        );
      }

      return (
        <List.Item key={index}>
          <Checkbox
            label={label}
            value={aggregation.key}
            checked={checked}
            onClick={(e, { value }) => {
              this.onClick(field, value);
            }}
          />
          {nestedFieldsTmpl}
        </List.Item>
      );
    });

    return <List>{items}</List>;
  };

  render() {
    const currentAggregations =
      this.props.currentAggregations[this.field] || [];
    const resultsAggregations =
      this.props.resultsAggregations[this.field] || [];

    return !_isEmpty(resultsAggregations) ? (
      <Card>
        <Card.Content header={this.title} />
        <Card.Content>
          {this.renderAggregatedResults(
            currentAggregations,
            resultsAggregations,
            this.field
          )}
        </Card.Content>
      </Card>
    ) : null;
  }
}

NestedAggregator.propTypes = {
  title: PropTypes.string.isRequired,
  nestedFields: PropTypes.object.isRequired,
  currentAggregations: PropTypes.object.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
};

NestedAggregator.defaultProps = {};
