import React, { Component } from 'react';
import { connect } from '@app/store';
import { Grid } from 'semantic-ui-react';
import { ResultsMultiLayout } from '@app/components';
import {
  Count,
  LayoutSwitcher,
  Pagination,
  ResultsPerPage,
  SortBy,
  SortOrder,
} from '@app/components';

const Spacer = connect(state => ({
  loading: state.results.loading,
}))(
  ({ text, loading }) =>
    loading ? null : <span style={{ margin: '0 0.5em' }}>{text}</span>
);

export class Results extends Component {
  constructor(props) {
    super(props);

    this.sortByValues = this.props.sortByValues;
    this.sortOrderValues = this.props.sortOrderValues;
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
              <SortBy values={this.sortByValues} defaultValue="mostrecent" />
              <SortOrder values={this.sortOrderValues} defaultValue="desc" />
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
