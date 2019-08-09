/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Paginator } from 'semantic-ui-react';
import { ShouldRender } from '../ShouldRender';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.updateQueryPage = this.props.updateQueryPage;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this._renderElement;
  }

  componentDidMount() {
    if (this.props.currentPage === -1) {
      this.setInitialState({
        page: 1,
      });
    }
  }

  onPageChange = activePage => {
    if (activePage === this.props.currentPage) return;
    this.updateQueryPage(activePage);
  };

  _renderElement = (
    currentPage,
    currentSize,
    totalResults,
    onPageChange,
    options
  ) => {
    const pages = Math.ceil(totalResults / currentSize);
    const boundaryRangeCount = options.boundaryRangeCount;
    const siblingRangeCount = options.siblingRangeCount;
    const showEllipsis = options.showEllipsis;
    const showFirst = options.showFirst;
    const showLast = options.showLast;
    const showPrev = options.showPrev;
    const showNext = options.showNext;
    const _onPageChange = (event, { activePage }) => {
      onPageChange(activePage);
    };

    return (
      <Paginator
        activePage={currentPage}
        totalPages={pages}
        onPageChange={_onPageChange}
        boundaryRange={boundaryRangeCount}
        siblingRange={siblingRangeCount}
        ellipsisItem={showEllipsis ? undefined : null}
        firstItem={showFirst ? undefined : null}
        lastItem={showLast ? undefined : null}
        prevItem={showPrev ? undefined : null}
        nextItem={showNext ? undefined : null}
      />
    );
  };
  render() {
    const {
      loading,
      totalResults,
      currentPage,
      currentSize,
      options,
    } = this.props;

    return (
      <ShouldRender
        condition={
          !loading && currentPage > -1 && currentSize > -1 && totalResults > 0
        }
      >
        {this.renderElement(
          currentPage,
          currentSize,
          totalResults,
          this.onPageChange,
          options
        )}
      </ShouldRender>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  options: PropTypes.PropTypes.shape({
    boundaryRangeCount: PropTypes.number,
    siblingRangeCount: PropTypes.number,
    showEllipsis: PropTypes.bool,
    showFirst: PropTypes.bool,
    showLast: PropTypes.bool,
    showPrev: PropTypes.bool,
    showNext: PropTypes.bool,
  }),
  renderElement: PropTypes.func,
};

Pagination.defaultProps = {
  options: {
    boundaryRangeCount: 1,
    siblingRangeCount: 1,
    showEllipsis: true,
    showFirst: true,
    showLast: true,
    showPrev: true,
    showNext: true,
  },
  renderElement: null,
};
