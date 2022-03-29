/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { InvenioSearchApi } from "../../../lib/api/contrib/invenio";
import {
  EmptyResults,
  Error,
  ReactSearchKit,
  ResultsLoader,
  withState,
} from "../../../lib/components";
import { Results } from "../Results";

const OnResults = withState(Results);

const sortValues = [
  {
    text: "Newest",
    sortBy: "mostrecent",
    sortOrder: "asc",
  },
  {
    text: "Oldest",
    sortBy: "oldest",
    sortOrder: "asc",
  },
  {
    text: "Best match",
    sortBy: "bestmatch",
    sortOrder: "asc",
  },
];

const resultsPerPageValues = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
];

const initialState = {
  sortBy: "bestmatch",
  sortOrder: "asc",
  layout: "list",
  page: 1,
  size: 10,
};

const searchApi = new InvenioSearchApi({
  axios: {
    url: "https://videos.cern.ch/api/records/",
    timeout: 5000,
  },
});

export const App = () => (
  <ReactSearchKit
    searchApi={searchApi}
    initialQueryState={initialState}
    urlHandlerApi={{ enabled: false }}
    defaultSortingOnEmptyQueryString={{
      sortBy: "mostrecent",
      sortOrder: "asc",
    }}
    appName="cernvideos2"
  >
    <ResultsLoader>
      <EmptyResults />
      <Error />
      <OnResults sortValues={sortValues} resultsPerPageValues={resultsPerPageValues} />
    </ResultsLoader>
  </ReactSearchKit>
);
