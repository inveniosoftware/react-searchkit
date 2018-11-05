import { connect } from '../../store';
import { updateResultsLayout, setInitialState as _setInitialState } from '../../state/actions';
import LayoutSwitcherComponent from './LayoutSwitcher';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateLayout: function updateLayout(layout) {
      return dispatch(updateResultsLayout(layout));
    },
    setInitialState: function setInitialState(initialState) {
      return dispatch(_setInitialState(initialState));
    }
  };
};
export var LayoutSwitcher = connect(function (state) {
  return {
    currentLayout: state.query.layout,
    loading: state.results.loading,
    totalResults: state.results.data.total
  };
}, mapDispatchToProps)(LayoutSwitcherComponent);