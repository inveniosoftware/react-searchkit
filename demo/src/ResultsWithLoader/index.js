import { connect } from '@app/store';
import ResultsWithLoaderComponent from './ResultsWithLoader';

export const ResultsWithLoader = connect(state => ({
  loading: state.results.loading,
}))(ResultsWithLoaderComponent);
