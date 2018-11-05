import { connect } from '../../store';
import ErrorComponent from './Error';

export var Error = connect(function (state) {
  return {
    error: state.results.error,
    loading: state.results.loading
  };
})(ErrorComponent);