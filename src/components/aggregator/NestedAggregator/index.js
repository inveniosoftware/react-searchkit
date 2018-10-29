import { connect } from '@app/store';
import { updateQueryAggregation } from '@app/state/actions';
import NestedAggregatorComponent from './NestedAggregator';

const mapDispatchToProps = dispatch => ({
  updateQueryAggregation: (field, value) =>
    dispatch(updateQueryAggregation(field, value)),
});

export const NestedAggregator = connect(
  state => ({
    currentAggregations: state.query.aggregations,
    resultsAggregations: state.results.data.aggregations,
  }),
  mapDispatchToProps
)(NestedAggregatorComponent);
