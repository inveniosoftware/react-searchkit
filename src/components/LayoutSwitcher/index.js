import { connect } from '@app/store';
import { updateResultsLayout, setInitialState } from '@app/state/actions';
import LayoutSwitcherComponent from './LayoutSwitcher';

const mapDispatchToProps = dispatch => ({
  updateLayout: layout => dispatch(updateResultsLayout(layout)),
  setInitialState: initialState => dispatch(setInitialState(initialState)),
});
export const LayoutSwitcher = connect(
  state => ({
    currentLayout: state.query.layout,
    loading: state.results.loading,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(LayoutSwitcherComponent);
