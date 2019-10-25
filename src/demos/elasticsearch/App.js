/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Container, Grid, Menu, Label } from 'semantic-ui-react';
import {
  BucketAggregation,
  ReactSearchKit,
  SearchBar,
  EmptyResults,
  Error,
  ResultsLoader,
  withState,
} from '../../lib/components';
import { Results } from './Results';
import { DemoESRequestSerializer } from './DemoESRequestSerializer';
import { ESSearchApi } from '../../lib/api/contrib/elasticsearch';

const OnResults = withState(Results);

const searchApi = new ESSearchApi({
  url: 'http://localhost:5000/random/_search',
  timeout: 5000,
  es: {
    requestSerializer: DemoESRequestSerializer,
  },
});

const customAggComp = (title, valuesCmp) => {
  return valuesCmp ? (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>{title}</Menu.Header>
        {valuesCmp}
      </Menu.Item>
    </Menu>
  ) : null;
};

const customAggValuesContainerCmp = valuesCmp => (
  <Menu.Menu>{valuesCmp}</Menu.Menu>
);

const customAggValueCmp = (
  bucket,
  isSelected,
  onFilterClicked,
  getChildAggCmps
) => {
  const childAggCmps = getChildAggCmps(bucket);
  return (
    <Menu.Item
      key={bucket.key}
      name={bucket.key}
      active={isSelected}
      onClick={() => onFilterClicked(bucket.key)}
    >
      <Label>{bucket.doc_count}</Label>
      {bucket.key}
      {childAggCmps}
    </Menu.Item>
  );
};

export class App extends Component {
  render() {
    return (
      <div>
        <ReactSearchKit searchApi={searchApi}>
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
                <Grid.Column width={4}>
                  <BucketAggregation
                    title="Tags"
                    agg={{ field: 'tags', aggName: 'tags_agg' }}
                    renderElement={customAggComp}
                    renderValuesContainerElement={customAggValuesContainerCmp}
                    renderValueElement={customAggValueCmp}
                  />
                  <BucketAggregation
                    title="Employee Types"
                    agg={{
                      field: 'employee_type.type',
                      aggName: 'type_agg',
                      childAgg: {
                        field: 'employee_type.subtype',
                        aggName: 'subtype_agg',
                      },
                    }}
                  />
                </Grid.Column>
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
