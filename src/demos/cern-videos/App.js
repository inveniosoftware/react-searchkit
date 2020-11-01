/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _truncate from 'lodash/truncate';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import {
  Accordion,
  Card,
  Container,
  Grid,
  Image,
  Item,
  Menu,
} from 'semantic-ui-react';
import { InvenioSearchApi } from '../../lib/api/contrib/invenio';
import {
  BucketAggregation,
  EmptyResults,
  Error,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  withState,
} from '../../lib/components';
import { Results } from './Results';

const OnResults = withState(Results);

const sortValues = [
  {
    text: 'Newest',
    sortBy: 'mostrecent',
    sortOrder: 'asc',
  },
  {
    text: 'Oldest',
    sortBy: 'oldest',
    sortOrder: 'asc',
  },
  {
    text: 'Best match',
    sortBy: 'bestmatch',
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

const initialState = {
  sortBy: 'bestmatch',
  sortOrder: 'asc',
  layout: 'list',
  page: 1,
  size: 10,
};

const searchApi = new InvenioSearchApi({
  axios: {
    url: 'https://videos.cern.ch/api/records/',
    timeout: 5000,
  },
});

const CERNVideosResultsListItem = ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Item key={index} href={`#${metadata.recid}`}>
      <Item.Image
        size="small"
        src={result.imageSrc || 'http://placehold.it/200'}
      />
      <Item.Content>
        <Item.Header>{metadata.title.title}</Item.Header>
        <Item.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

const CERNVideosResultsGridItem = ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Card fluid key={index} href={`#${metadata.recid}`}>
      <Image src={result.imageSrc || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header>{metadata.title.title}</Card.Header>
        <Card.Meta>{metadata.publication_date}</Card.Meta>
        <Card.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const overriddenComponents = {
  'ResultsList.item.cernvideos': CERNVideosResultsListItem,
  'ResultsGrid.item.cernvideos': CERNVideosResultsGridItem,
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
        <ReactSearchKit
          searchApi={searchApi}
          initialQueryState={initialState}
          urlHandlerApi={{ enabled: false }}
          defaultSortingOnEmptyQueryString={{
            sortBy: 'mostrecent',
            sortOrder: 'asc',
          }}
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
      </OverridableContext.Provider>
    );
  }
}
