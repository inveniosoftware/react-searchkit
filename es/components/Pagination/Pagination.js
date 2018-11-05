var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Paginator } from 'semantic-ui-react';
import { ShouldRender } from './..';

var Pagination = (_temp = _class = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.updateQueryPage = _this.props.updateQueryPage;
    _this.setInitialState = props.setInitialState;
    _this.renderElement = props.renderElement || _this.paginator;
    return _this;
  }

  Pagination.prototype.componentDidMount = function componentDidMount() {
    this.setInitialState({
      page: 1
    });
  };

  Pagination.prototype.render = function render() {
    var loading = this.props.loading;
    var totalResults = this.props.totalResults;

    return React.createElement(
      ShouldRender,
      { condition: !loading && totalResults > 0 },
      this.renderElement(_extends({}, this.props))
    );
  };

  return Pagination;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (event, _ref) {
    var activePage = _ref.activePage;

    if (activePage === _this2.props.currentPage) return;
    _this2.updateQueryPage(activePage);
  };

  this.paginator = function (props) {
    var currentPage = props.currentPage;
    var size = props.currentSize;
    var totalResults = props.totalResults;
    var pages = Math.ceil(totalResults / size);
    var boundaryRangeCount = props.options.boundaryRangeCount;
    var siblingRangeCount = props.options.siblingRangeCount;
    var showEllipsis = props.options.showEllipsis;
    var showFirstIcon = props.options.showFirstIcon;
    var showLastIcon = props.options.showLastIcon;
    var showPrevIcon = props.options.showPrevIcon;
    var showNextIcon = props.options.showNextIcon;
    return React.createElement(Paginator, {
      activePage: currentPage,
      totalPages: pages,
      onPageChange: _this2.onChange,
      boundaryRange: boundaryRangeCount,
      siblingRange: siblingRangeCount,
      ellipsisItem: showEllipsis ? undefined : null,
      firstItem: showFirstIcon ? undefined : null,
      lastItem: showLastIcon ? undefined : null,
      prevItem: showPrevIcon ? undefined : null,
      nextItem: showNextIcon ? undefined : null
    });
  };
}, _temp);
export { Pagination as default };


Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  options: PropTypes.object
} : {};

Pagination.defaultProps = {
  options: {
    boundaryRangeCount: 1,
    siblingRangeCount: 1,
    showEllipsis: true,
    showFirstIcon: true,
    showLastIcon: true,
    showPrevIcon: true,
    showNextIcon: true
  }
};