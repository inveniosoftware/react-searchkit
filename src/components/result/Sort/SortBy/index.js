import { connect } from '@app/store';
import { updateQuerySortBy, setInitialState } from '@app/state/actions';
import SortByComponent from './SortBy';
const mapDispatchToProps = dispatch => ({
  updateQuerySortBy: sortByValue => dispatch(updateQuerySortBy(sortByValue)),
  setInitialState: value => dispatch(setInitialState(value)),
});

export const SortBy = connect(
  state => ({
    total: state.results.data.total,
    currentSortBy: state.query.sortBy,
    loading: state.results.loading,
  }),
  mapDispatchToProps
)(SortByComponent);
