import React, { Component } from 'react';
import { render } from 'react-dom';
import { Segment, Container, Header, Grid, Card } from 'semantic-ui-react';
import { ReactSearchKit, SearchBar, Count, Sort } from '@app/components';
import { ResultsContainer } from './ResultsContainer';

class Demo extends Component {
  render() {
    const sortValues = {
      values: [
        {
          text: 'Best Match',
          value: 'bestmatch',
          order: {
            values: [
              { text: 'ASC', value: 'asc' },
              { text: 'DESC', value: 'desc' },
            ],
            default: 'desc',
          },
        },
        {
          text: 'Newest',
          value: 'mostrecent',
          order: {
            values: [
              { text: 'ASC', value: 'asc' },
              { text: 'DESC', value: 'desc' },
            ],
            default: 'desc',
          },
        },
      ],
      default: 'mostrecent',
    };

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
              <Grid style={{ padding: '2em 0' }}>
                <Grid.Row>
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
                    <Grid.Row>
                      <Grid.Column>
                        <Count />
                      </Grid.Column>
                      <Grid.Column>
                        <Sort values={sortValues} showOnEmptyResults={true} />
                      </Grid.Column>
                    </Grid.Row>
                    <ResultsContainer />
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
