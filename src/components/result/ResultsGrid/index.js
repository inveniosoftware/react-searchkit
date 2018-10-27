import { connect } from '@app/store';
import ResultsGridComponent from './ResultsGrid';

export const ResultsGrid = connect(state => ({
  items: state.results.data.hits,
}))(ResultsGridComponent);
