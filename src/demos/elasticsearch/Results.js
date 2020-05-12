/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Grid, Card, Image, Item, Button } from 'semantic-ui-react';
import _truncate from 'lodash/truncate';
import { overrideStore } from 'react-overridable';
import {
  ActiveFilters,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
} from '../../lib/components';

class Tags extends Component {
  onClick = (event, value) => {
    window.history.push({
      search: `${window.location.search}&f=tags_agg:${value}`,
    });
    event.preventDefault();
  };

  render() {
    return this.props.tags.map((tag, index) => (
      <Button
        key={index}
        size="mini"
        onClick={(event) => this.onClick(event, tag)}
      >
        {tag}
      </Button>
    ));
  }
}

const ElasticSearchResultsListItem = ({ result, index }) => {
  return (
    <Item key={index} href={`#`}>
      <Item.Image
        size="small"
        src={result.picture || 'http://placehold.it/200'}
      />
      <Item.Content>
        <Item.Header>
          {result.first_name} {result.last_name}
        </Item.Header>
        <Item.Description>
          {_truncate(result.about, { length: 200 })}
        </Item.Description>
        <Item.Extra>
          <Tags tags={result.tags} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const ElasticSearchResultsGridItem = ({ result, index }) => {
  return (
    <Card fluid key={index} href={`#`}>
      <Image src={result.picture || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header>
          {result.first_name} {result.last_name}
        </Card.Header>
        <Card.Description>
          {_truncate(result.about, { length: 200 })}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Tags tags={result.tags} />
      </Card.Content>
    </Card>
  );
};

overrideStore.override(
  'ResultsList.item.elasticsearch',
  ElasticSearchResultsListItem
);
overrideStore.override(
  'ResultsGrid.item.elasticsearch',
  ElasticSearchResultsGridItem
);

export class Results extends Component {
  render() {
    const { total } = this.props.currentResultsState.data;
    return total ? (
      <>
        <Grid relaxed>
          <ActiveFilters />
        </Grid>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span style={({ marginLeft: '0.5em' }, { marginRight: '0.5em' })}>
              <Count label={(cmp) => <>Found {cmp}</>} />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <LayoutSwitcher defaultLayout="grid" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout overridableUID="elasticsearch" />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </>
    ) : null;
  }
}

Results.propTypes = {};

Results.defaultProps = {};
