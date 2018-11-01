import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import AggregatorValues from './AggregatorValues';

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

  onUserSelectionChange = pathToClickedAggr => {
    this.updateQueryAggregation(pathToClickedAggr);
  };

  _renderElement({ userSelectionAggregations, resultsAggregations }) {
    const current = userSelectionAggregations || [];
    const results = resultsAggregations[this.field] || [];

    // user selection for this specific aggregator
    const userSelection = current.filter(
      selectedAggr => this.field in selectedAggr
    );

    return (
      <Card>
        <Card.Content header={this.title} />
        <Card.Content>
          <AggregatorValues
            field={this.field}
            values={results}
            userSelection={userSelection}
            onUserSelectionChange={this.onUserSelectionChange}
          />
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
  userSelectionAggregations: PropTypes.array.isRequired,
  resultsAggregations: PropTypes.object.isRequired,
  updateQueryAggregation: PropTypes.func.isRequired,
  renderElement: PropTypes.func,
};

Aggregator.defaultProps = {};
