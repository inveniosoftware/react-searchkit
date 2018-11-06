import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Card, Image } from 'semantic-ui-react';

export default class ResultsGrid extends Component {
  constructor(props) {
    super(props);
    this.itemsPerRow = props.itemsPerRow;
    this.renderElement = props.renderElement || this._renderItem;
  }

  _renderItem(item) {
    let metadata = item.metadata;
    return (
      <Card fluid key={item.id} href={`#${metadata.recid}`}>
        <Image src={item.imageSrc || 'https://via.placeholder.com/200'} />
        <Card.Content>
          <Card.Header>{metadata.title.title || metadata.title}</Card.Header>
          <Card.Meta>{metadata.publication_date}</Card.Meta>
          <Card.Description>
            {_truncate(metadata.description, { length: 200 })}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  renderItems(items) {
    return items.map(item => {
      return this.renderElement(item);
    });
  }

  render() {
    const items = this.props.items;
    return (
      <Card.Group itemsPerRow={this.itemsPerRow}>
        {this.renderItems(items)}
      </Card.Group>
    );
  }
}

ResultsGrid.propTypes = {
  itemsPerRow: PropTypes.number,
  items: PropTypes.array.isRequired,
  renderElement: PropTypes.func,
};

ResultsGrid.defaultProps = {
  itemsPerRow: 3,
  renderElement: null,
};
