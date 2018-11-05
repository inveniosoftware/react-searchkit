import { connect } from '../../store';
import { updateQueryString as _updateQueryString } from '../../state/actions';
import SearchBarComponent from './SearchBar';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateQueryString: function updateQueryString(query) {
      return dispatch(_updateQueryString(query));
    }
  };
};

export var SearchBar = connect(function (state) {
  return {
    queryString: state.query.queryString
  };
}, mapDispatchToProps)(SearchBarComponent);