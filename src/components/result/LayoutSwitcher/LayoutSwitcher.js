import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Menu, Icon } from 'semantic-ui-react';

export default class LayoutSwitcher extends Component {
  constructor(props) {
    super(props);
    this.defaultValue = this.props.defaultLayout;
    this.updateLayout = props.updateLayout;
  }

  componentDidMount() {
    // TODO: REMOVE ME
    this.onLayoutSwitch(null, { name: this.defaultValue });
    /*this.setInitialState({
      resultsLayout: this.defaultValue,
    });*/
  }

  onLayoutSwitch = (event, { name }) => {
    this.updateLayout(name);
  };

  render() {
    const currentLayout = this.props.currentLayout;
    const totalResults = this.props.totalResults;
    return currentLayout && totalResults > 0 ? (
      <Menu compact icon>
        <Menu.Item
          name="list"
          active={currentLayout === 'list'}
          onClick={this.onLayoutSwitch}
        >
          <Icon name="list layout" />
        </Menu.Item>
        <Menu.Item
          name="grid"
          active={currentLayout === 'grid'}
          onClick={this.onLayoutSwitch}
        >
          <Icon name="grid layout" />
        </Menu.Item>
      </Menu>
    ) : null;
  }
}

LayoutSwitcher.propTypes = {
  defaultLayout: PropTypes.oneOf(['list', 'grid']),
  updateLayout: PropTypes.func.isRequired,
  currentLayout: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list',
  currentLayout: undefined,
};
