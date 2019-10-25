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

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

class Header extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href={`${siteConfig.baseUrl}docs/getting-started`}>
                      Get Started
                    </Button>
                    <Button
                      href={`${siteConfig.baseUrl}docs/components/react-searchkit`}
                    >
                      Discover components
                    </Button>
                  </div>
                </div>
              </div>
              <div className="githubButton" style={{ minHeight: '20px' }}>
                <a
                  className="github-button"
                  href={this.props.config.repoUrl}
                  data-icon="octicon-star"
                  data-count-href="/inveniosoftware/react-searchkit/stargazers"
                  data-show-count={true}
                  data-count-aria-label="# stargazers on GitHub"
                  aria-label="Star inveniosoftware/react-searchkit on GitHub"
                >
                  Star
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header config={siteConfig} />
        <div className="mainContainer">
          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              align="center"
              layout="threeColumn"
              contents={[
                {
                  title: 'Ready To Use',
                  content: `Compose your search UI choosing between any of the available components. Override the
                  default look and feel of each component and provide yours.`,
                },
                {
                  title: 'Fully Configurable',
                  content: `Use React-SearchKit with your search REST API endpoint or Elasticsearch by providing your
                  configuration or implementation. Customize deep linking and integrate with React Router.`,
                },
                {
                  title: 'Extensible',
                  content:
                    'Create new components in a simple way and plug them to the other already available ones.',
                },
              ]}
            />
          </Container>
          <Container padding={['all']}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={`${siteConfig.baseUrl}img/screenshot.png`}
                alt="Screenshot"
                width="700"
              />
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Home;
