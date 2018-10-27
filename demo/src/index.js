import React, { Component } from 'react';
import { render } from 'react-dom';
import { Segment, Container, Header, Grid, Card } from 'semantic-ui-react';
import { ReactSearchKit, SearchBar } from '@app/components';
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
        order: [{ text: 'asc', value: 'asc' }, { text: 'desc', value: 'desc' }],
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
          apiConfig={{ url: 'https://videos.cern.ch/api/records' }}
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
                    <Card>
                      <Card.Content header="Access Right" />
                      <Card.Content description="" />
                    </Card>
                    <Card>
                      <Card.Content header="File Type" />
                      <Card.Content description="" />
                    </Card>
                    <Card>
                      <Card.Content header="Keywords" />
                      <Card.Content description="" />
                    </Card>
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
