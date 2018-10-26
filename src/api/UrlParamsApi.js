export class UrlParamsApi {
  constructor(urlMap) {
    this.urlMap = urlMap;
  }

  _parseUrlSearch(search = '') {
    let params = {};
    let parts = search.replace(/^\?/, '').split('&');
    parts.forEach(part => {
      let entries = part.split('=');
      let key = decodeURI(entries[0]);
      let value = decodeURI(entries[1]);
      if (!params[key]) {
        params[key] = decodeURI(value);
      } else {
        if (Array.isArray(params[key])) {
          params[key] = [value, ...params[key]];
        } else {
          params[key] = [params[key], value];
        }
      }
    });
    return params;
  }

  _setField(obj, key, value) {
    if (!obj[key]) {
      obj[key] = value;
    }
  }

  _serializeParams(params) {
    let response = {};
    this._setField(response, 'queryString', params['q']);
    return response;
  }

  getUrlParams(location) {
    let params = this._parseUrlSearch(location.search);
    return this._serializeParams(params);
  }

  setUrlParams() {
    console.log('Set url params');
  }
}

let api = {
  queryString: '',
  filters: [],
  sorting: '',
};
