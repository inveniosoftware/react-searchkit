import { connect } from '@app/store';
import { updateQueryPaginationSize, setInitialState } from '@app/state/actions';
import ResultsPerPageComponent from './ResultsPerPage';

const mapDispatchToProps = dispatch => ({
  updateQuerySize: size => dispatch(updateQueryPaginationSize(size)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const ResultsPerPage = connect(
  state => ({
    currentSize: state.query.size,
    totalResults: state.results.data.total,
    loading: state.results.loading,
  }),
  mapDispatchToProps
)(ResultsPerPageComponent);
