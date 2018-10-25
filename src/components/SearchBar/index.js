import { connect } from '../../store';
import { setQueryString, execute } from '../../state/actions';
import SearchBarComponent from './SearchBar';

const mapDispatchToProps = dispatch => ({
  onQueryChange: query => dispatch(setQueryString(query)),
  onSearchExecute: query => dispatch(execute(query)),
});

export const SearchBar = connect(
  state => ({
    currentQueryString: state.query.currentQueryString,
  }),
  mapDispatchToProps
)(SearchBarComponent);
