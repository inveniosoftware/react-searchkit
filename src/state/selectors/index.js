export const processNewAggregationState = (
  currentAggregations,
  newAggregation
) => {
  // simple way to copy SMALL objects
  let newState = JSON.parse(JSON.stringify(currentAggregations || {}));
  const actionField = newAggregation.field;
  const actionValue = newAggregation.value;
  // if not present just add it
  if (!(actionField in newState)) {
    newState[actionField] = [actionValue];
  } // else, add or remove it from the list
  else {
    const aggrState = newState[actionField];
    if (aggrState.indexOf(actionValue) === -1) {
      newState[actionField].push(actionValue);
    } else {
      newState[actionField] = aggrState.filter(value => value !== actionValue);
    }
  }
  return newState;
};
