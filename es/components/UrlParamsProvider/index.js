import { connect } from '../../store';
import { setQueryFromUrl } from '../../state/actions';
import UrlParamsProviderComponent from './UrlParamsProvider';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setUrlParams: function setUrlParams(searchDefault) {
      return dispatch(setQueryFromUrl(searchDefault, true));
    },
    setUrlParamsWithoutPush: function setUrlParamsWithoutPush(searchDefault) {
      return dispatch(setQueryFromUrl(searchDefault, false));
    }
  };
};

export var UrlParamsProvider = connect(null, mapDispatchToProps)(UrlParamsProviderComponent);