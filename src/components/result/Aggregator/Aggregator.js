import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, List } from 'semantic-ui-react';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';

export default class Aggregator extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.field = props.field;
    this.setInitialState = props.setInitialState;
    this.updateQueryAggregation = props.updateQueryAggregation;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    this.setInitialState({
      aggregations: [],
    });
  }

  onClick = pathToClickedAggr => {
    this.updateQueryAggregation(pathToClickedAggr);
  };

  renderAggregatedResults = (
    aggrName,
    results,
    clickListener,
    selectedAggrs
  ) => {
    const items = results.map((aggregation, index) => {
      const checked = _find(selectedAggrs, selectedAggr => {
        return (
          aggrName in selectedAggr &&
          Object.keys(selectedAggr[aggrName]).length === 1 &&
          selectedAggr[aggrName].value === aggregation.key
        );
      })
        ? true
        : false;
      const label = `${aggregation.text || _capitalize(aggregation.key)} (${
        aggregation.total
      })`;

      let innerAggregator;
      if (aggregation.hasNestedField) {
        const onClick = pathToClickedAggr => {
          const aggrNameValue = {};
          aggrNameValue[aggrName] = {
            value: aggregation.key,
            ...pathToClickedAggr,
          };
          clickListener(aggrNameValue);
        };
        const nestedSelectedAggrs = selectedAggrs
          .filter(selectedAggr => aggrName in selectedAggr)
          .map(selectedAggr => selectedAggr[aggrName]);

        innerAggregator = this.renderAggregatedResults(
          aggregation.hasNestedField,
          aggregation[aggregation.hasNestedField],
          onClick,
          nestedSelectedAggrs
        );
      }

      return (
        <List.Item key={index}>
          <Checkbox
            label={label}
            value={aggregation.key}
            checked={checked}
            onClick={(e, { value }) => {
              const aggrNameValue = {};
              aggrNameValue[aggrName] = { value: aggregation.key };
              clickListener(aggrNameValue);
            }}
          />
          {innerAggregator}
        </List.Item>
      );
    });

    return <List>{items}</List>;
  };

  _renderElement({ currentAggregations, resultsAggregations }) {
    const current = currentAggregations || [];
    const results = resultsAggregations[this.field] || [];

    const selectedAggrs = current.filter(
      selectedAggr => this.field in selectedAggr
    );

    return (
      <Card>
        <Card.Content header={this.title} />
        <Card.Content>
          {this.renderAggregatedResults(
            this.field,
            results,
            this.onClick,
            selectedAggrs
          )}
        </Card.Content>
      </Card>
    );
  }

  render() {
    return <div>{this.renderElement({ ...this.props })}</div>;
  }
}

Aggregator.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  currentAggregations: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

Aggregator.defaultProps = {};
