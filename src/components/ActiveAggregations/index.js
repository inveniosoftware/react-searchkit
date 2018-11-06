import { connect } from '@app/store';
import { updateQueryAggregation } from '@app/state/actions';
import ActiveAggregationsComponent from './ActiveAggregations';

const mapDispatchToProps = dispatch => ({
  updateQueryAggregation: path => dispatch(updateQueryAggregation(path)),
});

export const ActiveAggregations = connect(
  state => ({
    aggregations: state.query.aggregations,
  }),
  mapDispatchToProps
)(ActiveAggregationsComponent);
