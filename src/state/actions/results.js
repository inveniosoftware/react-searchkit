import { RESULTS_UPDATE_LAYOUT } from '@app/state/types';

export const updateResultsLayout = layout => {
  return dispatch => {
    dispatch({
      type: RESULTS_UPDATE_LAYOUT,
      payload: layout,
    });
  };
};
