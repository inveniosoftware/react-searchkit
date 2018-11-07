/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Item, Label } from 'semantic-ui-react';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderItem;
  }

  _renderItem(item, index) {
    const metadata = item.metadata;
    const keywords = metadata.keywords || [];
    const labels = keywords.map((keyword, index) => (
      <Label key={index} content={keyword} />
    ));

    return (
      <Item key={item.id} href={`#${metadata.recid}`}>
        <Item.Image
          size="small"
          src={item.imageSrc || 'https://via.placeholder.com/200'}
        />

        <Item.Content>
          <Item.Header>{metadata.title.title || metadata.title}</Item.Header>
          <Item.Description>
            {_truncate(metadata.description, { length: 200 })}
          </Item.Description>
          <Item.Extra>{labels}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  renderItems(items) {
    return items.map((item, index) => {
      return this.renderElement(item, index);
    });
  }

  render() {
    const items = this.props.items;
    return (
      <Item.Group divided relaxed link>
        {this.renderItems(items)}
      </Item.Group>
    );
  }
}

ResultsList.propTypes = {
  items: PropTypes.array.isRequired,
  renderElement: PropTypes.func,
};

ResultsList.defaultProps = {};
