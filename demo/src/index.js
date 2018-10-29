import React, { Component } from 'react';
import { render } from 'react-dom';
import { Segment, Container, Header, Grid } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  Aggregator,
  NestedAggregator,
} from '@app/components';
import { ResultsWithLoader } from './ResultsWithLoader';

class Demo extends Component {
  render() {
    const sortValues = [
      {
        text: 'Best Match',
        value: 'bestmatch',
      },
      {
        text: 'Newest',
        value: 'mostrecent',
        // order: [{ text: 'asc', value: 'asc' }, { text: 'desc', value: 'desc' }],
      },
    ];

    const resultsPerPageValues = [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '50',
        value: 50,
      },
    ];

    return (
      <div>
        <ReactSearchKit
          apiConfig={{
            url: 'https://zenodo.org/api/records/',
            timeout: 5000,
            headers: { Accept: 'application/vnd.zenodo.v1+json' },
          }}
          searchDefault={true}
        >
          <div>
            <Segment inverted>
              <Container>
                <Grid columns="equal" verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h1" content="React-searchkit" inverted />
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="center">
                      <SearchBar />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>

            <Container>
              <Grid relaxed style={{ padding: '2em 0' }}>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>
                    {/* <Aggregator title="Categories" field="category" />
                    <Aggregator title="Languages" field="language" /> */}
                    <Aggregator title="File types" field="file_type" />
                    <Aggregator title="Keywords" field="keywords" />
                    <NestedAggregator
                      title="Types"
                      nestedFields={{
                        field: 'type',
                        subfield: {
                          field: 'subtype',
                        },
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <ResultsWithLoader
                      sortValues={sortValues}
                      resultsPerPageValues={resultsPerPageValues}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </ReactSearchKit>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
