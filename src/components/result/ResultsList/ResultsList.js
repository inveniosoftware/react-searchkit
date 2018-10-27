import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Item, Label } from 'semantic-ui-react';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.items = props.items;
  }

  renderItems(items) {
    return items.map(item => {
      return (
        <Item href={`https://videos.cern.ch/record/${item.metadata.recid}`}>
          <Item.Image size="small" src="https://via.placeholder.com/200" />

          <Item.Content>
            <Item.Header>{item.metadata.title.title}</Item.Header>
            <Item.Description>
              {_truncate(item.metadata.description, { length: 200 })}
            </Item.Description>
            <Item.Extra>
              <Label icon="globe" content="My label" />
            </Item.Extra>
          </Item.Content>
        </Item>
      );
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
};

ResultsList.defaultProps = {
  items: [],
};
