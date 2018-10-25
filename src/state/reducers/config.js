import { ADD_CONFIG } from '../types';

export default function configReducer(state = {}, action) {
  if (action.type === ADD_CONFIG) {
    return action.config;
  }
  return state;
}
