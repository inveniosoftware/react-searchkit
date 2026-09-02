/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import Overridable from "react-overridable";

function ShouldRender({ condition = true, children }) {
  return condition ? children : null;
}

ShouldRender.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Overridable.component("ShouldRender", ShouldRender);
