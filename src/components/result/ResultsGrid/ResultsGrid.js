import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _truncate from 'lodash/truncate';
import { Card, Image } from 'semantic-ui-react';

export default class ResultsGrid extends Component {
  constructor(props) {
    super(props);
    this.itemsPerRow = props.itemsPerRow;
    this.items = props.items;
  }

  renderItems(items) {
    return items.map((item, index) => {
      return (
        <Card
          fluid
          key={index}
          href={`https://videos.cern.ch/record/${item.metadata.recid}`}
        >
          <Image src="https://via.placeholder.com/200" />
          <Card.Content>
            <Card.Header>
              {item.metadata.title.title || item.metadata.title}
            </Card.Header>
            <Card.Meta>{item.metadata.publication_date}</Card.Meta>
            <Card.Description>
              {_truncate(item.metadata.description, { length: 200 })}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <Card.Group itemsPerRow={this.itemsPerRow}>
        {this.renderItems(this.items)}
      </Card.Group>
    );
  }
}

ResultsGrid.propTypes = {
  itemsPerRow: PropTypes.number,
  items: PropTypes.array.isRequired,
};

ResultsGrid.defaultProps = {
  itemsPerRow: 3,
};
