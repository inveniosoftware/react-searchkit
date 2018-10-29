import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';

export const parseUrlSearch = (search = '') => {
  let params = {};
  let parts = search.replace(/^\?/, '').split('&');
  parts.forEach(part => {
    const entries = part.split('=');
    const key = decodeURI(entries[0]);
    const value = decodeURI(entries[1]);

    let parsedValue = parseInt(value);
    if (_isNaN(parsedValue)) {
      try {
        const _value = JSON.parse(value);
        if (!_isNil(_value)) {
          parsedValue = _value;
        }
      } catch (e) {
        if (value !== 'undefined') {
          parsedValue = value;
        } else {
          console.error(`Cannot parse value ${value} for param ${key}.`);
        }
      }
    }
    params[key] = parsedValue;
  });
  return params;
};

export const pushHistory = query => {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

export const is_param_valid = (key, value) => true;
