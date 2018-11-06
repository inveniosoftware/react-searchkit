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
    this.renderElement = props.renderElement || this._renderMenu;
  }

  _renderMenu = (currentLayout, onLayoutChange) => {
    const clickHandler = (event, { name }) => {
      onLayoutChange(name);
    };
    return (
      <Menu compact icon>
        <Menu.Item
          name="list"
          active={currentLayout === 'list'}
          onClick={clickHandler}
        >
          <Icon name="list layout" />
        </Menu.Item>
        <Menu.Item
          name="grid"
          active={currentLayout === 'grid'}
          onClick={clickHandler}
        >
          <Icon name="grid layout" />
        </Menu.Item>
      </Menu>
    );
  };

  componentDidMount() {
    if (this.defaultValue !== 'list') {
      this.setInitialState({
        layout: this.defaultValue,
      });
    }
  }

  onLayoutChange = layoutName => {
    this.updateLayout(layoutName);
  };

  render() {
    let { currentLayout, loading, totalResults } = this.props;

    return (
      <ShouldRender condition={currentLayout && !loading && totalResults > 0}>
        {this.renderElement(currentLayout, this.onLayoutChange)}
      </ShouldRender>
    );
  }
}

LayoutSwitcher.propTypes = {
  defaultLayout: PropTypes.oneOf(['list', 'grid']),
  updateLayout: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  currentLayout: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list',
  renderElement: null,
};
