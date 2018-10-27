import { connect } from '@app/store';
import { updateQueryPaginationSize } from '@app/state/actions';
import ResultsPerPageComponent from './ResultsPerPage';

const mapDispatchToProps = dispatch => ({
  updateQuerySize: size => dispatch(updateQueryPaginationSize(size)),
});

export const ResultsPerPage = connect(
  state => ({
    currentSize: state.query.pagination.size,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(ResultsPerPageComponent);
