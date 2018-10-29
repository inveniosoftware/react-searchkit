import { connect } from '@app/store';
import EmptyResultsComponent from './EmptyResults';

export const EmptyResults = connect(state => ({
  error: state.results.error,
}))(EmptyResultsComponent);
