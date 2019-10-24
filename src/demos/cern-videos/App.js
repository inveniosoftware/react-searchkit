/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Container, Grid, Accordion, Menu } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  BucketAggregation,
  EmptyResults,
  Error,
  ResultsLoader,
  withState,
} from '../../lib/components';
import { Results } from './Results';
import { InvenioSearchApi } from '../../lib/api/contrib/invenio';

const OnResults = withState(Results);

const sortValues = [
  {
    text: 'Newest',
    sortBy: 'mostrecent',
    sortOrder: 'asc',
    default: true,
  },
  {
    text: 'Oldest',
    sortBy: 'oldest',
    sortOrder: 'asc',
  },
];

const resultsPerPageValues = [
  {
    text: '10',
    value: 10,
  },
  {
    text: '20',
    value: 20,
  },
];

const searchApi = new InvenioSearchApi({
  url: 'https://videos.cern.ch/api/records/',
  timeout: 5000,
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderAccordionAggregations = (
    title,
    resultsAggregations,
    aggregations,
    customProps
  ) => {
    const { activeIndex } = this.state;

    return resultsAggregations !== undefined ? (
      <Accordion as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            content={title}
            index={customProps.index}
            active={activeIndex === customProps.index}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === customProps.index}
            content={aggregations}
          />
        </Menu.Item>
      </Accordion>
    ) : null;
  };

  render() {
    return (
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
              <Grid.Column width={4}>
                <BucketAggregation
                  title="Categories"
                  agg={{
                    field: 'category',
                    aggName: 'category',
                  }}
                />
                <br />
                <BucketAggregation
                  title="Languages"
                  agg={{
                    field: 'language',
                    aggName: 'language',
                  }}
                />
                <br />
                <BucketAggregation
                  title="Types"
                  agg={{
                    field: 'type',
                    aggName: 'type',
                  }}
                />
                <br />
              </Grid.Column>
              <Grid.Column width={12}>
                <ResultsLoader>
                  <EmptyResults />
                  <Error />
                  <OnResults
                    sortValues={sortValues}
                    resultsPerPageValues={resultsPerPageValues}
                  />
                </ResultsLoader>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ReactSearchKit>
    );
  }
}
