import { connect } from '@app/store';
import ResultsListComponent from './ResultsList';

export const ResultsList = connect(state => ({
  items: state.results.data.hits,
}))(ResultsListComponent);
