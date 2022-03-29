/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { useContext } from "react";
import Overridable from "react-overridable";
import { Loader } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

function ResultsLoader({ children, loading, overridableId }) {
  return loading ? <Element overridableId={overridableId} /> : children;
}

ResultsLoader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  overridableId: PropTypes.string,
};

ResultsLoader.defaultProps = {
  overridableId: "",
};

const Element = ({ overridableId }) => {
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable id={buildUID("ResultsLoader.element", overridableId)}>
      <Loader active size="huge" inline="centered" />
    </Overridable>
  );
};

Element.propTypes = {
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  overridableId: "",
};

export default Overridable.component("ResultsLoader", ResultsLoader);
