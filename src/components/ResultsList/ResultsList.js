import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Item, Segment } from 'semantic-ui-react';
import { Error } from '../Error';

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.listItemCmp = this.props.listItemCmp || this.defaultListItem;
    this.listItemCmp = this.listItemCmp.bind(this);
  }

  defaultListItem = rowData => {
    return (
      <Item>
        <Item.Content>{JSON.stringify(rowData)}</Item.Content>
      </Item>
    );
  };

  renderList(data) {
    return data.map(row => {
      return this.listItemCmp(row);
    });
  }

  render() {
    const { data, error } = this.props;
    return _isEmpty(error) ? (
      <Item.Group divided>{this.renderList(data)}</Item.Group>
    ) : (
      <Error error={error} />
    );
  }
}

ResultsList.propTypes = {
  data: PropTypes.array.isRequired,
  listItemCmp: PropTypes.func,
};

ResultsList.defaultProps = {
  data: [],
  listItemCmp: undefined,
};
