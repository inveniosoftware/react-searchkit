import { connect } from '../../store';
import ResultsGridComponent from './ResultsGrid';

export var ResultsGrid = connect(function (state) {
  return {
    items: state.results.data.hits
  };
})(ResultsGridComponent);