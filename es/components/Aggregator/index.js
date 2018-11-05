import { connect } from '../../store';
import { updateQueryAggregation as _updateQueryAggregation, setInitialState as _setInitialState } from '../../state/actions';
import AggregatorComponent from './Aggregator';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryAggregation: function updateQueryAggregation(field, value) {
      return dispatch(_updateQueryAggregation(field, value));
    },
    setInitialState: function setInitialState(value) {
      return dispatch(_setInitialState(value));
    }
  };
};

export var Aggregator = connect(function (state) {
  return {
    userSelectionAggregations: state.query.aggregations,
    resultsAggregations: state.results.data.aggregations
  };
}, mapDispatchToProps)(AggregatorComponent);