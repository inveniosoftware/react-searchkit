import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Menu, Icon } from 'semantic-ui-react';
import { ShouldRender } from '@app/components';

export default class LayoutSwitcher extends Component {
  constructor(props) {
    super(props);
    this.defaultValue = this.props.defaultLayout;
    this.updateLayout = props.updateLayout;
    this.setInitialState = props.setInitialState;
  }

  componentDidMount() {
    this.setInitialState({
      layout: this.defaultValue,
    });
  }

  onLayoutSwitch = (event, { name }) => {
    this.updateLayout(name);
  };

  render() {
    let { currentLayout, loading, totalResults } = this.props;
    return (
      <ShouldRender condition={currentLayout && !loading && totalResults > 0}>
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
      </ShouldRender>
    );
  }
}

LayoutSwitcher.propTypes = {
  defaultLayout: PropTypes.oneOf(['list', 'grid']),
  updateLayout: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  currentLayout: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list',
};
