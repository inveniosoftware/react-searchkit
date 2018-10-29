import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

const mapDispatchToProps = dispatch => ({
  setUrlParams: searchDefault => dispatch(setQueryFromUrl(searchDefault)),
});

export const UrlParamsProvider = connect(
  null,
  mapDispatchToProps
)(UrlParamsProviderComponent);
