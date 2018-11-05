import { connect } from '../../store';
import { updateQueryPaginationPage, setInitialState as _setInitialState } from '../../state/actions';
import PaginationComponent from './Pagination';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryPage: function updateQueryPage(page) {
      return dispatch(updateQueryPaginationPage(page));
    },
    setInitialState: function setInitialState(value) {
      return dispatch(_setInitialState(value));
    }
  };
};

export var Pagination = connect(function (state) {
  return {
    currentPage: state.query.page,
    currentSize: state.query.size,
    loading: state.results.loading,
    totalResults: state.results.data.total
  };
}, mapDispatchToProps)(PaginationComponent);