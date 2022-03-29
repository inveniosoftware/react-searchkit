/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _truncate from "lodash/truncate";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { OverridableContext } from "react-overridable";
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Item,
  Label,
  Menu,
} from "semantic-ui-react";
import { ESSearchApi } from "../../lib/api/contrib/elasticsearch";
import {
  BucketAggregation,
  EmptyResults,
  Error,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  withState,
} from "../../lib/components";
import { DemoESRequestSerializer } from "./DemoESRequestSerializer";
import { Results } from "./Results";

const OnResults = withState(Results);

const searchApi = new ESSearchApi({
  axios: {
    url: "http://localhost:5000/random/_search",
    timeout: 5000,
  },
  es: {
    requestSerializer: DemoESRequestSerializer,
  },
});

const initialState = {
  layout: "list",
  page: 1,
  size: 10,
};

const customAggValuesContainerCmp = (valuesCmp) => <Menu.Menu>{valuesCmp}</Menu.Menu>;

const customAggValueCmp = (bucket, isSelected, onFilterClicked, getChildAggCmps) => {
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

class Tags extends Component {
  onClick = (event, value) => {
    window.history.push({
      search: `${window.location.search}&f=tags_agg:${value}`,
    });
    event.preventDefault();
  };

  render() {
    const { tags } = this.props;
    return tags.map((tag, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Button key={index} size="mini" onClick={(event) => this.onClick(event, tag)}>
        {tag}
      </Button>
    ));
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};

const ElasticSearchResultsListItem = ({ result, index }) => {
  return (
    <Item key={index} href="#">
      <Item.Image size="small" src={result.picture || "http://placehold.it/200"} />
      <Item.Content>
        <Item.Header>
          {result.first_name} {result.last_name}
        </Item.Header>
        <Item.Description>{_truncate(result.about, { length: 200 })}</Item.Description>
        <Item.Extra>
          <Tags tags={result.tags} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

ElasticSearchResultsListItem.propTypes = {
  result: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
};

const ElasticSearchResultsGridItem = ({ result, index }) => {
  return (
    <Card fluid key={index} href="#">
      <Image src={result.picture || "http://placehold.it/200"} />
      <Card.Content>
        <Card.Header>
          {result.first_name} {result.last_name}
        </Card.Header>
        <Card.Description>{_truncate(result.about, { length: 200 })}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Tags tags={result.tags} />
      </Card.Content>
    </Card>
  );
};

ElasticSearchResultsGridItem.propTypes = {
  result: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
};

const overriddenComponents = {
  "ResultsList.item.elasticsearch": ElasticSearchResultsListItem,
  "ResultsGrid.item.elasticsearch": ElasticSearchResultsGridItem,
};

export class App extends Component {
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
            <Grid relaxed style={{ padding: "2em 0" }}>
              <Grid.Row columns={2}>
                <Grid.Column width={4}>
                  <BucketAggregation
                    title="Tags"
                    agg={{ field: "tags", aggName: "tags_agg" }}
                    renderValuesContainerElement={customAggValuesContainerCmp}
                    renderValueElement={customAggValueCmp}
                  />
                  <BucketAggregation
                    title="Employee Types"
                    agg={{
                      field: "employee_type.type",
                      aggName: "type_agg",
                      childAgg: {
                        field: "employee_type.subtype",
                        aggName: "subtype_agg",
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
      </OverridableContext.Provider>
    );
  }
}
