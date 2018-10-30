import _isNaN from 'lodash/isNaN';
import _isNil from 'lodash/isNil';
import qs from 'qs';

const sanitizeParamValue = value => {
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
  return parsedValue;
};

export const parseUrlSearch = (search = '') => {
  let parsedParams = qs.parse(search, { ignoreQueryPrefix: true });
  let params = {};
  Object.entries(parsedParams).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    params[key] = sanitizeParamValue(value);
  });
  return params;
};

export const pushHistory = query => {
  if (window.history.pushState) {
    window.history.pushState({ path: query }, '', query);
  }
};

export const is_param_valid = (key, value) => true;
