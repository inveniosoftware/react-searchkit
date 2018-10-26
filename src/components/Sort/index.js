import { connect } from '@app/store';
import { updateQuerySortBy, updateQuerySortOrder } from '@app/state/actions';
import SortContainerComponent from './SortContainer';

const mapDispatchToProps = dispatch => ({
  updateQuerySortBy: (sortByValue, sortOrderValue) =>
    dispatch(updateQuerySortBy(sortByValue, sortOrderValue)),
  updateQuerySortOrder: sortOrderValue =>
    dispatch(updateQuerySortOrder(sortOrderValue)),
});

export const Sort = connect(
  state => ({
    total: state.results.data.total,
    currentSorting: state.query.sorting,
  }),
  mapDispatchToProps
)(SortContainerComponent);
