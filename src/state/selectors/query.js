import Qs from 'qs';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';

export const updateQueryAggregation = (query, state) => {
  if (!query) return;
  let strQuery = Qs.stringify(query);

  const filtered = state
    .map(stateObjQuery => Qs.stringify(stateObjQuery))
    .filter(stateQuery => {
      // filter out previous user selections by comparing the initial parts of the state and the query
      const queryMatchState = stateQuery.indexOf(strQuery) === 0;
      const stateMatchQuery = strQuery.indexOf(stateQuery) === 0;
      return !queryMatchState && !stateMatchQuery;
    });

  const firstKey = Object.keys(query)[0];
  // it the value is not defined, it means that nothing has been selected and it should not be added
  if (query[firstKey]['value']) {
    filtered.push(strQuery);
  }
  return filtered.map(stateStrQuery => Qs.parse(stateStrQuery));
};
