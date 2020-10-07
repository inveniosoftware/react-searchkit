/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import {
  Container,
  Grid,
  Accordion,
  Menu,
  Card,
  Image,
  Item,
} from 'semantic-ui-react';
import _truncate from 'lodash/truncate';
import { OverridableContext } from 'react-overridable';

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
    text: 'Most viewed',
    sortBy: 'mostviewed',
    sortOrder: 'asc',
  },
  {
    text: 'Least viewed',
    sortBy: 'mostviewed',
    sortOrder: 'desc',
  },
  {
    text: 'Newest',
    sortBy: 'mostrecent',
    sortOrder: 'asc',
  },
  {
    text: 'Oldest',
    sortBy: 'mostrecent',
    sortOrder: 'desc',
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
  {
    text: '50',
    value: 50,
  },
];

const searchApi = new InvenioSearchApi({
  axios: {
    url: 'https://zenodo.org/api/records/',
    timeout: 5000,
    headers: { Accept: 'application/vnd.zenodo.v1+json' },
  },
});

const initialState = {
  sortBy: 'mostrecent',
  sortOrder: 'asc',
  layout: 'list',
  page: 1,
  size: 10,
};

export const ZenodoResultsListItem = ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Item key={index} href={`#`}>
      <Item.Image
        size="small"
        src={result.imageSrc || 'http://placehold.it/200'}
      />
      <Item.Content>
        <Item.Header>{metadata.title}</Item.Header>
        <Item.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export const ZenodoResultsGridItem = ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Card fluid key={index} href={`#`}>
      <Image src={result.imageSrc || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header>{metadata.title}</Card.Header>
        <Card.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const overriddenComponents = {
  'ResultsList.item.zenodo': ZenodoResultsListItem,
  'ResultsGrid.item.zenodo': ZenodoResultsGridItem,
};

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
      <OverridableContext.Provider value={overriddenComponents}>
        <ReactSearchKit searchApi={searchApi} initialQueryState={initialState}>
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
                    title="File types"
                    agg={{
                      field: 'file_type',
                      aggName: 'file_type',
                    }}
                    overridableId="filetype"
                  />
                  <br />
                  <BucketAggregation
                    title="Keywords"
                    agg={{
                      field: 'keywords',
                      aggName: 'keywords',
                    }}
                  />
                  <br />
                  <BucketAggregation
                    title="Types"
                    agg={{
                      field: 'resource_type.type',
                      aggName: 'type',
                      childAgg: {
                        field: 'resource_type.subtype',
                        aggName: 'subtype',
                      },
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
      </OverridableContext.Provider>
    );
  }
}
