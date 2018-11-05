import { connect } from '../../store';
import { updateQuerySortOrder as _updateQuerySortOrder, setInitialState as _setInitialState } from '../../state/actions';
import SortOrderComponent from './SortOrder';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySortOrder: function updateQuerySortOrder(sortOrderValue) {
      return dispatch(_updateQuerySortOrder(sortOrderValue));
    },
    setInitialState: function setInitialState(value) {
      return dispatch(_setInitialState(value));
    }
  };
};

export var SortOrder = connect(function (state) {
  return {
    total: state.results.data.total,
    currentSortOrder: state.query.sortOrder,
    loading: state.results.loading
  };
}, mapDispatchToProps)(SortOrderComponent);