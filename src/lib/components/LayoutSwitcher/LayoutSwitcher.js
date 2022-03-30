/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Icon, Menu } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

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
      <ShouldRender condition={currentLayout !== null && !loading && totalResults > 0}>
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
  overridableId: PropTypes.string,
  /* REDUX */
  updateLayout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentLayout: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
};

LayoutSwitcher.defaultProps = {
  currentLayout: null,
  overridableId: "",
};

const Element = ({ overridableId, currentLayout, onLayoutChange }) => {
  const { buildUID } = useContext(AppContext);
  return (
    <Overridable
      id={buildUID("LayoutSwitcher.element", overridableId)}
      currentLayout={currentLayout}
      onLayoutChange={onLayoutChange}
    >
      <Menu compact icon>
        <Menu.Item
          name="list"
          active={currentLayout === "list"}
          onClick={(_, { name }) => onLayoutChange(name)}
        >
          <Icon name="list layout" />
        </Menu.Item>
        <Menu.Item
          name="grid"
          active={currentLayout === "grid"}
          onClick={(_, { name }) => onLayoutChange(name)}
        >
          <Icon name="grid layout" />
        </Menu.Item>
      </Menu>
    </Overridable>
  );
};

Element.propTypes = {
  currentLayout: PropTypes.string,
  onLayoutChange: PropTypes.func.isRequired,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  currentLayout: null,
  overridableId: "",
};

export default Overridable.component("LayoutSwitcher", LayoutSwitcher);
