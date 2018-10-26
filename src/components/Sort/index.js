import { connect } from '@app/store';
import { updateQuerySortBy, updateQuerySortOrder } from '@app/state/actions';
import SortComponent from './Sort';

const mapDispatchToProps = dispatch => ({
  updateQuerySortBy: sortByValue => dispatch(updateQuerySortBy(sortByValue)),
  updateQuerySortOrder: sortOrderValue =>
    dispatch(updateQuerySortOrder(sortOrderValue)),
});

export const Sort = connect(
  state => ({
    total: state.results.data.total,
    currentSorting: state.query.sorting,
  }),
  mapDispatchToProps
)(SortComponent);
