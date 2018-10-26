import { connect } from '@app/store';
import { setQueryFromUrl } from '@app/state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

const mapDispatchToProps = dispatch => ({
  setUrlParams: url => dispatch(setQueryFromUrl(url)),
});

export const UrlParamsProvider = connect(
  null,
  mapDispatchToProps
)(UrlParamsProviderComponent);
