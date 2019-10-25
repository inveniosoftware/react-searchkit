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

const SpanWithMargin = ({ text, margin }) => {
  const size = '0.5em';
  let style;
  switch (margin) {
    case 'left':
      style = { marginLeft: size };
      break;
    case 'right':
      style = { marginRight: size };
      break;
    default:
      style = { margin: `0 ${size}` };
  }
  return <span style={style}>{text}</span>;
};

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
            <SpanWithMargin text="Found" margin="right" />
            <Count />
            <SpanWithMargin text="results sorted by" />
            <Sort values={this.sortValues} />
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <SpanWithMargin text="Show" margin="right" />
            <ResultsPerPage
              values={this.resultsPerPageValues}
              defaultValue={10}
            />
            <SpanWithMargin text="results per page" />
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
