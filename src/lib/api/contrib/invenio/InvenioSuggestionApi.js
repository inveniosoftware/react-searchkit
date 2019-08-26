/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';
import _hasIn from 'lodash/hasIn';
import Qs from 'qs';
import { InvenioSearchApi } from './InvenioSearchApi';

class InvenioSuggestionRequestSerializer {
  constructor(queryField) {
    this.queryField = queryField;
  }

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize = stateQuery => {
    const { suggestionString } = stateQuery;

    const getParams = {};
    if (suggestionString !== null) {
      getParams['q'] = this.queryField + ':' + suggestionString;
    }

    return Qs.stringify(getParams, { arrayFormat: 'repeat', encode: false });
  };
}

class InvenioSuggestionResponseSerializer {
  constructor(responseField) {
    this.responseFieldPath = responseField.split('.');
  }

  _serializeSuggestions = responseHits => {
    return Array.from(
      new Set(
        responseHits.map(hit => _get(hit.metadata, this.responseFieldPath))
      )
    );
  };

  /**
   * Return a serialized version of the API backend response for the app state `suggestions`.
   * @param {object} payload the backend response payload
   */
  serialize = payload => {
    return {
      suggestions: this._serializeSuggestions(payload.hits.hits || []),
    };
  };
}

export class InvenioSuggestionApi extends InvenioSearchApi {
  validateConfig(config) {
    super.validateConfig(config);

    if (!_hasIn(config, 'invenio.suggestions.queryField')) {
      throw new Error(
        'InvenioSuggestionApi config: `invenio.suggestions.queryField` is required.'
      );
    }
    if (!_hasIn(config, 'invenio.suggestions.responseField')) {
      throw new Error(
        'InvenioSuggestionApi config: `invenio.suggestions.queryField` is responseField.'
      );
    }
  }

  initSerializers(config) {
    const requestSerializerCls = _get(
      config,
      'invenio.requestSerializer',
      InvenioSuggestionRequestSerializer
    );
    const responseSerializerCls = _get(
      config,
      'invenio.responseSerializer',
      InvenioSuggestionResponseSerializer
    );

    this.requestSerializer = new requestSerializerCls(
      config.invenio.suggestions.queryField
    );
    this.responseSerializer = new responseSerializerCls(
      config.invenio.suggestions.responseField
    );
  }
}
