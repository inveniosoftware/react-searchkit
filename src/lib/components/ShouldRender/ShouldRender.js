/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { Component } from "react";
import Overridable from "react-overridable";

class ShouldRender extends Component {
  render() {
    const { children, condition } = this.props;
    return condition ? children : null;
  }
}

ShouldRender.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ShouldRender.defaultProps = {
  condition: true,
};

export default Overridable.component("ShouldRender", ShouldRender);
