import { connect } from '../../store';
import ResultsListComponent from './ResultsList';

export const ResultsList = connect(state => ({
  data: state.results.data,
  error: state.results.error,
}))(ResultsListComponent);
