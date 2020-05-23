import React from 'react';
import { CERNVideosReactSearchKit2 } from './cern-videos-2';
import { CERNVideosReactSearchKit3 } from './cern-videos-3';
import { Card, Grid, Image, Item } from 'semantic-ui-react';
import { OverridableContext } from 'react-overridable';
import _truncate from 'lodash/truncate';


const CERNVideosResultsListItem = (imageShown) => ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Item key={index} href={`#${metadata.recid}`}>
      {imageShown && <Item.Image
        size='small'
        src={result.imageSrc || 'http://placehold.it/200'}
      />
      }
      <Item.Content>
        <Item.Header>
          {metadata.title.title}
        </Item.Header>
        <Item.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

const CERNVideosResultsGridItem = (blueTitle) => ({ result, index }) => {
  const metadata = result.metadata;
  return (
    <Card fluid key={index} href={`#${metadata.recid}`}>
      <Image src={result.imageSrc || 'http://placehold.it/200'} />
      <Card.Content>
        <Card.Header style={{color: blueTitle ? 'blue' : 'black' }}>{metadata.title.title}</Card.Header>
        <Card.Meta>{metadata.publication_date}</Card.Meta>
        <Card.Description>
          {_truncate(metadata.description, { length: 200 })}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const overriddenComponents = {
  'cernvideos2.ResultsList.item': CERNVideosResultsListItem(true),
  'cernvideos2.ResultsGrid.item': CERNVideosResultsGridItem(false),
  'cernvideos3.ResultsList.item': CERNVideosResultsListItem(false),
  'cernvideos3.ResultsGrid.item': CERNVideosResultsGridItem(true),
};

const NamespacedExample = () => {
  return (
    <OverridableContext.Provider value={overriddenComponents}>
      <Grid>
        <Grid.Column width={8}>
          <h2>appName = cernvideos3 </h2>
          <CERNVideosReactSearchKit3 />
        </Grid.Column>
        <Grid.Column width={8}>
          <h2>appName = cernvideos2 </h2>
          <CERNVideosReactSearchKit2 />
        </Grid.Column>
      </Grid>
    </OverridableContext.Provider>
  );
};

export default NamespacedExample;

