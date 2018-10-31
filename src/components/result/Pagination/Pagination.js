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

  componentDidMount() {
    this.setInitialState({
      page: 1,
    });
  }

  onChange = (event, { activePage }) => {
    if (activePage === this.props.currentPage) return;
    this.updateQueryPage(activePage);
  };

  paginator = props => {
    const currentPage = props.currentPage;
    const size = props.currentSize;
    const totalResults = props.totalResults;
    const pages = Math.ceil(totalResults / size);
    const boundaryRangeCount = props.options.boundaryRangeCount;
    const siblingRangeCount = props.options.siblingRangeCount;
    const showEllipsis = props.options.showEllipsis;
    const showFirstIcon = props.options.showFirstIcon;
    const showLastIcon = props.options.showLastIcon;
    const showPrevIcon = props.options.showPrevIcon;
    const showNextIcon = props.options.showNextIcon;
    return (
      <Paginator
        activePage={currentPage}
        totalPages={pages}
        onPageChange={this.onChange}
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
    return (
      <ShouldRender condition={this.props.totalResults > 0}>
        {this.renderElement({ ...this.props })}
      </ShouldRender>
    );
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
