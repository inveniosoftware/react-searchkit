import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, List } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export default class Aggregator extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.field = props.field;
    this.updateQueryAggregation = props.updateQueryAggregation;
  }

  componentDidMount() {
    /*this.setInitialState({
      sortBy: this.defaultValue,
    });*/
  }

  onClick = (event, { value }) => {
    this.updateQueryAggregation(this.field, value);
  };

  renderAggregatedResults = (currentAggregations, resultsAggregations) => {
    const items = resultsAggregations.map((aggregation, index) => {
      const checked = currentAggregations.indexOf(aggregation.key) >= 0;
      const label = `${aggregation.text || aggregation.key} (${
        aggregation.total
      })`;
      return (
        <List.Item id={index}>
          <Checkbox
            label={label}
            value={aggregation.key}
            checked={checked}
            onClick={this.onClick}
          />
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
            resultsAggregations
          )}
        </Card.Content>
      </Card>
    ) : null;
  }
}

Aggregator.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  currentAggregations: PropTypes.object.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
};

Aggregator.defaultProps = {};
