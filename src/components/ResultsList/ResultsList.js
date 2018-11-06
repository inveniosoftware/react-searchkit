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

  _renderElement(item, index) {
    const metadata = item.metadata;
    return (
      <Item key={item.id} href={`https://zenodo.org/record/${metadata.recid}`}>
        <Item.Image
          size="small"
          src={item.imageSrc || 'https://via.placeholder.com/200'}
        />

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
    return items.map((item, index) => {
      return this.renderElement(item, index);
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
