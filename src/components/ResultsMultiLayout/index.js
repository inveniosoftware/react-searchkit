import { connect } from '@app/store';
import ResultsMultiLayoutComponent from './ResultsMultiLayout';

export const ResultsMultiLayout = connect(state => ({
  currentLayout: state.query.layout,
  loading: state.results.loading,
  totalResults: state.results.data.total,
  items: state.results.data.hits,
}))(ResultsMultiLayoutComponent);
