export const onQueryChanged = payload => {
  var evt = new CustomEvent('queryChanged', {
    detail: payload,
  });
  window.dispatchEvent(evt);
};
