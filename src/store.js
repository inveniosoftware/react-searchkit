import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './state/reducers';

export const storeKey = 'react-searchkit';

export function configureStore(config) {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(config)))
  );
}

function connectExtended(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options = {}
) {
  options.storeKey = storeKey;
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  );
}

export { connectExtended as connect };
