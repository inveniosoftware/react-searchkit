/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from 'prop-types';
import React, { Component, useContext } from 'react';
import Overridable from 'react-overridable';
import { Pagination as Paginator } from 'semantic-ui-react';
import { AppContext } from '../ReactSearchKit';
import { ShouldRender } from '../ShouldRender';

const defaultOptions = {
  boundaryRangeCount: 1,
  siblingRangeCount: 1,
  showEllipsis: true,
  showFirst: true,
  showLast: true,
  showPrev: true,
  showNext: true,
  size: 'large',
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.updateQueryPage = props.updateQueryPage;
    this.options = props.options
      ? { ...defaultOptions, ...props.options }
      : defaultOptions;
  }

  onPageChange = (activePage) => {
    if (activePage === this.props.currentPage) return;
    this.updateQueryPage(activePage);
  };

  render() {
    const { loading, totalResults, currentPage, currentSize, overridableId } =
      this.props;
    return (
      <ShouldRender
        condition={
          !loading && currentPage > -1 && currentSize > -1 && totalResults > 0
        }
      >
        <Element
          currentPage={currentPage}
          currentSize={currentSize}
          totalResults={totalResults}
          onPageChange={this.onPageChange}
          options={this.options}
          overridableId={overridableId}
        />
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
    size: PropTypes.oneOf([
      'mini',
      'tiny',
      'small',
      'large',
      'huge',
      'massive',
    ]),
  }),
  overridableId: PropTypes.string,
};

Pagination.defaultProps = {
  overridableId: '',
};

const Element = ({ overridableId, ...props }) => {
  const {
    currentPage,
    currentSize,
    totalResults,
    onPageChange,
    options,
    ...extraParams
  } = props;
  const pages = Math.ceil(totalResults / currentSize);
  const boundaryRangeCount = options.boundaryRangeCount;
  const siblingRangeCount = options.siblingRangeCount;
  const showEllipsis = options.showEllipsis;
  const showFirst = options.showFirst;
  const showLast = options.showLast;
  const showPrev = options.showPrev;
  const showNext = options.showNext;
  const size = options.size;
  const _onPageChange = (event, { activePage }) => {
    onPageChange(activePage);
  };
  const { buildUID } = useContext(AppContext);

  return (
    <Overridable id={buildUID('Pagination.element', overridableId)} {...props}>
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
        size={size}
        {...extraParams}
      />
    </Overridable>
  );
};

export default Overridable.component('Pagination', Pagination);
