import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

const mapDispatchToProps = dispatch => ({
  setUrlParams: searchOnLoad => dispatch(setQueryFromUrl(searchOnLoad, true)),
  setUrlParamsWithoutPush: searchOnLoad =>
    dispatch(setQueryFromUrl(searchOnLoad, false)),
});

export const UrlParamsProvider = connect(
  null,
  mapDispatchToProps
)(UrlParamsProviderComponent);
