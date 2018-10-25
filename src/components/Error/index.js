import { connect } from '../../store';
import ErrorComponent from './Error';

export const Error = connect(state => ({
  error: state.results.error,
}))(ErrorComponent);
