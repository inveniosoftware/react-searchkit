/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from 'react';
import {
  Segment,
  Menu,
  Container,
  Header,
  Button,
  Divider,
} from 'semantic-ui-react';
import { ESReactSearchKit } from './elasticsearch';
import { ZenodoReactSearchKit } from './zenodo';
import { CERNVideosReactSearchKit } from './cern-videos';

const demos = {
  es7: {
    label: 'ElasticSearch 7',
    text: 'You Know, for Search',
    cmp: <ESReactSearchKit />,
  },
  zenodo: {
    label: 'zenodo.org',
    text: '(All) Research. Shared.',
    cmp: <ZenodoReactSearchKit />,
  },
  'cern-videos': {
    label: 'videos.cern.ch',
    text: 'The CERN official platform for videos.',
    cmp: <CERNVideosReactSearchKit />,
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeDemo: null };
  }

  resetUrlParams = () => {
    window.history.pushState({}, document.title, '/');
  };

  renderHeader = () => {
    const { activeDemo } = this.state;
    const demoMenus = Object.keys(demos).map(key => (
      <Menu.Item
        key={key}
        name={key}
        active={activeDemo === key}
        onClick={() => {
          this.setState({ activeDemo: key });
        }}
      >
        {demos[key].label}
      </Menu.Item>
    ));

    return (
      <Segment inverted vertical>
        <Menu inverted>
          <Container>
            <Menu.Item
              header
              onClick={() => {
                this.setState({ activeDemo: null });
                this.resetUrlParams();
              }}
            >
              React-SearchKit
            </Menu.Item>
            {demoMenus}
          </Container>
        </Menu>
      </Segment>
    );
  };

  renderContent = () => {
    const links = Object.keys(demos).map(key => (
      <Segment placeholder textAlign="center" key={key}>
        <Header>{demos[key].label}</Header>
        <p>{demos[key].text}</p>
        <Button
          primary
          onClick={() => {
            this.setState({ activeDemo: key });
          }}
        >
          Try it out!
        </Button>
      </Segment>
    ));
    const defaultCmp = (
      <Container text>
        <Header as="h2">React-SearchKit</Header>
        <p>
          This is a collection of demos to show how to use React-SearchKit and
          components.
        </p>
        <p>Choose between one of the available demos:</p>
        {links}
      </Container>
    );
    const cmp =
      this.state.activeDemo && this.state.activeDemo in demos
        ? demos[this.state.activeDemo].cmp
        : defaultCmp;

    return <Container>{cmp}</Container>;
  };

  render = () => {
    if (!this.state.activeDemo) {
      this.resetUrlParams();
    }
    return (
      <>
        {this.renderHeader()}
        <Divider hidden />
        {this.renderContent()}
      </>
    );
  };
}
