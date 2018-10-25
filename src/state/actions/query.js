import {
  SET_QUERY_STRING,
  FETCHING_RESULTS,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_ERROR,
} from '../types';

export const setQueryString = queryString => ({
  type: SET_QUERY_STRING,
  payload: queryString,
});

export const execute = query => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_RESULTS });

    let apiConfig = { ...getState().apiConfig };
    let searchApi = getState().searchApi;
    let queryState = getState().query;
    searchApi
      .search(queryState, apiConfig)
      .then(response => {
        let data = searchApi.serialize(response.data);
        dispatch({
          type: RESULTS_FETCH_SUCCESS,
          payload: data,
        });
      })
      .catch(reason => {
        dispatch({ type: RESULTS_FETCH_ERROR, payload: reason });
      });
  };
};
