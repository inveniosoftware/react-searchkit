import { connect } from '@app/store';
import { updateQuerySortOrder, setInitialState } from '@app/state/actions';
import SortOrderComponent from './SortOrder';

const mapDispatchToProps = dispatch => ({
  updateQuerySortOrder: sortOrderValue =>
    dispatch(updateQuerySortOrder(sortOrderValue)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const SortOrder = connect(
  state => ({
    totalResults: state.results.data.total,
    currentSortOrder: state.query.sortOrder,
    loading: state.results.loading,
  }),
  mapDispatchToProps
)(SortOrderComponent);
