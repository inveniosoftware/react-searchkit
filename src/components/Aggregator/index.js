import { connect } from '@app/store';
import { updateQueryAggregation, setInitialState } from '@app/state/actions';
import AggregatorComponent from './Aggregator';

const mapDispatchToProps = dispatch => ({
  updateQueryAggregation: aggregation =>
    dispatch(updateQueryAggregation(aggregation)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const Aggregator = connect(
  state => ({
    userSelectionAggregations: state.query.aggregations,
    resultsAggregations: state.results.data.aggregations,
  }),
  mapDispatchToProps
)(AggregatorComponent);
