import Qs from 'qs';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';

function startsWith(first, second) {
  return first.indexOf(second) === 0;
}

export const updateQueryAggregation = (query, state) => {
  if (!query) return;
  const strQuery = Qs.stringify(query);

  let isExactMatch = false;
  const filtered = state
    .map(stateObjQuery => Qs.stringify(stateObjQuery))
    .filter(stateQuery => {
      // filter out previous user selections by comparing the initial parts of the state and the query
      const queryMatchState = startsWith(stateQuery, strQuery);
      const stateMatchQuery = startsWith(strQuery, stateQuery);

      isExactMatch = queryMatchState && stateMatchQuery;
      return !queryMatchState && !stateMatchQuery;
    });

  const firstKey = Object.keys(query)[0];
  // add the user query to the state only if it was removed and it has a value
  if (!isExactMatch && query[firstKey]['value']) {
    filtered.push(strQuery);
  }

  return filtered.map(stateStrQuery => Qs.parse(stateStrQuery));
};
