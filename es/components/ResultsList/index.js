import { connect } from '../../store';
import ResultsListComponent from './ResultsList';

export var ResultsList = connect(function (state) {
  return {
    items: state.results.data.hits
  };
})(ResultsListComponent);