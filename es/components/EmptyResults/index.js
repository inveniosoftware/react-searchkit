import { connect } from '../../store';
import EmptyResultsComponent from './EmptyResults';

export var EmptyResults = connect(function (state) {
  return {
    total: state.results.data.total,
    loading: state.results.loading,
    error: state.results.error
  };
})(EmptyResultsComponent);