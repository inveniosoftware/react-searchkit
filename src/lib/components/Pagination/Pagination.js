/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import Overridable from "react-overridable";
import { Pagination as Paginator } from "semantic-ui-react";
import { AppContext } from "../ReactSearchKit";
import { ShouldRender } from "../ShouldRender";

const defaultOptions = {
  boundaryRangeCount: 1,
  siblingRangeCount: 1,
  showEllipsis: true,
  showFirst: true,
  showLast: true,
  showPrev: true,
  showNext: true,
  size: "large",
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
    const { currentPage } = this.props;
    if (activePage === currentPage) return;
    this.updateQueryPage(activePage);
  };

  render() {
    const { loading, totalResults, currentPage, currentSize, overridableId } =
      this.props;
    return (
      <ShouldRender
        condition={!loading && currentPage > -1 && currentSize > -1 && totalResults > 0}
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
  options: PropTypes.shape({
    boundaryRangeCount: PropTypes.number,
    siblingRangeCount: PropTypes.number,
    showEllipsis: PropTypes.bool,
    showFirst: PropTypes.bool,
    showLast: PropTypes.bool,
    showPrev: PropTypes.bool,
    showNext: PropTypes.bool,
    size: PropTypes.oneOf(["mini", "tiny", "small", "large", "huge", "massive"]),
  }),
  overridableId: PropTypes.string,
  /* REDUX */
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  updateQueryPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  options: {},
  overridableId: "",
};

const Element = ({
  overridableId,
  currentPage,
  currentSize,
  totalResults,
  onPageChange,
  options,
  ...props
}) => {
  const pages = Math.ceil(totalResults / currentSize);
  const boundaryRangeCount = options.boundaryRangeCount;
  const siblingRangeCount = options.siblingRangeCount;
  const showEllipsis = options.showEllipsis;
  const showFirst = options.showFirst;
  const showLast = options.showLast;
  const showPrev = options.showPrev;
  const showNext = options.showNext;
  const size = options.size;

  const { buildUID } = useContext(AppContext);

  return (
    <Overridable
      id={buildUID("Pagination.element", overridableId)}
      currentPage={currentPage}
      currentSize={currentSize}
      totalResults={totalResults}
      options={options}
      onPageChange={onPageChange}
    >
      <Paginator
        activePage={currentPage}
        totalPages={pages}
        onPageChange={(_, { activePage }) => onPageChange(activePage)}
        boundaryRange={boundaryRangeCount}
        siblingRange={siblingRangeCount}
        ellipsisItem={showEllipsis ? undefined : null}
        firstItem={showFirst ? undefined : null}
        lastItem={showLast ? undefined : null}
        prevItem={showPrev ? undefined : null}
        nextItem={showNext ? undefined : null}
        size={size}
        {...props}
      />
    </Overridable>
  );
};

Element.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  overridableId: PropTypes.string,
};

Element.defaultProps = {
  options: {},
  overridableId: "",
};

export default Overridable.component("Pagination", Pagination);
