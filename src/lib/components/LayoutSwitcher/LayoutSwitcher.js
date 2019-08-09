/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class LayoutSwitcher extends Component {
  constructor(props) {
    super(props);
    this.defaultValue = this.props.defaultLayout;
    this.updateLayout = props.updateLayout;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement = (currentLayout, onLayoutChange) => {
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
    if (this.props.currentLayout === null) {
      this.setInitialState({
        layout: this.defaultValue,
      });
    }
  }

  onLayoutChange = layoutName => {
    this.updateLayout(layoutName);
  };

  render() {
    const { currentLayout, loading, totalResults } = this.props;
    return (
      <ShouldRender
        condition={currentLayout !== null && !loading && totalResults > 0}
      >
        {this.renderElement(currentLayout, this.onLayoutChange)}
      </ShouldRender>
    );
  }
}

LayoutSwitcher.propTypes = {
  defaultLayout: PropTypes.oneOf(['list', 'grid']),
  updateLayout: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentLayout: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
  renderElement: PropTypes.func,
};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list',
  currentLayout: null,
  renderElement: null,
};
