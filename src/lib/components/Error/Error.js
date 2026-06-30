/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Overridable from "react-overridable";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";
import { i18next } from "@translations/i18next";

function Error({ loading, error, overridableId }) {
  return (
    <ShouldRender condition={!loading && !_isEmpty(error)}>
      <Element error={error} overridableId={overridableId} />
    </ShouldRender>
  );
}

Error.propTypes = {
  overridableId: PropTypes.string,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

Error.defaultProps = {
  overridableId: "",
};

const Element = ({ error, overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable id={buildUID("Error.element", overridableId)} error={error}>
      <div>{i18next.t("Oops! Something went wrong while fetching results.")}</div>
    </Overridable>
  );
};

Element.propTypes = {
  overridableId: PropTypes.string,
  /* REDUX */
  error: PropTypes.object.isRequired,
};

Element.defaultProps = {
  overridableId: "",
};

export default Overridable.component("Error", Error);
