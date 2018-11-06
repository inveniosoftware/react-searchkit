import { connect } from '@app/store';
import ResultsLoaderComponent from './ResultsLoader';

export const ResultsLoader = connect(state => ({
  loading: state.results.loading,
}))(ResultsLoaderComponent);
