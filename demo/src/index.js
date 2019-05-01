/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Segment,
  Container,
  Header,
  Grid,
  Accordion,
  Menu,
} from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  BucketAggregation,
  EmptyResults,
  Error,
  ResultsLoader,
} from '@app/components';
import { Results } from './Results';
import { InvenioSearchApi, ElasticSearchApi } from '@app/api';

class Demo extends Component {
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
    // const sortByValues = [
    //   {
    //     text: 'Best Match',
    //     value: '_score',
    //   },
    //   {
    //     text: 'ID',
    //     value: '_id',
    //   },
    // ];

    const sortByValues = [
      {
        text: 'Best Match',
        value: 'bestmatch',
      },
      {
        text: 'Newest',
        value: 'mostrecent',
      },
    ];

    const sortOrderValues = [
      { text: 'asc', value: 'asc' },
      { text: 'desc', value: 'desc' },
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

    const genresAgg = {
      name: 'genres',
      field: 'genre',
      aggs: { name: 'subgenres', field: 'subgenre' },
    };

    // const searchApi = new ElasticSearchApi({
    //   url: 'http://localhost:9200/rsk_documents/_search',
    //   timeout: 5000,
    //   aggregations: [genresAgg],
    // });
    const searchApi = new InvenioSearchApi({
      url: 'https://zenodo.org/api/records/',
      timeout: 5000,
      headers: { Accept: 'application/vnd.zenodo.v1+json' },
    });

    return (
      <div>
        <ReactSearchKit
          searchApi={searchApi}
          persistentUrl={{ enabled: false }}
        >
          <div>
            <Segment inverted>
              <Container>
                <Grid columns="equal" verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h1" content="React-SearchKit" inverted />
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="center">
                      <SearchBar />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>

            <Container>
              <Grid relaxed style={{ padding: '2em 0' }}>
                <Grid.Row columns={2}>
                  <Grid.Column width={3}>
                    <BucketAggregation
                      title="File types"
                      agg={{ name: 'file_type', field: 'file_type' }}
                      field="file_type"
                      customProps={{ index: 0 }}
                      renderElement={this.renderAccordionAggregations}
                    />
                    <br />

                    <BucketAggregation
                      title="Keywords"
                      agg={{ name: 'keywords', field: 'keywords' }}
                      customProps={{ index: 1 }}
                      renderElement={this.renderAccordionAggregations}
                    />
                    <br />

                    <BucketAggregation
                      title="Types"
                      agg={{
                        name: 'type',
                        field: 'type',
                        aggs: { name: 'subtype', field: 'subtype' },
                      }}
                      customProps={{ index: 2 }}
                      renderElement={this.renderAccordionAggregations}
                    />
                    <br />
                    {/* <BucketAggregation title="Genres" agg={genresAgg} /> */}
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <ResultsLoader>
                      <EmptyResults />
                      <Error />
                      <Results
                        sortByValues={sortByValues}
                        sortOrderValues={sortOrderValues}
                        resultsPerPageValues={resultsPerPageValues}
                      />
                    </ResultsLoader>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </ReactSearchKit>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
