/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { useContext } from "react";
import Overridable from "react-overridable";
import { Card, Checkbox } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";

const ToggleComponent = ({
  overridableId,
  userSelectionFilters,
  title,
  label,
  filterValue,
  updateQueryFilters,
}) => {
  const _isChecked = (userSelectionFilters) => {
    const isFilterActive =
      userSelectionFilters.filter((filter) => filter[0] === filterValue[0]).length > 0;
    return isFilterActive;
  };
  const onClick = () => {
    updateQueryFilters(filterValue);
  };
  const { buildUID } = useContext(AppContext);
  const isChecked = _isChecked(userSelectionFilters);

  return (
    <Overridable
      id={buildUID("SearchFilters.Toggle.element", overridableId)}
      title={title}
      label={label}
      filterValue={filterValue}
      userSelectionFilters={userSelectionFilters}
      updateQueryFilters={updateQueryFilters}
    >
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Checkbox toggle label={label} onClick={onClick} checked={isChecked} />
        </Card.Content>
      </Card>
    </Overridable>
  );
};

ToggleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  filterValue: PropTypes.array.isRequired,
  overridableId: PropTypes.string,
  /* REDUX */
  userSelectionFilters: PropTypes.array.isRequired,
  updateQueryFilters: PropTypes.func.isRequired,
};

ToggleComponent.defaultProps = {
  overridableId: "",
};

export default Overridable.component("SearchFilters.Toggle", ToggleComponent);
