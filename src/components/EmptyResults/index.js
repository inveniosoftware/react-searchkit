import { connect } from '@app/store';
import EmptyResultsComponent from './EmptyResults';

export const EmptyResults = connect(state => ({
  total: state.results.data.total,
  loading: state.results.loading,
  error: state.results.error,
}))(EmptyResultsComponent);
