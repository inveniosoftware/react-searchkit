import { connect } from '../../store';
import { updateQuerySortBy as _updateQuerySortBy, setInitialState as _setInitialState } from '../../state/actions';
import SortByComponent from './SortBy';
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySortBy: function updateQuerySortBy(sortByValue) {
      return dispatch(_updateQuerySortBy(sortByValue));
    },
    setInitialState: function setInitialState(value) {
      return dispatch(_setInitialState(value));
    }
  };
};

export var SortBy = connect(function (state) {
  return {
    total: state.results.data.total,
    currentSortBy: state.query.sortBy,
    loading: state.results.loading
  };
}, mapDispatchToProps)(SortByComponent);