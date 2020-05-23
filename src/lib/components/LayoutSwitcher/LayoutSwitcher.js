/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, {Component, useContext} from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import { ShouldRender } from '../ShouldRender';
import {AppContext} from "../ReactSearchKit";

class LayoutSwitcher extends Component {
  constructor(props) {
    super(props);
    this.updateLayout = props.updateLayout;
  }

  onLayoutChange = (layoutName) => {
    this.updateLayout(layoutName);
  };

  render() {
    const { currentLayout, loading, totalResults, overridableId } = this.props;
    return (
      <ShouldRender
        condition={currentLayout !== null && !loading && totalResults > 0}
      >
        <Element
          currentLayout={currentLayout}
          onLayoutChange={this.onLayoutChange}
          overridableId={overridableId}
        />
      </ShouldRender>
    );
  }
}

LayoutSwitcher.propTypes = {
  updateLayout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentLayout: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
  overridableId: PropTypes.string,
};

LayoutSwitcher.defaultProps = {
  currentLayout: null,
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const { currentLayout, onLayoutChange } = props;
  const {buildUID} = useContext(AppContext);
  const clickHandler = (event, { name }) => {
    onLayoutChange(name);
  };

  return (
    <Overridable
      id={buildUID('LayoutSwitcher.element', overridableId)}
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
