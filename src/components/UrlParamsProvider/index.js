import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

const mapDispatchToProps = dispatch => ({
  setUrlParams: (url, searchDefault) =>
    dispatch(setQueryFromUrl(url, searchDefault)),
});

export const UrlParamsProvider = connect(
  null,
  mapDispatchToProps
)(UrlParamsProviderComponent);
