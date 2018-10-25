import { connect } from '@app/store';
import ResultsContainerComponent from './ResultsContainer';

export const ResultsContainer = connect(state => ({
  loading: state.results.loading,
}))(ResultsContainerComponent);
