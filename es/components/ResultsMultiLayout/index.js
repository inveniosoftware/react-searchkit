import { connect } from '../../store';
import ResultsMultiLayoutComponent from './ResultsMultiLayout';

export var ResultsMultiLayout = connect(function (state) {
  return {
    currentLayout: state.query.layout,
    loading: state.results.loading,
    totalResults: state.results.data.total,
    items: state.results.data.hits
  };
})(ResultsMultiLayoutComponent);