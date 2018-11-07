/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content: `Have a look to the [Getting Started guide](${
          siteConfig.baseUrl
        }docs/getting_started) to better understand how React-SearchKit works and how it can help you to build your own SearchKit app.\n\nRead the [advanced guide](${
          siteConfig.baseUrl
        }docs/advanced) to know how to customize, extend and create your own components.`,
        title: 'Browse the documentation',
      },
      {
        content:
          'Join the [Invenio Gitter channel](https://gitter.im/inveniosoftware/invenio/) to ask questions and get help.',
        title: 'Join the community',
      },
      {
        content:
          'React-SearchKit is part of the Invenio software organization.\n- Have a look to the [Invenio](https://inveniosoftware.org/) website to know more about the project.\n- Announcements and news are published in the official [Invenio blog](https://inveniosoftware.org/blog/).\n- Follow Invenio on [Twitter](https://twitter.com/inveniosoftware).',
        title: 'Stay up to date',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>
                <div>Need help?</div>
              </h2>
            </header>
            <p>
              <MarkdownBlock>
                React-SearchKit is born at [CERN](https://home.cern). It is
                under active development and used by websites built on top of
                [Invenio](https://inveniosoftware.org/).
              </MarkdownBlock>
            </p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
