import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Paginator } from 'semantic-ui-react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.boundaryRangeCount = props.options.boundaryRangeCount;
    this.siblingRangeCount = props.options.siblingRangeCount;
    this.showEllipsis = props.options.showEllipsis;
    this.showFirstIcon = props.options.showFirstIcon;
    this.showLastIcon = props.options.showLastIcon;
    this.showPrevIcon = props.options.showPrevIcon;
    this.showNextIcon = props.options.showNextIcon;

    this.updateQueryPage = this.props.updateQueryPage;
    this.setInitialState = props.setInitialState;
  }

  componentDidMount() {
    this.setInitialState({
      page: 1,
    });
  }

  onChange = (event, { activePage }) => {
    if (activePage === this.props.currentPage) return;
    this.updateQueryPage(activePage);
  };

  render() {
    const currentPage = this.props.currentPage;
    const size = this.props.currentSize;
    const totalResults = this.props.totalResults;
    const pages = Math.ceil(totalResults / size);

    return totalResults > 0 ? (
      <Paginator
        activePage={currentPage}
        totalPages={pages}
        onPageChange={this.onChange}
        boundaryRange={this.boundaryRangeCount}
        siblingRange={this.siblingRangeCount}
        ellipsisItem={this.showEllipsis ? undefined : null}
        firstItem={this.showFirstIcon ? undefined : null}
        lastItem={this.showLastIcon ? undefined : null}
        prevItem={this.showPrevIcon ? undefined : null}
        nextItem={this.showNextIcon ? undefined : null}
      />
    ) : null;
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  options: PropTypes.object,
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
};
