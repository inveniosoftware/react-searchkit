/*
 * SPDX-FileCopyrightText: 2018-2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { useContext } from "react";
import Overridable from "react-overridable";
import { Label } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

function Count({ loading, totalResults, label = (cmp) => cmp, overridableId = "" }) {
  return (
    <ShouldRender condition={!loading && totalResults > 0}>
      {label(<Element totalResults={totalResults} overridableId={overridableId} />)}
    </ShouldRender>
  );
}

Count.propTypes = {
  label: PropTypes.func,
  overridableId: PropTypes.string,
  /* REDUX */
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
};

const Element = ({ totalResults, overridableId = "" }) => {
  const { buildUID } = useContext(AppContext);
  const _overridableId = buildUID("Count.element", overridableId);

  return (
    <Overridable id={_overridableId} totalResults={totalResults}>
      <Label color="blue">{totalResults.toLocaleString("en-US")}</Label>
    </Overridable>
  );
};

Element.propTypes = {
  totalResults: PropTypes.number.isRequired,
  overridableId: PropTypes.string,
};

export default Overridable.component("Count", Count);
