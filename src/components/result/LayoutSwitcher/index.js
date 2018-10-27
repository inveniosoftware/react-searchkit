import { connect } from '@app/store';
import { updateResultsLayout } from '@app/state/actions';
import LayoutSwitcherComponent from './LayoutSwitcher';

const mapDispatchToProps = dispatch => ({
  updateLayout: layout => dispatch(updateResultsLayout(layout)),
});
export const LayoutSwitcher = connect(
  state => ({
    currentLayout: state.results.data.layout,
    totalResults: state.results.data.total,
  }),
  mapDispatchToProps
)(LayoutSwitcherComponent);
