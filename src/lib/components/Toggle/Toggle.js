/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2020 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import _get from 'lodash/get';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ToggleComponent extends Component{

      _isChecked = (userSelectionFilters) => {
        const isFilterActive = userSelectionFilters.filter(
            (filter) => filter[0] === this.props.filterValue[0]
          ).length > 0
        return isFilterActive
      };
    
      onToggleClicked = () => {
        this.props.updateQueryFilters(this.props.filterValue);
      };
      
      render() {
        const {
            userSelectionFilters,
            overridableId,
            ...props
          } = this.props;
        var isChecked = this._isChecked(userSelectionFilters);
        return(
        <Overridable id={'SearchFilters.ToggleComponent', this.props.overridableId} {...this.props}>
            
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Checkbox
                        toggle
                        label={this.props.label}
                        onClick={this.onToggleClicked}
                        checked={isChecked}
                    />
                </Card.Content>
            </Card>
        </Overridable>
        )
      }
}

ToggleComponent.propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    userSelectionFilters: PropTypes.array.isRequired,
    updateQueryFilters: PropTypes.func.isRequired,
    overridableId: PropTypes.string,
  };
  
  ToggleComponent.defaultProps = {
    overridableId: '',
  };

export default Overridable.component(
    'SearchFilters.ToggleComponent', ToggleComponent);
