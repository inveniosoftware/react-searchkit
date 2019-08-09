/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _ from 'lodash';
import Qs from 'qs';
import { InvenioSearchApi } from './InvenioSearchApi';

/** Default suggestions request serializer */
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

/** Default suggestions response serializer */
class InvenioSuggestionResponseSerializer {
  constructor(responseField) {
    this.responseFieldPath = responseField.split('.');
  }

  _serializeSuggestions = responseHits => {
    return Array.from(
      new Set(
        responseHits.map(hit => _.get(hit.metadata, this.responseFieldPath))
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

/** Default Invenio Suggestion API adapter */
export class InvenioSuggestionApi extends InvenioSearchApi {
  constructor(config = {}) {
    super(config);
    this.requestSerializer =
      config.requestSerializer ||
      new InvenioSuggestionRequestSerializer(this.config.queryField);
    this.responseSerializer =
      config.responseSerializer ||
      new InvenioSuggestionResponseSerializer(this.config.responseField);
  }
}
