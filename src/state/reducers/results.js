import {
  FETCHING_RESULTS,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '../types';

export const initialState = { loading: false, data: [], error: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_RESULTS:
      return {
        loading: true,
        data: {
          hits: [],
          total: 0,
        },
        error: {},
      };
    case RESULTS_FETCH_SUCCESS:
      return { loading: false, data: action.payload, error: {} };
    case RESULTS_FETCH_ERROR:
      return {
        loading: false,
        data: {
          hits: [],
          total: 0,
        },
        error: action.payload,
      };
    default:
      return state;
  }
};
