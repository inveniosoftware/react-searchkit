import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Item, Label } from 'semantic-ui-react';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.items = props.items;
    this.renderElement = props.renderItem || this._renderElement;
  }

  _renderElement(rowData) {
    const metadata = rowData.metadata;
    return (
      <Item
        key={rowData.id}
        href={`https://videos.cern.ch/record/${metadata.recid}`}
      >
        <Item.Image size="small" src="https://via.placeholder.com/200" />

        <Item.Content>
          <Item.Header>{metadata.title.title || metadata.title}</Item.Header>
          <Item.Description>
            {_truncate(metadata.description, { length: 200 })}
          </Item.Description>
          <Item.Extra>
            <Label icon="globe" content="My label" />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  renderItems(items) {
    return items.map(item => {
      return this.renderElement(item);
    });
  }

  render() {
    return (
      <Item.Group divided relaxed link>
        {this.renderItems(this.items)}
      </Item.Group>
    );
  }
}

ResultsList.propTypes = {
  items: PropTypes.array.isRequired,
  renderElement: PropTypes.func,
};

ResultsList.defaultProps = {
  items: [],
};
