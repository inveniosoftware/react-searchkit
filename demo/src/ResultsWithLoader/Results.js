import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ResultsMultiLayout } from '@app/components';
import {
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsPerPage,
  Sort,
} from '@app/components';

const Spacer = ({ text }) => <span style={{ margin: '0 0.5em' }}>{text}</span>;

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.sortValues = this.props.sortValues;
    this.resultsPerPageValues = this.props.resultsPerPageValues;
  }

  render() {
    return (
      <div>
        <Grid relaxed verticalAlign="middle">
          <Grid.Column width={8}>
            <span>
              <Spacer text="Found" />
              <Count />
              <Spacer text="results sorted by" />
              <Sort
                values={this.sortValues}
                defaultSortBy="mostrecent"
                defaultOrder="desc"
                showOnEmptyResults={true}
              />
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <span>
              <Spacer text="Show" />
              <ResultsPerPage
                values={this.resultsPerPageValues}
                defaultValue={10}
              />
              <Spacer text="results per page" />
            </span>
            <Spacer />
            <LayoutSwitcher />
          </Grid.Column>
        </Grid>
        <Grid relaxed style={{ padding: '2em 0' }}>
          <ResultsMultiLayout />
        </Grid>
        <Grid relaxed verticalAlign="middle" textAlign="center">
          <Pagination />
        </Grid>
      </div>
    );
  }
}

Results.propTypes = {};

Results.defaultProps = {};
