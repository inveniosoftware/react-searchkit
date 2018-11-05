import { connect } from '../../store';
import CountComponent from './Count';

export var Count = connect(function (state) {
  return {
    total: state.results.data.total,
    loading: state.results.loading
  };
})(CountComponent);