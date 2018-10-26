import { connect } from '@app/store';
import { updateQueryString } from '@app/state/actions';
import SearchBarComponent from './SearchBar';

const mapDispatchToProps = dispatch => ({
  updateQueryString: query => dispatch(updateQueryString(query)),
});

export const SearchBar = connect(
  state => ({
    queryString: state.query.queryString,
  }),
  mapDispatchToProps
)(SearchBarComponent);
