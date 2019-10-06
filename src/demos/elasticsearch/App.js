/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  EmptyResults,
  Error,
  ResultsLoader,
  withState,
} from '../../lib/components';
import { Results } from './Results';
import { ESSearchApi } from '../../lib/api/contrib/elasticsearch';

const OnResults = withState(Results);

const searchApi = new ESSearchApi({
  url: 'http://localhost:5000/random/_search',
  timeout: 5000,
});

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactSearchKit
          searchApi={searchApi}
          persistentUrl={{ enabled: true }}
          searchOnInit={true}
        >
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3} />
                <Grid.Column width={10}>
                  <SearchBar />
                </Grid.Column>
                <Grid.Column width={3} />
              </Grid.Row>
            </Grid>
            <Grid relaxed style={{ padding: '2em 0' }}>
              <Grid.Row columns={2}>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                  <ResultsLoader>
                    <EmptyResults />
                    <Error />
                    <OnResults />
                  </ResultsLoader>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </ReactSearchKit>
      </div>
    );
  }
}
