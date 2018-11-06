import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Paginator } from 'semantic-ui-react';
import { ShouldRender } from '@app/components';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.updateQueryPage = this.props.updateQueryPage;
    this.setInitialState = props.setInitialState;
    this.renderElement = props.renderElement || this.paginator;
  }

  onPageChange = activePage => {
    if (activePage === this.props.currentPage) return;
    this.updateQueryPage(activePage);
  };

  paginator = (
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
    const showFirstIcon = options.showFirstIcon;
    const showLastIcon = options.showLastIcon;
    const showPrevIcon = options.showPrevIcon;
    const showNextIcon = options.showNextIcon;
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
        firstItem={showFirstIcon ? undefined : null}
        lastItem={showLastIcon ? undefined : null}
        prevItem={showPrevIcon ? undefined : null}
        nextItem={showNextIcon ? undefined : null}
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
      <ShouldRender condition={!loading && totalResults > 0}>
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
    showFirstIcon: PropTypes.bool,
    showLastIcon: PropTypes.bool,
    showPrevIcon: PropTypes.bool,
    showNextIcon: PropTypes.bool,
  }),
  renderElement: PropTypes.func,
};

Pagination.defaultProps = {
  options: {
    boundaryRangeCount: 1,
    siblingRangeCount: 1,
    showEllipsis: true,
    showFirstIcon: true,
    showLastIcon: true,
    showPrevIcon: true,
    showNextIcon: true,
  },
  renderElement: null,
};
