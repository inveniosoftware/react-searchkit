import { connect } from '@app/store';
import { updateQueryPaginationPage, setInitialState } from '@app/state/actions';
import PaginationComponent from './Pagination';

const mapDispatchToProps = dispatch => ({
  updateQueryPage: page => dispatch(updateQueryPaginationPage(page)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const Pagination = connect(
  state => ({
    currentPage: state.query.page,
    currentSize: state.query.size,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(PaginationComponent);
