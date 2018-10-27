import { connect } from '@app/store';
import { updateQueryPaginationPage } from '@app/state/actions';
import PaginationComponent from './Pagination';

const mapDispatchToProps = dispatch => ({
  updateQueryPage: page => dispatch(updateQueryPaginationPage(page)),
});

export const Pagination = connect(
  state => ({
    currentPage: state.query.pagination.page,
    currentSize: state.query.pagination.size,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(PaginationComponent);
