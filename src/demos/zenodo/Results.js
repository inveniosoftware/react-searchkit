/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Grid, Card, Image, Item } from 'semantic-ui-react';
import _truncate from 'lodash/truncate';
import { overrideStore } from 'react-overridable';
import {
  ActiveFilters,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
  ResultsPerPage,
  Sort,
} from '../../lib/components';

const ZenodoResultsListItem = ({ result, index }) => {
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

const ZenodoResultsGridItem = ({ result, index }) => {
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

overrideStore.override('ResultsList.item.zenodo', ZenodoResultsListItem);
overrideStore.override('ResultsGrid.item.zenodo', ZenodoResultsGridItem);

export class Results extends Component {
  constructor(props) {
    super(props);

    this.sortValues = this.props.sortValues;
    this.resultsPerPageValues = this.props.resultsPerPageValues;
  }

  render() {
    const { total } = this.props.currentResultsState.data;
    return total ? (
      <div>
        <Grid relaxed>
          <ActiveFilters />
        </Grid>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span style={({ marginLeft: '0.5em' }, { marginRight: '0.5em' })}>
              <Count label={(cmp) => <>Found {cmp} results</>} />
              <Sort
                values={this.sortValues}
                label={(cmp) => <> sorted by {cmp}</>}
              />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <span style={({ marginLeft: '0.5em' }, { marginRight: '0.5em' })}>
              <ResultsPerPage
                values={this.resultsPerPageValues}
                defaultValue={10}
                label={(cmp) => <>Show {cmp} results per page</>}
              />
            </span>
            <LayoutSwitcher defaultLayout="list" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout overridableUID="zenodo" />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </div>
    ) : null;
  }
}

Results.propTypes = {};

Results.defaultProps = {};
