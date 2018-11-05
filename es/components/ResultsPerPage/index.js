import { connect } from '../../store';
import { updateQueryPaginationSize, setInitialState as _setInitialState } from '../../state/actions';
import ResultsPerPageComponent from './ResultsPerPage';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQuerySize: function updateQuerySize(size) {
      return dispatch(updateQueryPaginationSize(size));
    },
    setInitialState: function setInitialState(value) {
      return dispatch(_setInitialState(value));
    }
  };
};

export var ResultsPerPage = connect(function (state) {
  return {
    currentSize: state.query.size,
    totalResults: state.results.data.total,
    loading: state.results.loading
  };
}, mapDispatchToProps)(ResultsPerPageComponent);