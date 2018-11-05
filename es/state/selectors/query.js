import Qs from 'qs';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';

function startsWith(first, second) {
  return first.indexOf(second) === 0;
}

export var updateQueryAggregation = function updateQueryAggregation(query, state) {
  if (!query) return;
  var strQuery = Qs.stringify(query);

  var isExactMatch = false;
  var filtered = state.map(function (stateObjQuery) {
    return Qs.stringify(stateObjQuery);
  }).filter(function (stateQuery) {
    // filter out previous user selections by comparing the initial parts of the state and the query
    var queryMatchState = startsWith(stateQuery, strQuery);
    var stateMatchQuery = startsWith(strQuery, stateQuery);

    isExactMatch = queryMatchState && stateMatchQuery;
    return !queryMatchState && !stateMatchQuery;
  });

  var firstKey = Object.keys(query)[0];
  // add the user query to the state only if it was removed and it has a value
  if (!isExactMatch && query[firstKey]['value']) {
    filtered.push(strQuery);
  }

  return filtered.map(function (stateStrQuery) {
    return Qs.parse(stateStrQuery);
  });
};