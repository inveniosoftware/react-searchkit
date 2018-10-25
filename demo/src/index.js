import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid } from 'semantic-ui-react';
import { ReactSearchKit, SearchBar, Count } from '@app/components';
import { ResultsContainer } from './ResultsContainer';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-searchkit Demo</h1>
        <ReactSearchKit
          apiConfig={{ url: 'https://videos.cern.ch/api/records' }}
        >
          <Grid>
            <Grid.Row>
              <SearchBar />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>FILTERS</Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <Grid.Column>
                    <Count />
                  </Grid.Column>

                  <Grid.Column>
                    <ResultsContainer />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </ReactSearchKit>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
