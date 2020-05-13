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
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import { buildUID } from '../../util';

class LayoutSwitcher extends Component {
  constructor(props) {
    super(props);
    this.defaultValue = this.props.defaultLayout;
    this.updateLayout = props.updateLayout;
    this.setInitialState = props.setInitialState;
  }

  componentDidMount() {
    if (this.props.currentLayout === null) {
      this.setInitialState({
        layout: this.defaultValue,
      });
    }
  }

  onLayoutChange = (layoutName) => {
    this.updateLayout(layoutName);
  };

  render() {
    const { currentLayout, loading, totalResults, overridableUID } = this.props;
    return (
      <ShouldRender
        condition={currentLayout !== null && !loading && totalResults > 0}
      >
        <Element
          currentLayout={currentLayout}
          onLayoutChange={this.onLayoutChange}
          overridableUID={overridableUID}
        />
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
  overridableUID: PropTypes.string,
};

LayoutSwitcher.defaultProps = {
  defaultLayout: 'list',
  currentLayout: null,
  overridableUID: '',
};

const Element = ({ overridableUID, ...props }) => {
  const { currentLayout, onLayoutChange } = props;
  const clickHandler = (event, { name }) => {
    onLayoutChange(name);
  };
  return (
    <Overridable
      id={buildUID('LayoutSwitcher.element', overridableUID)}
      {...props}
    >
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
    </Overridable>
  );
};

export default Overridable.component('LayoutSwitcher', LayoutSwitcher);
