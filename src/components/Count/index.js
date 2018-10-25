import { connect } from '../../store';
import CountComponent from './Count';

export const Count = connect(state => ({
  total: state.results.data.total,
}))(CountComponent);
