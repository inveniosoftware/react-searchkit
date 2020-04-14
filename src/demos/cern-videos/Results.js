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
import {
  ActiveFilters,
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsMultiLayout,
  ResultsList,
  ResultsGrid,
  ResultsPerPage,
  Sort,
} from '../../lib/components';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.sortValues = this.props.sortValues;
    this.resultsPerPageValues = this.props.resultsPerPageValues;
  }

  renderResultsListItem = (result, index) => {
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

  renderResultsGridItem(result, index) {
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
  }

  render() {
    const { total } = this.props.currentResultsState.data;
    const CustomResultsListCmp = () => (
      <ResultsList renderListItem={this.renderResultsListItem} />
    );
    const CustomResultsGridCmp = () => (
      <ResultsGrid renderGridItem={this.renderResultsGridItem} />
    );
    return total ? (
      <div>
        <Grid relaxed>
          <ActiveFilters />
        </Grid>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <Count label={(val) => <> Found {val} results</>} />
            <Sort
              values={this.sortValues}
              label={(val) => <> sorted by {val}</>}
            />
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <ResultsPerPage
              values={this.resultsPerPageValues}
              label={(val) => <> Show {val} results per page</>}
              defaultValue={10}
            />
            <LayoutSwitcher defaultLayout="grid" />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout
            resultsListCmp={CustomResultsListCmp}
            resultsGridCmp={CustomResultsGridCmp}
          />
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
