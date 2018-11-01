import { connect } from '@app/store';
import ErrorComponent from './Error';

export const Error = connect(state => ({
  error: state.results.error,
  loading: state.results.loading,
}))(ErrorComponent);
