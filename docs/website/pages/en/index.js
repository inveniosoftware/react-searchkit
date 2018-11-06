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
    const linkGettingStarted = `${siteConfig.baseUrl}docs/getting_started`;
    const linkComponents = `${siteConfig.baseUrl}docs/components`;
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
                    <Button href={linkGettingStarted}>Get Started</Button>
                    <Button href={linkComponents}>Discover components</Button>
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
                  title: 'Customizable',
                  content: `Build your search UI with the available components. You can override the default look and feel
                of each component.`,
                },
                {
                  title: 'Configurable',
                  content: `Use React SearchKit as it is and just configure it with your search backend. You can adapt the
                API configuration to your needs or provide your own API implementation.`,
                },
                {
                  title: 'Extensible',
                  content: 'Create your own components in a simple way.',
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
                style={{ boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3)' }}
              />
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Home;
