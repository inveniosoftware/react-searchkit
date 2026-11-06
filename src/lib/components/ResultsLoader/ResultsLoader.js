/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { useContext } from "react";
import Overridable from "react-overridable";
import { Loader } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

function ResultsLoader({ children, loading, overridableId = "" }) {
  return loading ? <Element overridableId={overridableId} /> : children;
}

ResultsLoader.propTypes = {
  children: PropTypes.node.isRequired,
  overridableId: PropTypes.string,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
};

const Element = ({ overridableId = "" }) => {
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

export default Overridable.component("ResultsLoader", ResultsLoader);
